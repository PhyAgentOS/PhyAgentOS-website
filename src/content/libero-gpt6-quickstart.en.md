# LIBERO-10 GPT-6 VLM Quick Start

Prepare PAOS, install the Nodes and Skill, configure the model API, and run the `libero_10` evaluation in order. Each command includes the expected result and relevant notes.

This workflow has no learned policy: GPT-6 reads the images, resolves pixel grounding into grasp poses, and sets the gripper opening itself.

## 0. Install and configure PAOS

The PAOS runtime must use the `qinhan/libero-0.3.4-runtime` branch. It includes the per-profile `required_tools`, `PAOS_SKILL_PROFILE` forwarding, and `openai_responses` provider required by libero 0.3.4.

```bash
export PAOS_CORE="$HOME/PhyAgentOS-core"
export RUNTIME_URL="https://gitlab.ex-ai.cn/PhyAgentOS/framework/phyagentos.git"
export RUNTIME_BRANCH="qinhan/libero-0.3.4-runtime"

if [ -d "$PAOS_CORE/.git" ]; then
  git -C "$PAOS_CORE" remote set-url origin "$RUNTIME_URL"
  git -C "$PAOS_CORE" fetch origin "$RUNTIME_BRANCH"
  git -C "$PAOS_CORE" checkout -B "$RUNTIME_BRANCH" "origin/$RUNTIME_BRANCH"
else
  git clone --branch "$RUNTIME_BRANCH" "$RUNTIME_URL" "$PAOS_CORE"
fi

cd "$PAOS_CORE"
python -m pip install -e .

# Dora is required to start the Skill Runtime
curl --proto '=https' --tlsv1.2 -LsSf   https://github.com/dora-rs/dora/releases/download/v0.4.1/dora-cli-installer.sh | sh
source "$HOME/.dora/bin/env"
hash -r
```

**Check the result:**

```bash
git branch --show-current
git rev-parse HEAD
dora --version
```

The outputs should be `qinhan/libero-0.3.4-runtime`, `e3f1adee1ceab2f09a27b1c0706c2260981ace0e`, and `dora-cli 0.4.1`, respectively.

Also verify the framework capabilities:

```bash
python - <<'PY'
import inspect
import PhyAgentOS.skill_runtime.manifest as m
from PhyAgentOS.skill_runtime.manager import RuntimeManager
print("per-profile required_tools:", "required_tools" in m._PROFILE_FIELDS)
print("PAOS_SKILL_PROFILE:", "PAOS_SKILL_PROFILE" in inspect.getsource(RuntimeManager._run_start_hook))
PY
```

Both lines must be **True**. If either is False, do not install libero 0.3.4.

## 1. Install the Nodes and Skill

Install both the Skill archive and its pinned Node artifacts. Missing either can cause a missing-file error at startup.

### The host must have `uv` for the three Python nodes

Three Python nodes bundled with the Skill provide the action workflow: `image_vision`, `vision_grounding`, and `libero_action_server`. Their launch scripts use `uv` to create a virtual environment before execution:

```bash
# Contents of nodes/<node-name>/<node-name>.sh
uv sync --project "$ROOT" --quiet
exec "$ROOT/.venv/bin/<node-name>" "$@"
```

The host must therefore have `uv` on PATH:

```bash
command -v uv && uv --version || echo "uv is missing"
```

**Check the result:** The version number is printed. If uv is missing, install it without sudo:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.local/bin:$PATH"
command -v uv && uv --version
```

**Note:** Missing uv may not produce an immediate startup error. Instead, `paos skill start --profile gpt6` can remain blocked and fail after 15 minutes with `Runtime health check timed out: Gateway GET /tools is unavailable`.

### Install the libero Skill

```bash
paos skill install libero --version 0.3.4-ubuntu20.1
```

**Check the result:** Installation succeeds. If 0.3.4 is not yet in the registry, use a local archive:

```bash
paos skill install /abs/path/libero-0.3.4-ubuntu20.1.tar.gz --local --yes
```

### Install the Nodes using the IDs pinned in skill.yaml

```bash
paos forge-node install libero gateway
paos forge-node install libero libero_benchmark
# This workflow does not need lerobot_runner; no learned policy generates actions
```

**Check the result:** Each command succeeds. The `libero_benchmark` artifact is about 540 MB, so the first download can take time.

**Note:** If the registry is unavailable, use local artifacts, for example `paos forge-node install libero libero_benchmark --archive /abs/path/libero_benchmark-1.0.1-ubuntu20.1-linux-x86_64.tar.gz`.

### Prepare dependencies for the three Python nodes once

After installing the Skill, download these dependencies before starting the flow:

```bash
for n in image_vision vision_grounding libero_action_server; do
  cd "$HOME/.PhyAgentOS/skills/libero/nodes/$n" && uv sync --quiet && echo "OK $n"
done
```

**Check the result:** Three lines are printed: `OK image_vision`, `OK vision_grounding`, and `OK libero_action_server`.

**Note:** The first run downloads several hundred MB of dependencies. Complete it before startup: `startup_timeout_s` is only 900 seconds, and a slow download during startup can exhaust this window.

### Check the version, profiles, and artifacts

```bash
paos skill inspect libero
paos forge-node verify libero gateway
paos forge-node verify libero libero_benchmark
```

**Check the result:** The version is 0.3.4-ubuntu20.1. Six profiles are listed (act / gpt6 / gpt6_pi05 / kai0 / lingbot_va / pi05), and both verification commands pass.

## 2. Prepare LIBERO scene assets

The benchmark node does not include scene data. Supply the official bddl files, initial states, and assets on the host.

### Write `~/.libero/config.yaml`

```yaml
benchmark_root: /abs/path/to/LIBERO/libero/libero
bddl_files:     /abs/path/to/LIBERO/libero/libero/bddl_files
init_states:    /abs/path/to/LIBERO/libero/libero/init_files
assets:         /abs/path/to/LIBERO/libero/libero/assets
```

**Check the result:** All four paths exist, and `bddl_files` contains the bddl files for libero_10.

## 3. Set runtime environment variables

Set these variables again whenever you open a new terminal.

```bash
export PAOS_TMP=$HOME/paos-tmp
mkdir -p "$PAOS_TMP"
export TMPDIR=$PAOS_TMP TEMP=$PAOS_TMP TMP=$PAOS_TMP

# Select an available GPU
export CUDA_VISIBLE_DEVICES=0

# Local loopback must bypass proxies
export no_proxy="127.0.0.1,localhost,::1"
export NO_PROXY="$no_proxy"
```

**Check the result:** `nvidia-smi` shows that the selected GPU has almost all its memory available.

**Note:** Leave enough space in `TMPDIR`. The nodes are packaged as onefile executables and extract there at startup.

**Note:** Keep both `no_proxy` lines; they handle **local loopback traffic**. If proxy variables (`http_proxy` / `https_proxy` / `ALL_PROXY`, for example Clash at `127.0.0.1:7890`) are set without a loopback bypass, Python `urllib` routes the PAOS health check for `http://127.0.0.1:19003/tools` through the proxy. The request never reaches the local gateway, and `paos skill start` fails after 15 minutes with `Gateway GET /tools is unavailable`. See the proxy note in section 6.

**An unavailable proxy also affects external downloads:** If a proxy variable points to a port with no running service, `curl` can report `Connection refused (os error 111)` or `tunnel error`. Downloads through `uv sync` and `pip` can fail too. Check with:

```bash
env | grep -i proxy || echo "(no proxy variables)"
curl -sS -o /dev/null -w 'pythonhosted: %{http_code} %{time_total}s\n' \
  --noproxy '*' --max-time 15 https://files.pythonhosted.org/simple/ || echo "pythonhosted: FAIL"
```

A 200/404 response from the second command indicates that a direct connection works. Remove the unavailable proxy from the current shell, keep `no_proxy`, and repeat dependency preparation in section 1:

```bash
unset http_proxy https_proxy ALL_PROXY HTTP_PROXY HTTPS_PROXY all_proxy
```

## 4. Configure the LLM API

This workflow needs a model API and no local model weights.

### Write `~/.PhyAgentOS/config.json`

```json
{
  "agents": {
    "defaults": {
      "provider": "openai_responses",
      "model": "gpt-6-astra-phyagentos",
      "maxToolIterations": 400
    }
  },
  "providers": {
    "openaiResponses": {
      "apiKey": "<YOUR_API_KEY>",
      "apiBase": "https://newapi.x-era.com/v1"
    }
  }
}
```

**Check the result:** `paos agent -m "Hello"` returns a normal reply.

**Note:** Increase `maxToolIterations` to 400. The default limit is too small for a full VLM episode and can interrupt it when the tool-call budget is exhausted.

### Confirm that the API key can access the model

The model is the executor in this workflow, so an unavailable model prevents execution. `gpt-6-astra-phyagentos` is routed through a **dedicated group**. Keys in ordinary groups may only see `gpt-6-astra`. Configuring `gpt-6-astra-phyagentos` directly can return `503 model_not_found` (`No available channel for model gpt-6-astra-phyagentos under group ...`). Check first:

```bash
python - <<'PY'
import json, os, urllib.request
cfg = json.load(open(os.path.join(os.environ["HOME"], ".PhyAgentOS", "config.json")))
pv = cfg["providers"]["openaiResponses"]
req = urllib.request.Request(pv["apiBase"].rstrip("/") + "/models",
                             headers={"Authorization": "Bearer " + pv["apiKey"]})
d = json.load(urllib.request.urlopen(req, timeout=20))
ids = sorted(m.get("id", "?") for m in d.get("data", []))
print("Visible model count:", len(ids))
print("Models containing astra:", [i for i in ids if "astra" in i.lower()])
PY
```

**Check the result:** Use the JSON above only if `gpt-6-astra-phyagentos` appears in the list. If only `gpt-6-astra` appears, use that as the model. If neither appears, or the request returns 401, ask the service administrator to enable access or use another key.

### Use another supervision model through an OpenAI-compatible endpoint

For models such as DeepSeek, select the `custom` provider without changing the Skill or profile:

```json
{
  "agents": {
    "defaults": {
      "provider": "custom",
      "model": "deepseek-flash",
      "max_tokens": 8192,
      "temperature": 1.0,
      "maxToolIterations": 400
    }
  },
  "providers": {
    "custom": {
      "apiKey": "<YOUR_API_KEY>",
      "apiBase": "https://newapi.x-era.com/v1"
    }
  }
}
```

The `custom` provider uses `chat.completions`. JPEG frames from `vision.get_frame` are sent as `data:image/jpeg;base64,...` content parts, allowing `deepseek-flash` to call `motion.move_pose` based on the observation.

## 5. Write the evaluation protocol into the configuration

This workflow has no tool for starting a batch. `libero_benchmark` starts the batch automatically when the flow launches, so write the protocol into the installed Skill's configuration.

### Write the batch protocol

```yaml
# ~/.PhyAgentOS/skills/libero/profiles/gpt6/benchmark.yaml
suite: libero_10
task_ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
init_state_ids: [0, 1, 2, 3, 4]
num_runs: 1
max_steps: 520
result_dir: results
```

**Check the result:** This defines 50 episodes (10 tasks × 5 initial states). For a single-episode smoke test, use `task_ids: [2]` and `init_state_ids: [0]`.

**Note:** This profile uses AUTORUN. The `max_steps` in this benchmark file **actually terminates the episode**; a 60-step smoke test ends after 60 steps with `termination: timed_out`. The action-server file below only reports the same budget to the Agent. If the two values differ, the Agent may believe steps remain (for example `episode.max_steps 520`) even though the harness stops at 60. Update both files together.

### Synchronize the two mirrored action-server values

```yaml
# ~/.PhyAgentOS/skills/libero/profiles/gpt6/libero_action_server.yaml
episode:
  result_dir: results
  max_steps: 520
```

**Check the result:** Both values match `benchmark.yaml`. The Agent reads its step budget and result directory from this action-server file.

## 6. Start the VLM profile

### Check environment variables before startup

Dora 0.4.1 expands `${...}` in the dataflow during `dora start`. A referenced variable that is not set can produce `nodes[...] env: data did not match any variant of untagged enum EnvValue`. Remaining placeholders in the rendered `dataflow.yaml` are normal; Dora expands them at startup. Do not use `grep '\${'` to decide whether rendering failed.

This profile has no such placeholders in the node `env:` fields of `profiles/gpt6/dataflow.yaml`. `${FORGE_RUNTIME_BIN}` and `${PAOS_SKILL_ROOT}` occur only in `path:` and are rendered as absolute paths during installation. The profile can therefore start even without exporting those runtime environment variables first.

The following two settings are still recommended because they control runtime behavior:

```bash
python - <<'PY'
import os
import urllib.request

recommended = [
    "TMPDIR",                 # Extraction directory for onefile nodes
    "CUDA_VISIBLE_DEVICES",   # GPU used by libero_benchmark
]
for name in recommended:
    value = os.environ.get(name)
    print(f"{name}={value}" if value else f"{name} is unset (this profile can still start)")

# Proxy check: the local gateway must bypass proxies
proxies = urllib.request.getproxies()
if proxies and not urllib.request.proxy_bypass("127.0.0.1"):
    raise SystemExit(
        "Proxy detected without a bypass for 127.0.0.1: " + str(proxies) +
        ". PAOS health checks will use the proxy; startup can fail after 15 minutes with "
        "'Gateway GET /tools is unavailable'。"
        ' First run export no_proxy="127.0.0.1,localhost,::1" NO_PROXY="$no_proxy" before starting.'
    )
print("proxy bypass 127.0.0.1: OK")
PY
```

**Proxy note:** A configured proxy without a bypass for `127.0.0.1` can route Python `urllib` health checks for `http://127.0.0.1:19003/tools` away from the gateway. Startup then times out after 15 minutes with `Gateway GET /tools is unavailable`, while the gateway log contains **no `GET /tools` requests**. Set `export no_proxy="127.0.0.1,localhost,::1" NO_PROXY="$no_proxy"`. The check above catches this configuration.

**Check the result:** Both settings are printed. Missing values do not prevent this profile from starting, but complete section 3 before running to avoid extracting into a full `/tmp` or using a GPU allocated to another task.

**Note:** The `pi05` and `gpt6_pi05` profiles do reference `${CUDA_VISIBLE_DEVICES}`, `${TMPDIR}`, `${PI05_MODEL_DIR}`, and `${PI05_TOKENIZER_DIR}` in node `env:` fields. Export them in the **same shell** as `paos skill start`, including the same tmux window or SSH session, and set them again in a new terminal.

```bash
paos skill start libero --profile gpt6
```

**Check the result:** The flow is running when the command returns. Use the next status check to confirm all five Tools are ready.

## 7. Verify Tool readiness

Check Runtime and Tool status instead of relying only on the startup command's return value.

```bash
paos skill status libero
```

**Check the result:** `State: running`, `Gateway GET /tools: ready`, and ready status for all five Tools: `vision.get_frame`, `vision.ground_point`, `motion.resolve_relative_pose`, `motion.move_pose`, and `gripper.set_opening`.

## 8. Wait for the simulator, then start the Agent

### Wait for episode 1/1 in the log

```bash
DLOG=$HOME/.PhyAgentOS/logs/skills/paos-libero-gpt6-dora.log
for i in $(seq 1 30); do grep -q 'episode 1/1' "$DLOG" && break; sleep 10; done
grep -o 'episode 1/1 .*' "$DLOG" | tail -1
```

**Check the result:** A line starting with `episode 1/1 ...` is printed, including the task ID and instruction.

**Note:** This can take 20–90 seconds after the flow becomes ready. Starting the Agent too early can make it exit before an initial observation is available.

### Use the Agent to drive this episode

```bash
paos agent -m 'Run the current episode with the libero Skill gpt6 profile: first use vision.get_frame to read agentview and the task instruction.
Complete the episode using the loop in SKILL.md Appendix B (section 6.1: only your actions advance simulation; section 6.2: first read state with motion.resolve_relative_pose;
section 6.4: only completed is a successful terminal phase). When the episode reaches its terminal state, report success, termination, and num_steps.' \
  --session cli:gpt6-libero10-t2
```

**Check the result:** The Agent reports the episode's success / termination / num_steps.

**Note:** Use one session per episode. A full 50-episode batch needs 50 sessions, with episode boundaries advanced by the benchmark itself. Watching many episodes in one session can exhaust context; if the Agent stops, simulation remains paused at the checkpoint.

**Note:** In this VLM workflow, each tool call advances simulation by one step. A 520-step episode needs hundreds of calls. Use `max_steps` of 40–60 for a smoke test; a full episode can otherwise take many hours of Agent calls.

**Note:** The Agent may mark its own AgentTask as `failed` with `evidence association is below task policy` during cleanup. This indicates an Agent-side evidence configuration issue. Use the benchmark's result file to judge simulation success.

### Locate result files

```bash
find ~/.PhyAgentOS/forge_runtime/environments -name 'libero_10_*.json' -newermt '-2 hour' | sort
```

**Check the result:** Paths have this form: `.../environments/libero/gpt6/<hash>/launch/profiles/gpt6/results/libero_10_<timestamp>_gateway-<id>.json`.

## 9. Stop the Skill

```bash
paos skill stop libero
```

**Check the result:** The state returns to stopped, node processes exit, and GPU memory is released.

**Note:** Fully stop the current profile before switching. The three profiles share node IDs and ports, so running two flows together can interfere with execution; the later action server may repeatedly report `ACTION_NO_ROBOT_STATE`.

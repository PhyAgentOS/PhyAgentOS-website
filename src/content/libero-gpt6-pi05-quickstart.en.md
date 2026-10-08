# LIBERO-10 GPT-6 + π0.5 Supervision Quick Start

Prepare PAOS, install the Nodes and Skill, configure the weights and model API, and run the `libero_10` evaluation in order. Each command includes the expected result and relevant notes.

π0.5 still produces the actions. At checkpoints, GPT-6 decides how many steps to allow, adjusts biases, supplies an end-effector target, or stops execution.

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

### The host must have `uv`

Compared with `pi05`, `gpt6_pi05` adds two types of bundled Python nodes (two `image_vision` instances and `vla_bridge`). Their launch scripts use `uv` to create a virtual environment before execution:

```bash
# Contents of nodes/image_vision/image_vision.sh and nodes/vla_bridge/vla_bridge.sh
uv sync --project "$ROOT" --quiet
exec "$ROOT/.venv/bin/<node-name>" "$@"
```

The host must therefore have `uv` on PATH. The `pi05` profile does not use these nodes and can run without uv.

```bash
command -v uv && uv --version || echo "uv is missing"
```

**Check the result:** The version number is printed. If uv is missing, install it without sudo:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.local/bin:$PATH"
command -v uv && uv --version
```

**Note:** Missing uv may not produce an immediate startup error. Instead, `paos skill start --profile gpt6_pi05` can remain blocked and fail after 15 minutes with `Runtime health check timed out: Gateway GET /tools is unavailable`.

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
paos forge-node install libero lerobot_runner
```

**Check the result:** Each command succeeds. The `libero_benchmark` artifact is about 540 MB, so the first download can take time.

**Note:** If the registry is unavailable, use local artifacts, for example `paos forge-node install libero libero_benchmark --archive /abs/path/libero_benchmark-1.0.1-ubuntu20.1-linux-x86_64.tar.gz`.

### Prepare dependencies for the two Python nodes once

After installing the Skill, download these dependencies before starting the flow:

```bash
cd "$HOME/.PhyAgentOS/skills/libero/nodes/image_vision" && uv sync --quiet && echo "OK image_vision"
cd "$HOME/.PhyAgentOS/skills/libero/nodes/vla_bridge" && uv sync --quiet && echo "OK vla_bridge"
```

**Check the result:** The two lines print `OK image_vision` and `OK vla_bridge`.

**Note:** The first run downloads about 400 MB of dependencies, mostly for image_vision. Complete it before startup: `startup_timeout_s` is only 900 seconds, and startup also loads π0.5 weights into GPU memory. A slow download during that window can cause a timeout.

### Check the version, profiles, and artifacts

```bash
paos skill inspect libero
paos forge-node verify libero gateway
paos forge-node verify libero libero_benchmark
```

**Check the result:** The version is 0.3.4-ubuntu20.1 or later. Six profiles are listed (act / gpt6 / gpt6_pi05 / kai0 / lingbot_va / pi05), and both verification commands pass.

**Note:** Without `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1` on `libero_benchmark`, the torch≥2.6 `torch.load` default of `weights_only=True` can cause `_pickle.UnpicklingError` when deserializing LIBERO initial states. `vlm_vla.benchmark.describe` / `run` then never become ready. This profile includes the variable in `profiles/gpt6_pi05/dataflow.yaml` from 0.3.1 onward; no extra setting is needed.

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

**Note:** Keep both `no_proxy` lines; they handle **local loopback traffic**. If proxy variables (`http_proxy` / `https_proxy` / `ALL_PROXY`, for example Clash at `127.0.0.1:7890`) are set without a loopback bypass, Python `urllib` routes the PAOS health check for `http://127.0.0.1:19003/tools` through the proxy. The request never reaches the local gateway, and `paos skill start` fails after 15 minutes with `Gateway GET /tools is unavailable`. See the proxy note in section 5.

**An unavailable proxy also affects external downloads:** If a proxy variable points to a port with no running service, `curl` can report `Connection refused (os error 111)` or `tunnel error`. Downloads through `uv sync`, `pip`, and Hugging Face can fail too. Check with:

```bash
env | grep -i proxy || echo "(no proxy variables)"
curl -sS -o /dev/null -w 'pythonhosted: %{http_code} %{time_total}s\n' \
  --noproxy '*' --max-time 15 https://files.pythonhosted.org/simple/ || echo "pythonhosted: FAIL"
```

A 200/404 response from the second command indicates that a direct connection works; `--noproxy '*'` bypasses the proxy for this check. Remove the unavailable proxy from the current shell, keep `no_proxy`, and repeat dependency preparation in section 1:

```bash
unset http_proxy https_proxy ALL_PROXY HTTP_PROXY HTTPS_PROXY all_proxy
```

## 4. Prepare π0.5 weights, the model API, and the batch suite

### Specify π0.5 weights through environment variables

This configuration is supported from 0.3.4 onward.

```bash
export PI05_MODEL_DIR=/abs/path/to/pi05_libero_finetuned_v044
export PI05_TOKENIZER_DIR=/abs/path/to/paligemma-3b-pt-224-tokenizer
```

**Check the result:** Both directories exist and are nonempty. `$PI05_MODEL_DIR` contains `config.json`, `model.safetensors` (about 7.5 GB), and `policy_preprocessor.json`. `$PI05_TOKENIZER_DIR` contains files such as `tokenizer_config.json`.

The two fields in `profiles/gpt6_pi05/policy.yaml` use `${PI05_MODEL_DIR}` / `${PI05_TOKENIZER_DIR}`, forwarded through the `lerobot_infer` node's `env:` in `dataflow.yaml`. **Exporting the variables alone is insufficient; the node must forward them.** This was fixed in 0.3.4. The startup hook `scripts/verify_gpt6_pi05_assets.py` checks these same paths before launch and reports missing variable names directly.

**Note:** Packages from 0.3.2 and earlier hard-coded absolute paths from the build machine in policy.yaml. Use 0.3.4 or later when running on another machine.

### Configure the LLM API

Write `~/.PhyAgentOS/config.json`:

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

**Note:** `maxToolIterations` limits tool calls in a single Agent invocation; see section 7.3 for batch sizing. Both `openaiResponses` and `openai_responses` are accepted as provider configuration keys.

### Confirm that the API key can access the model

`gpt-6-astra-phyagentos` is routed through a **dedicated group**. Keys in ordinary groups may only see `gpt-6-astra`. Configuring `gpt-6-astra-phyagentos` directly can return `503 model_not_found` (`No available channel for model gpt-6-astra-phyagentos under group ...`). Check first:

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

The `custom` provider connects to `chat.completions`. JPEG frames from the Agent's `vision.get_frame` calls are sent as `data:image/jpeg;base64,...` content parts. `deepseek-flash` can serve as the supervising VLM.

### Select the suite in the configuration

The loaded suite is determined here, rather than by the run parameter:

```yaml
# ~/.PhyAgentOS/skills/libero/profiles/gpt6_pi05/benchmark.yaml
suite: libero_10
```

**Check the result:** The launcher uses this setting to load the suite when the flow starts. After changing it, run `paos skill stop libero --force` and start the profile again.

**Note:** The `suite` argument to `vlm_vla.benchmark.run` **does not switch the loaded suite**. Passing `suite=libero_10` while `benchmark.yaml` specifies `libero_spatial` runs task 2 from libero_spatial ("pick up the black bowl ...") and writes a `libero_spatial_<ts>_gateway-<id>.json` file. Changing only `benchmark.yaml` to `libero_10` makes the same run arguments execute libero_10 task 2 ("turn on the stove and put the moka pot on it"). The run parameters still control `task_ids` / `init_state_ids` / `num_runs` / `max_steps` / `seed`. `vlm_vla.benchmark.describe` reports the currently loaded suite.

## 5. Start the GPT-6 supervision profile

### Check environment variables before startup

Dora 0.4.1 expands `${...}` in the dataflow during `dora start`. All variables below must be set in the **current shell**. Repeat the exports when opening a new terminal. A missing variable can produce `nodes[...] env: data did not match any variant of untagged enum EnvValue`.

Remaining placeholders in the rendered `dataflow.yaml` are normal; Dora expands them at startup. Do not use `grep '\${'` to decide whether rendering failed.

```bash
python - <<'PY'
import os
import urllib.request

required = [
    "TMPDIR",
    "CUDA_VISIBLE_DEVICES",
    "PI05_MODEL_DIR",
    "PI05_TOKENIZER_DIR",
]
missing = [name for name in required if not os.environ.get(name)]
if missing:
    raise SystemExit("Missing environment variables; do not start: " + ", ".join(missing))
for name in required:
    print(f"{name}={os.environ[name]}")

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

**Check the result:** All four variable values are printed. If any is missing, return to sections 3 and 4 and set it before starting.

**Proxy note:** A configured proxy without a bypass for `127.0.0.1` can route Python `urllib` health checks for `http://127.0.0.1:19003/tools` away from the gateway. Startup then times out after 15 minutes with `Gateway GET /tools is unavailable`, while the gateway log contains **no `GET /tools` requests**. Set `export no_proxy="127.0.0.1,localhost,::1" NO_PROXY="$no_proxy"`. The check above catches this configuration.

**Why check manually:** `gpt6_pi05` declares all four variables in `required_environment`, so startup preflight also checks them. This script shows their actual values beforehand. Settings such as `TMPDIR` do not automatically carry over to a new shell or tmux window; export them again there.

```bash
paos skill start libero --profile gpt6_pi05
```

**Check the result:** The flow is running when the command returns. Use the next status check to confirm all seven Tools are ready.

**Note:** `paos skill start` blocks until the flow is ready. The recorded A100 startup for π0.5, two image_vision instances, and vla_bridge took **about eight minutes** (8 minutes 9 seconds), mostly for loading π0.5 weights. A busy terminal during startup is normal. Do not send another command in that terminal or start a second `paos skill start`.

**Note:** Both `CUDA_VISIBLE_DEVICES` and `TMPDIR` must be set; otherwise preflight reports `Required environment is not configured`.

## 6. Verify Tool readiness

Check Runtime and Tool status instead of relying only on the startup command's return value.

```bash
paos skill status libero
```

**Check the result:** `State: running`, `Gateway GET /tools: ready`, and ready status for all seven Tools: `vlm_vla.benchmark.describe`, `vlm_vla.benchmark.run`, `vla.set_mode`, `vla.decide`, `vla.get_status`, `vision.get_frame`, and `vision.get_frame_wrist`.

**Note:** The first episode often opens a `C2 reason=policy_starved` checkpoint while π0.5 is still loading weights into GPU memory and produces no action within 10 seconds. Answering with `student` allows execution to continue. Run the warmup in section 7.1 first to keep this loading event out of the formal evaluation record.

## 7. Run the libero_10 evaluation

### 7.1 Warm up with one episode

π0.5 loads lazily: the first inference must load weights into GPU memory. The bridge's `policy_starved` threshold is 10 seconds. If the policy produces no action within that window, the bridge pauses the episode and opens a `C2` checkpoint. The first episode is therefore very likely to show `C2 reason=policy_starved` and need a `student` answer to continue. Execution still works, but the record includes the loading event.

Before the formal run, execute one warmup episode to load the weights. Discard its result:

```bash
paos agent -m 'Warm up the libero Skill gpt6_pi05 profile: first call vla.set_mode(mode=stop),
then start vlm_vla.benchmark.run with suite=libero_10, task_ids=[0], init_state_ids=[0], num_runs=1,
max_steps=60, seed=0. At C0 release execution with vla.decide(mode=student), then call vla.set_mode(mode=student)
to hand this episode back to the policy. Wait for it to finish and stop the Session. This episode checks the workflow, not the score.' --session cli:gpt6pi05-warmup
```

### 7.2 Run one smoke-test episode

This checks the workflow rather than establishing an evaluation score.

```bash
paos agent -m 'Run one smoke-test episode with the libero Skill gpt6_pi05 profile (libero_10, task 0 / init 0):

1) Read the live capabilities with vlm_vla.benchmark.describe and confirm that the loaded suite is libero_10.
2) Enter supervision: hold execution with vla.set_mode(mode=stop), then start vlm_vla.benchmark.run with suite=libero_10, task_ids=[0], init_state_ids=[0], num_runs=1, max_steps=520, seed=0.
3) Follow SKILL.md Appendix A sections 4.2-4.4 each round: always begin with vla.get_status.
   episode.steps==0 means C0. Release it directly with vla.decide(mode=student), which actually starts the episode. Do not inspect images at C0.
   At C1 call vision.get_frame with max_age_ms=60000 (also vision.get_frame_wrist if needed) and inspect the images.
   Then call vla.decide exactly once, read back segment/checkpoint, and use vla.get_status to check the outcome of that segment.
4) Answer only C0 and C1, then immediately call vla.set_mode(mode=student) to return the remaining episode to the policy. Never leave an episode paused at an unanswered checkpoint.
5) Wait for the terminal state and report the instruction, success, termination, num_steps, and result-file path.
6) Finally stop the Session.
Judge the outcome only from results/libero_10_*.json written by the benchmark, not AgentTask accounting.' --session cli:gpt6pi05-smoke-t0i0
```

**Check the result:** The Agent performs `describe` → `set_mode(stop)` → `run` → releases C0 → handles at least one C1 (frames from both cameras and exactly one `decide`) → `set_mode(student)` → reaches the terminal state. It reports `success` / `termination` / `num_steps` and the result-file path.

**Note:** Enter supervision through `set_mode(mode=stop)`. Setting `policy` or `student` before starting the batch selects the unsupervised baseline: no checkpoints open, and the Agent never receives a decision request. This behavior does not produce an explicit error.

**Note:** A single episode is a random sample, not a score. π0.5 samples actions at inference, so two runs with the same (task, init, seed) can produce different outcomes. Bridge step counts and benchmark `num_steps` can also differ because they use different counting conventions; a recorded example was 623 versus 520.

### 7.3 Run the formal batch with one invocation per task

`maxToolIterations` limits calls in **one Agent invocation**; the configuration above uses 400. An episode typically needs about 20–40 calls including polling and decisions, allowing only roughly a dozen episodes per invocation. Putting all 50 episodes (10 tasks × 5 initial states) into one invocation can exhaust that budget.

Use **one invocation per task**: 10 invocations, each covering five episodes.

```bash
for t in 0 1 2 3 4 5 6 7 8 9; do
  paos agent -m "Run all 5 initial states of libero_10 task $t with the libero Skill gpt6_pi05 profile.
  First use vlm_vla.benchmark.describe to confirm the suite is libero_10. Call vla.set_mode(mode=stop), then start vlm_vla.benchmark.run
  with suite=libero_10, task_ids=[$t], init_state_ids=[0,1,2,3,4], num_runs=1, max_steps=800, seed=0.
  At each checkpoint follow SKILL.md Appendix A section 4.4: first call vla.get_status; when images are needed, use vision.get_frame with max_age_ms=60000.
  Make at most 4 decisions per episode, with no more than 15 steps per segment. Once the budget is exhausted, immediately call vla.set_mode(mode=student) to hand back the remainder.
  Never leave an episode paused at an unanswered checkpoint. Minimize polling and wait for each episode to reach its terminal state before proceeding.
  At the end of the batch report task/init/success/termination/num_steps for each episode and the overall success rate, then stop the Session.
  Judge outcomes only from results/libero_10_*.json." --session "cli:gpt6pi05-t${t}"
done
```

**Note:** Use **800** for `max_steps` to match the historical libero_10 baseline protocol. The π0.5 batch with 0.92 success rate across 50 episodes used 800 steps. A 520-step limit can mark longer tasks as `timed_out`, making the success rate unsuitable for comparison with that baseline.

**Note:** Increase `maxToolIterations` to 1000 in `agents.defaults` of `~/.PhyAgentOS/config.json`. A limit of 400 is only just enough for five episodes of one task; extra polling can exhaust it. If interrupted, recover completed episodes from `results/libero_10_*.json` instead of rerunning them.

### Locate result files

```bash
find ~/.PhyAgentOS/forge_runtime/environments -name 'libero_10_*.json' -newermt '-2 hour' | sort
```

**Check the result:** Paths have this form: `.../environments/libero/gpt6_pi05/<hash>/launch/profiles/gpt6_pi05/results/libero_10_<timestamp>_gateway-<id>.json`.

## 8. Stop the Skill

```bash
paos skill stop libero
```

**Check the result:** The state returns to stopped, node processes exit, and GPU memory is released.

**Note:** Fully stop the current profile before switching. The three profiles share node IDs and ports, so running two flows together can interfere with execution; the later action server may repeatedly report `ACTION_NO_ROBOT_STATE`.

# LIBERO-10 π0.5 Policy Quick Start

Prepare PAOS, install the Nodes and Skill, prepare the weights, and run the `libero_10` evaluation in order. Each command includes the expected result and relevant notes.

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

### Check the version, profiles, and artifacts

```bash
paos skill inspect libero
paos forge-node verify libero gateway
paos forge-node verify libero libero_benchmark
```

**Check the result:** The version is 0.3.4-ubuntu20.1 or later. Six profiles are listed (act / gpt6 / gpt6_pi05 / kai0 / lingbot_va / pi05), and both verification commands pass.

**Note:** **Do not use 0.3.1-ubuntu20.1 for this profile.** Its `profiles/pi05/dataflow.yaml` omitted node-level environment settings: `libero_benchmark` lacked `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD`, and `policy` lacked forwarding for `CUDA_VISIBLE_DEVICES` / `TMPDIR` / `PI05_*`. Its `policy.yaml` also used absolute weight paths. Symptoms can include `paos skill status` remaining at `State: starting`, `libero_benchmark` raising `_pickle.UnpicklingError ... Unsupported global: numpy.core.multiarray._reconstruct` in the Dora log because of the torch≥2.6 `weights_only` default, or the policy using the wrong GPU and running out of CUDA memory. This issue affects the `pi05` / `kai0` / `lingbot_va` profiles.

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

# Local loopback must bypass proxies; otherwise startup can time out with /tools unavailable
export no_proxy="127.0.0.1,localhost,::1"
export NO_PROXY="$no_proxy"
```

**Check the result:** `nvidia-smi` shows that the selected GPU has almost all its memory available.

**Note:** Leave enough space in `TMPDIR`. The nodes are packaged as onefile executables and extract there at startup.

**Note:** Keep both `no_proxy` lines. If proxy variables (`http_proxy` / `https_proxy` / `ALL_PROXY`, for example Clash at `127.0.0.1:7890`) are set without a bypass for `127.0.0.1`, the PAOS health check goes through the proxy and never reaches the local gateway. `paos skill start` then fails after 15 minutes with `Gateway GET /tools is unavailable`. See the proxy note in section 6.

## 4. Prepare π0.5 weights

π0.5 is the only action model in this workflow. Its weights are not bundled with the Skill; specify their location through environment variables.

### Set the weight and tokenizer directories

```bash
export PI05_MODEL_DIR=/abs/path/to/pi05_libero_finetuned_v044
export PI05_TOKENIZER_DIR=/abs/path/to/paligemma-3b-pt-224-tokenizer
```

**Check the result:** Both directories exist and are nonempty. `$PI05_MODEL_DIR` contains `config.json`, `model.safetensors`, `policy_preprocessor.json`, and `policy_postprocessor.json`.

**Note:** The node reads `pretrained_path` / `tokenizer_path` from `profiles/pi05/policy.yaml`. When those values use `${PI05_MODEL_DIR}` / `${PI05_TOKENIZER_DIR}`, the policy node's `env:` in `dataflow.yaml` must forward them. Both exported variables and node-level forwarding are required; forwarding was fixed in 0.3.2. Check this if the startup hook passes but the policy node reports missing weight directories in the Dora log.

### Download missing assets at the pinned revision

```bash
python ~/.PhyAgentOS/skills/libero/scripts/download_pi05.py \
  --model-dir "$PI05_MODEL_DIR" --tokenizer-dir "$PI05_TOKENIZER_DIR"
```

**Check the result:** The command prints the absolute paths of both directories. Add `--verify-only` to check them without downloading.

**Note:** The tokenizer comes from the gated `google/paligemma-3b-pt-224` repository. Accept its license and set `HF_TOKEN` before downloading. This is unnecessary if a local copy is already available.

## 5. Configure the LLM API

The π0.5 policy node generates all actions, including movement distances. However, `paos agent` itself runs an LLM loop and needs an API key. Without one, it stops with `Error: No API key configured. Set one in ~/.PhyAgentOS/config.json under providers section`. PAOS reads the key from `~/.PhyAgentOS/config.json`.

Keep the key out of screen recordings. Write it using hidden input:

```bash
python - <<'PY'
import json, getpass
from pathlib import Path

key = getpass.getpass("Paste API key (input hidden): ").strip()

cfg = {
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
            "apiKey": key,
            "apiBase": "https://newapi.x-era.com/v1"
        }
    }
}

path = Path.home() / ".PhyAgentOS" / "config.json"
path.parent.mkdir(parents=True, exist_ok=True)
path.write_text(json.dumps(cfg, indent=2, ensure_ascii=False) + "\n")
path.chmod(0o600)
print("wrote", path)
PY
```

**Check the result:** The command prints `wrote /…/.PhyAgentOS/config.json`. Then check API connectivity:

```bash
paos agent -m "Hello"
```

**Note:** `~` refers to the current shell's `HOME`. Write the configuration and run `paos agent` as the same user so both use the same `~/.PhyAgentOS/config.json`.

**Note:** The LLM choice affects Agent orchestration; π0.5 still generates the actions. The source workflow uses `custom` + `deepseek-flash` to reduce API usage costs. To use GPT-6 through the same service, follow section 4 of `libero-gpt6-quickstart.en.md` and select `openai_responses` + `gpt-6-astra-phyagentos`.

**Note:** If this machine needs a proxy for internet access, `paos agent` also uses `http_proxy` when connecting to `newapi.x-era.com`. Local loopback must still bypass the proxy as in section 3. Configure both paths to avoid gateway or API connectivity failures.

## 6. Start the π0.5 profile

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

**Why check manually:** The startup preflight only checks `required_environment` in `skill.yaml`. The `pi05` profile declares only `PI05_MODEL_DIR` and `PI05_TOKENIZER_DIR`, so missing `CUDA_VISIBLE_DEVICES` or `TMPDIR` is not caught until Dora expands the placeholders and raises the `EnvValue` error.

```bash
paos skill start libero --profile pi05
```

**Check the result:** The flow is running when the command returns. Use the next status check to confirm Tool readiness.

**Note:** `paos skill start` blocks until the flow is ready. During this period, `State: starting` and `Gateway GET /tools: unavailable` are normal. Onefile nodes must extract into `TMPDIR` before the gateway binds to port 19003; cold starts on A100 with beegfs took 7.5 / 7.8 minutes in the recorded runs. Avoid Ctrl-C during startup: an unreleased lifecycle lock can make later commands report `Error: Skill 'libero' has another lifecycle operation in progress`.

**Note:** The startup hook checks the weight directories. Invalid paths fail at this stage, before waiting for Dora to start.

## 7. Verify Tool readiness

Check Runtime and Tool status instead of relying only on the startup command's return value.

```bash
paos skill status libero
```

**Check the result:** `State: running`, `Gateway GET /tools: ready`, and ready status for `libero.benchmark.describe`, `libero.benchmark.run`, and `libero.policy`.

## 8. Run the libero_10 evaluation

### Use the Agent to drive the evaluation

```bash
paos agent -m 'Run the libero_10 evaluation with the libero Skill pi05 profile: first open a Session with libero.policy and confirm it is running.
Read the live capabilities with libero.benchmark.describe, then call libero.benchmark.run
with task_ids=[0,1,2,3,4,5,6,7,8,9], init_state_ids=[0,1,2,3,4], num_runs=1, max_steps=520, seed=0.
Wait for the terminal state, read the benchmark result files, and report the success rate for each task, the overall success rate, and termination and num_steps for each episode.
Finally stop the policy Session.' --session cli:pi05-libero10
```

**Check the result:** The Agent reports `success_rate`, successful / total episode counts, and each episode's task ID / init ID / success / termination / num_steps.

**Note:** This is a 50-episode batch (10 tasks × 5 initial states). In the recorded A100 run, task 0 / init 0 succeeded in 267 steps and took about 50 seconds from session creation to result-file output. The original estimate for the full batch was 40–60 minutes; actual time varies with the number of steps. Calibrate with a single episode first: select one `task_ids` entry, one `init_state_ids` entry, and `max_steps=60` before running the full batch.

### Locate result files

```bash
find ~/.PhyAgentOS/forge_runtime/environments -name 'libero_10_*.json' -newermt '-2 hour' | sort
```

**Check the result:** Paths have this form: `.../environments/libero/pi05/<hash>/launch/profiles/pi05/results/libero_10_<timestamp>_gateway-<id>.json`.

## 9. Stop the Skill

```bash
paos skill stop libero
```

**Check the result:** The state returns to stopped, node processes exit, and GPU memory is released.

**Note:** Fully stop the current profile before switching. The three profiles share node IDs and ports, so running two flows together can interfere with execution; the later action server may repeatedly report `ACTION_NO_ROBOT_STATE`.

**Troubleshooting:** If `stop` / `start` reports `another lifecycle operation in progress`, a stuck `paos skill start` process may still hold `~/.PhyAgentOS/run/skills/.locks/libero.lock`. Find it with `ps -ef | grep 'skill start libero'`, terminate that specific process with `kill -9 <PID>`, then run `paos skill stop libero --force`.

# LIBERO-10 π0.5（纯策略）快速启动

按顺序完成 PAOS 准备、Node 与 Skill 安装、权重准备和 libero_10 测评。每条命令下方列出了应检查的状态与注意事项。

## 0. 安装并配置 PAOS

PAOS runtime 必须使用 `qinhan/libero-0.3.4-runtime` 分支。该分支包含 libero 0.3.4
需要的 per-profile `required_tools`、`PAOS_SKILL_PROFILE` 透传，以及
`openai_responses` provider。

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

# Dora 必须安装；这是 Skill Runtime 启动依赖
curl --proto '=https' --tlsv1.2 -LsSf   https://github.com/dora-rs/dora/releases/download/v0.4.1/dora-cli-installer.sh | sh
source "$HOME/.dora/bin/env"
hash -r
```

**检查结果：**

```bash
git branch --show-current
git rev-parse HEAD
dora --version
```

应分别显示 `qinhan/libero-0.3.4-runtime`、
`e3f1adee1ceab2f09a27b1c0706c2260981ace0e`、`dora-cli 0.4.1`。

再确认框架能力：

```bash
python - <<'PY'
import inspect
import PhyAgentOS.skill_runtime.manifest as m
from PhyAgentOS.skill_runtime.manager import RuntimeManager
print("per-profile required_tools:", "required_tools" in m._PROFILE_FIELDS)
print("PAOS_SKILL_PROFILE:", "PAOS_SKILL_PROFILE" in inspect.getsource(RuntimeManager._run_start_hook))
PY
```

两行都必须是 **True**。若是 False，不要安装 libero 0.3.4。

## 1. 安装 Node 与 Skill

Skill 归档和它锁定的 Node 制品都要装好，缺一个都会在启动时报缺文件。

### 安装 libero Skill

```bash
paos skill install libero --version 0.3.4-ubuntu20.1
```

**检查结果：** 显示安装成功。若注册表里还没有 0.3.4，改用本地包：

```bash
paos skill install /abs/path/libero-0.3.4-ubuntu20.1.tar.gz --local --yes
```

### 安装 Node（node id 用 skill.yaml 里的锁名）

```bash
paos forge-node install libero gateway
paos forge-node install libero libero_benchmark
paos forge-node install libero lerobot_runner
```

**检查结果：** 每条命令各自成功。`libero_benchmark` 制品约 540 MB，首次下载需要时间。

**注意：** 注册表访问不了时可用本地制品代替，例如
`paos forge-node install libero libero_benchmark --archive /abs/path/libero_benchmark-1.0.1-ubuntu20.1-linux-x86_64.tar.gz`。

### 检查版本、profile 与制品

```bash
paos skill inspect libero
paos forge-node verify libero gateway
paos forge-node verify libero libero_benchmark
```

**检查结果：** 版本为 0.3.4-ubuntu20.1（或更高），profile 共 6 个（act / gpt6 / gpt6_pi05 / kai0 / lingbot_va / pi05），两条 verify 均通过。

**注意：** **不要用 0.3.1-ubuntu20.1 跑本 profile** —— 那一版的 `profiles/pi05/dataflow.yaml` 漏了节点级 env：
`libero_benchmark` 缺 `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD`，`policy` 缺 `CUDA_VISIBLE_DEVICES` / `TMPDIR` / `PI05_*` 转发；
`policy.yaml` 还把权重写成了绝对路径。可能症状：`paos skill status` 永远停在 `State: starting`，
dora 日志里 `libero_benchmark` 抛 `_pickle.UnpicklingError ... Unsupported global: numpy.core.multiarray._reconstruct`（torch≥2.6 的 `weights_only` 默认值），
`policy` 则可能落到别的卡上 CUDA OOM。三条 profile 里只有 `pi05` / `kai0` / `lingbot_va` 有这个问题。


## 2. 准备 LIBERO 场景资产

benchmark 节点不含场景数据，需要宿主提供官方 bddl / init_states / assets。

### 写入 `~/.libero/config.yaml`

```yaml
benchmark_root: /abs/path/to/LIBERO/libero/libero
bddl_files:     /abs/path/to/LIBERO/libero/libero/bddl_files
init_states:    /abs/path/to/LIBERO/libero/libero/init_files
assets:         /abs/path/to/LIBERO/libero/libero/assets
```

**检查结果：** 上面四个路径都存在，且 `bddl_files` 下能找到 libero_10 的 bddl 文件。


## 3. 设置运行环境变量

每次开新终端都要设。

```bash
export PAOS_TMP=$HOME/paos-tmp
mkdir -p "$PAOS_TMP"
export TMPDIR=$PAOS_TMP TEMP=$PAOS_TMP TMP=$PAOS_TMP

# 选一张空闲卡
export CUDA_VISIBLE_DEVICES=0

# 本机回环必须绕过代理（漏了这行 start 会卡 15 分钟，最后报 /tools unavailable）
export no_proxy="127.0.0.1,localhost,::1"
export NO_PROXY="$no_proxy"
```

**检查结果：** `nvidia-smi` 里这张卡的显存基本是空的。

**注意：** `TMPDIR` 要留够空间：节点是 onefile 打包，启动时在这里解包。

**注意：** `no_proxy` 那两行不能省。凡是机器上配了代理（`http_proxy` / `https_proxy` / `ALL_PROXY`，
Clash 一类常见默认值是 `127.0.0.1:7890`）而 `no_proxy` 里没有 `127.0.0.1`，PAOS 的启动健康检查
会走代理、请求到不了本机 gateway，`paos skill start` 会在 15 分钟后准点失败并报
`Gateway GET /tools is unavailable`。详见 §6 的「代理坑」。


## 4. 准备 π0.5 权重

这条链路只有 π0.5 一个模型。权重不打进 Skill，用环境变量指路。

### 指向权重与 tokenizer 目录

```bash
export PI05_MODEL_DIR=/abs/path/to/pi05_libero_finetuned_v044
export PI05_TOKENIZER_DIR=/abs/path/to/paligemma-3b-pt-224-tokenizer
```

**检查结果：** 两个目录都存在且非空，`$PI05_MODEL_DIR` 下应有 `config.json`、`model.safetensors`、
`policy_preprocessor.json`、`policy_postprocessor.json`。

**注意：** 节点真正读的是 `profiles/pi05/policy.yaml` 里的 `pretrained_path` / `tokenizer_path`，
这两个字段写成 `${PI05_MODEL_DIR}` / `${PI05_TOKENIZER_DIR}` 时，由 `dataflow.yaml` 的 policy 节点 `env:` 转发过去。
所以启动前要同时满足两件事：变量已 export，且 `dataflow.yaml` 里 policy 节点有转发（0.3.2 起已修）。
如果启动钩子校验通过、但 dora 日志里策略节点报找不到权重目录，先查这一处。

### 缺失时下载（固定 revision）

```bash
python ~/.PhyAgentOS/skills/libero/scripts/download_pi05.py \
  --model-dir "$PI05_MODEL_DIR" --tokenizer-dir "$PI05_TOKENIZER_DIR"
```

**检查结果：** 结束时打印两个目录的绝对路径。只检查不下载就加 `--verify-only`。

**注意：** tokenizer 来自 gated 仓库 `google/paligemma-3b-pt-224`，下载前要接受许可并设置 `HF_TOKEN`；
已经有本地副本就不用设。

## 5. 配置 LLM API

这个 profile 的动作用哪一步、挪多少，全部由 π0.5 策略节点产生；但 `paos agent` 这个驱动本身是一个 LLM 循环，
没有可用的 API key 会直接停在 `Error: No API key configured. Set one in ~/.PhyAgentOS/config.json under providers section`。
paos 只从 `~/.PhyAgentOS/config.json` 读，不在别处找。

不要在录屏里贴 key。用隐藏输入写入：

```bash
python - <<'PY'
import json, getpass
from pathlib import Path

key = getpass.getpass("Paste API key (输入不回显): ").strip()

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

**检查结果：** 打印出 `wrote /…/.PhyAgentOS/config.json`。接着确认能通：

```bash
paos agent -m "你好"
```

**注意：** `~` 指的是当前 shell 的 `HOME`。请使用同一用户写入配置并运行 `paos agent`，确保它读取到同一份 `~/.PhyAgentOS/config.json`。

**注意：** 这里选哪个模型只影响 agent 的调度质量，不影响 π0.5 的动作，也不影响成功率；想省额度就用 `custom` + `deepseek-flash`，
要用同一家的 GPT-6 就照 `libero-gpt6-quickstart.md` 的 §4 换 `openai_responses` + `gpt-6-astra-phyagentos`。

**注意：** 这台机器如果要靠代理才能出网，`paos agent` 访问 `newapi.x-era.com` 同样会读 `http_proxy`；反过来本机回环必须绕过代理（§3）。两件事都要对，否则一边报 `/tools unavailable`、一边报连不上 API。

## 6. 启动 π0.5 Profile

### 启动前环境变量自检（必须通过）

Dora 0.4.1 会在 `dora start` 时展开 dataflow 里的 `${...}`。以下变量必须在**当前这个 shell**
里全部设置；重新开终端后要重新执行前面的 `export`。缺任何一个时，Dora 可能报
`nodes[...] env: data did not match any variant of untagged enum EnvValue`。

注意：渲染出来的 `dataflow.yaml` 里仍然保留 `${...}` 是正常的，Dora 在启动时展开；
不要用 `grep '\${'` 判断是否出错。

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
    raise SystemExit("缺少环境变量，不要启动：" + ", ".join(missing))
for name in required:
    print(f"{name}={os.environ[name]}")

# 代理检查：本机 gateway 不能被代理接管
proxies = urllib.request.getproxies()
if proxies and not urllib.request.proxy_bypass("127.0.0.1"):
    raise SystemExit(
        "检测到代理但没有绕过 127.0.0.1：" + str(proxies) +
        "。PAOS 的健康检查会走代理，start 会在 15 分钟后报 "
        "'Gateway GET /tools is unavailable'。"
        ' 先执行 export no_proxy="127.0.0.1,localhost,::1" NO_PROXY="$no_proxy" 再启动。'
    )
print("proxy bypass 127.0.0.1: OK")
PY
```

**检查结果：** 打印四行变量值。任何一行缺失时先回到 §3 / §4 设置，不要继续启动。

**代理坑（会让 start 在 15 分钟后准点失败）：** 如果这台机器上配了代理（`http_proxy` / `https_proxy` / `ALL_PROXY`，
例如 Clash 的 `127.0.0.1:7890`）而 `no_proxy` 里没有 `127.0.0.1`，Python 的 `urllib` 会把健康检查请求
`http://127.0.0.1:19003/tools` 交给代理。症状是 start 卡到 15 分钟超时、报 `Gateway GET /tools is unavailable`，
而 gateway 日志里**一条 `GET /tools` 访问记录都没有**（请求根本没到 gateway）。修法：
`export no_proxy="127.0.0.1,localhost,::1" NO_PROXY="$no_proxy"`。上面那段自检脚本会直接拦住这种情况。

**为什么还要手动自检：** `paos skill start` 的预检只校验 `skill.yaml` 里的 `required_environment`，`pi05` 只声明了 `PI05_MODEL_DIR` / `PI05_TOKENIZER_DIR`；`CUDA_VISIBLE_DEVICES` / `TMPDIR` 漏了不会被预检拦下，而是等 Dora 展开占位符时报 `EnvValue` 那个错。

```bash
paos skill start libero --profile pi05
```

**检查结果：** 命令返回后 flow 已起，接着用下一步的 status 确认 Tool 就绪。

**注意：** `paos skill start` 会一直阻塞到 flow 就绪。这期间 `State: starting`、`Gateway GET /tools: unavailable`
都是正常的：节点是 onefile 打包，要先在 `TMPDIR` 里解包、gateway 才会 bind 19003（A100 + beegfs 冷启动实测 7.5 / 7.8 分钟）。
不要在这期间 Ctrl-C，否则没有释放的生命周期锁会让后面每条命令都报
`Error: Skill 'libero' has another lifecycle operation in progress`。

**注意：** 启动钩子会检查权重目录，路径不对在这里就直接报错，不会等到 Dora 起来几分钟后。

## 7. 检查 Tool 就绪

不要只看启动命令的返回值，先确认 Runtime 与 Tool 状态。

```bash
paos skill status libero
```

**检查结果：** `State: running`、`Gateway GET /tools: ready`，且 `libero.benchmark.describe`、`libero.benchmark.run`、`libero.policy` 三个 Tool 均为 ready。


## 8. 跑 libero_10 测评

### 用 agent 驱动测评

```bash
paos agent -m '用 libero skill 的 pi05 profile 跑 libero_10 测评：先 libero.policy 开 Session 并确认 running；
再 libero.benchmark.describe 读实时能力表；然后 libero.benchmark.run，
参数 task_ids=[0,1,2,3,4,5,6,7,8,9]，init_state_ids=[0,1,2,3,4]，num_runs=1，max_steps=520，seed=0。
跑到终态后读 benchmark 自己的结果文件，报告每个 task 的成功率、总成功率、每集 termination 和 num_steps，
最后停掉 policy Session。' --session cli:pi05-libero10
```

**检查结果：** agent 报告 `success_rate`、成功/总集数，以及每个 episode 的 task id / init id /
success / termination / num_steps。

**注意：** 这是 50 集（10 任务 × 5 初始状态）。A100 上实测单集（task 0 / init 0，267 步做成功）
从会话建立到写下结果文件约 50 秒，按此推算整批 40–60 分钟；实际耗时随任务步数变化，先用下面单集那步校准。
先跑单集冒烟（`task_ids` 和 `init_state_ids` 各给一个、`max_steps` 给 60）再上全量。

### 结果文件位置

```bash
find ~/.PhyAgentOS/forge_runtime/environments -name 'libero_10_*.json' -newermt '-2 hour' | sort
```

**检查结果：** 路径形如
`.../environments/libero/pi05/<hash>/launch/profiles/pi05/results/libero_10_<时间戳>_gateway-<id>.json`。

## 9. 停止 Skill

```bash
paos skill stop libero
```

**检查结果：** 状态回到 stopped，节点进程退出、显存释放。

**注意：** 换 profile 前必须先停干净：三个 profile 的节点 id 和端口都一样，两个 flow 同时跑会互相干扰
（表现为后起的那个 action server 一直报 `ACTION_NO_ROBOT_STATE`）。

**排障：** 如果 `stop` / `start` 报 `another lifecycle operation in progress`，说明有一个卡住的
`paos skill start` 还占着 `~/.PhyAgentOS/run/skills/.locks/libero.lock`：
`ps -ef | grep 'skill start libero'` 找到它、`kill -9` 掉，再 `paos skill stop libero --force` 即可。

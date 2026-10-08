# LIBERO-10 π0.5 + GPT-6 监督快速启动

按顺序完成 PAOS 准备、Node 与 Skill 安装、权重与模型 API 配置和 libero_10 测评。每条命令下方列出了应检查的状态与注意事项。

动作仍然由 π0.5 产生，GPT-6 只在检查点决定放行多少步 / 改写偏置 / 给 eef 目标 / 停。

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

### 宿主必须有 `uv`

`gpt6_pi05` 比 `pi05` 多两个随包 Python 节点（`image_vision` ×2、`vla_bridge`），它们的启动脚本是先用 `uv` 建 venv 再执行：

```bash
# nodes/image_vision/image_vision.sh 、 nodes/vla_bridge/vla_bridge.sh 的内容
uv sync --project "$ROOT" --quiet
exec "$ROOT/.venv/bin/<节点名>" "$@"
```

所以宿主 PATH 里必须有 `uv`（`pi05` profile 不碰这两个节点，没 uv 也能跑，差别就在这）：

```bash
command -v uv && uv --version || echo "缺 uv"
```

**检查结果：** 打印出版本号。缺 uv 时（不需要 sudo）：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.local/bin:$PATH"
command -v uv && uv --version
```

**注意：** 缺 uv 不会在启动时直接报错，而是 `paos skill start --profile gpt6_pi05` 一直不出结果，
15 分钟后报 `Runtime health check timed out: Gateway GET /tools is unavailable`。

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

### 预热两个 Python 节点（必须手工做一次）

Skill 装好后，先把这两个节点的依赖下下来，不要留给启动流程：

```bash
cd "$HOME/.PhyAgentOS/skills/libero/nodes/image_vision" && uv sync --quiet && echo "OK image_vision"
cd "$HOME/.PhyAgentOS/skills/libero/nodes/vla_bridge" && uv sync --quiet && echo "OK vla_bridge"
```

**检查结果：** 两行分别打印 `OK image_vision`、`OK vla_bridge`。

**注意：** 第一次会下 400 MB 左右的依赖（image_vision 占大头），慢是正常的。这一步必须在启动前做完：
`startup_timeout_s` 只有 900 秒，而启动流程里同时还要把 π0.5 权重加载进显存，把下载挤进去，网络一慢就准点超时。

### 检查版本、profile 与制品

```bash
paos skill inspect libero
paos forge-node verify libero gateway
paos forge-node verify libero libero_benchmark
```

**检查结果：** 版本为 0.3.4-ubuntu20.1（或更高），profile 共 6 个（act / gpt6 / gpt6_pi05 / kai0 / lingbot_va / pi05），两条 verify 均通过。

**注意：** `libero_benchmark` 节点不带 `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1` 时，torch≥2.6 的
`torch.load` 默认 `weights_only=True` 会让 LIBERO 的 init-state 反序列化直接抛
`_pickle.UnpicklingError`，`vlm_vla.benchmark.describe` / `run` 永远不 ready。
本 profile（0.3.1 起）已经在 `profiles/gpt6_pi05/dataflow.yaml` 里自带这个变量，不用额外设置。


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

# 本机回环必须绕过代理
export no_proxy="127.0.0.1,localhost,::1"
export NO_PROXY="$no_proxy"
```

**检查结果：** `nvidia-smi` 里这张卡的显存基本是空的。

**注意：** `TMPDIR` 要留够空间：节点是 onefile 打包，启动时在这里解包。

**注意：** `no_proxy` 这两行不能省——它管的是**本机回环**。机器上只要配了代理（`http_proxy` / `https_proxy` /
`ALL_PROXY`，Clash 一类常见默认值是 `127.0.0.1:7890`）而 `no_proxy` 里没有 `127.0.0.1`，PAOS 的启动健康检查
（Python `urllib`）会把 `http://127.0.0.1:19003/tools` 交给代理，请求根本到不了本机 gateway，
`paos skill start` 会在 15 分钟后准点失败并报 `Gateway GET /tools is unavailable`。详见 §5 的「代理坑」。

**代理本身挂掉是另一回事（外网的事）：** 如果那些代理变量指向的端口其实没在跑，症状是 `curl` 报
`Connection refused (os error 111)` 或 `tunnel error`，那么 `uv sync`、`pip`、HF 下载这些**出网**动作会一起失败。
先用这两条判断：

```bash
env | grep -i proxy || echo "(无 proxy 变量)"
curl -sS -o /dev/null -w 'pythonhosted: %{http_code} %{time_total}s\n' \
  --noproxy '*' --max-time 15 https://files.pythonhosted.org/simple/ || echo "pythonhosted: FAIL"
```

第二条打印出 200/404 就说明直连没问题（`--noproxy '*'` 是绕开代理测的）。这时把死掉的代理从当前 shell 清掉、
`no_proxy` 保留，再回到 §1 重跑预热：

```bash
unset http_proxy https_proxy ALL_PROXY HTTP_PROXY HTTPS_PROXY all_proxy
```


## 4. 准备 π0.5 权重、模型 API 与批次 suite

### 指向 π0.5 权重（走环境变量，0.3.4 起）

```bash
export PI05_MODEL_DIR=/abs/path/to/pi05_libero_finetuned_v044
export PI05_TOKENIZER_DIR=/abs/path/to/paligemma-3b-pt-224-tokenizer
```

**检查结果：** 两个目录都存在且非空：`$PI05_MODEL_DIR` 下应有 `config.json`、`model.safetensors`
（约 7.5 GB）、`policy_preprocessor.json`；`$PI05_TOKENIZER_DIR` 下应有 `tokenizer_config.json` 等。

`profiles/gpt6_pi05/policy.yaml` 里这两个字段写的是 `${PI05_MODEL_DIR}` / `${PI05_TOKENIZER_DIR}`，
由 `dataflow.yaml` 的 `lerobot_infer` 节点 `env:` 转发（**只 export 不够，节点必须转发**，0.3.4 已修）。
启动钩子 `scripts/verify_gpt6_pi05_assets.py` 会在启动前按同一套变量做存在性检查，没设变量会直接报变量名。

**注意：** 0.3.2 及更早的包里 policy.yaml 写死了构建机绝对路径，换机器必挂——请用 0.3.4 或更高版本。

### 配置 LLM API

写入 `~/.PhyAgentOS/config.json`：

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

**检查结果：** `paos agent -m "你好"` 能正常回话。

**注意：** `maxToolIterations` 是一次 agent 调用的工具调用上限，批次口径见 §7.3；
`openaiResponses` 与 `openai_responses` 两种键名都接受。

### 先确认这把 key 能看到这个模型

`gpt-6-astra-phyagentos` 只挂在**专有分组**的通道上。普通分组的 key 通常只能看到 `gpt-6-astra`，
直接配 `gpt-6-astra-phyagentos` 会拿到 `503 model_not_found`
（`No available channel for model gpt-6-astra-phyagentos under group ...`）。先查一把：

```bash
python - <<'PY'
import json, os, urllib.request
cfg = json.load(open(os.path.join(os.environ["HOME"], ".PhyAgentOS", "config.json")))
pv = cfg["providers"]["openaiResponses"]
req = urllib.request.Request(pv["apiBase"].rstrip("/") + "/models",
                             headers={"Authorization": "Bearer " + pv["apiKey"]})
d = json.load(urllib.request.urlopen(req, timeout=20))
ids = sorted(m.get("id", "?") for m in d.get("data", []))
print("可见模型数:", len(ids))
print("含 astra 的:", [i for i in ids if "astra" in i.lower()])
PY
```

**检查结果：** 列表里出现 `gpt-6-astra-phyagentos`，才能照上面的 JSON 配；只有 `gpt-6-astra` 就把它填成 model；
两个都没有（或 401）就找运维加通道 / 换 key。

### 换成别的监督模型（DeepSeek 等 OpenAI 兼容端点）

把 provider 换成 `custom` 即可，不用改任何 Skill / profile 配置：

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

`custom` 直连 `chat.completions`，agent 的 `vision.get_frame` 会把 JPEG 以
`data:image/jpeg;base64,...` 的 content part 发进去；`deepseek-flash` 可作为监督 VLM 使用。

### 选定 suite（必须写在这里，不是 run 的参数）

```yaml
# ~/.PhyAgentOS/skills/libero/profiles/gpt6_pi05/benchmark.yaml
suite: libero_10
```

**检查结果：** launcher 起 flow 时按这一行决定加载哪个 suite；改完必须 `paos skill stop libero --force` 再重新 start。

**注意：** `vlm_vla.benchmark.run` 的 `suite` 参数**不会**切换已加载的 suite。
同一次 run 里传 `suite=libero_10`、而 `benchmark.yaml` 写着 `libero_spatial`，结果跑的是 `libero_spatial` 的 task 2
（"pick up the black bowl ..."），结果文件名也是 `libero_spatial_<ts>_gateway-<id>.json`。
反过来只把 `benchmark.yaml` 改成 `libero_10`，同一个 run 参数就能跑出 `libero_10` 的 task 2
（"turn on the stove and put the moka pot on it"）。`task_ids` / `init_state_ids` / `num_runs` / `max_steps` / `seed`
这几个参数仍然是 run 参数说了算。`vlm_vla.benchmark.describe` 的返回也会如实报出当前加载的 suite。


## 5. 启动 GPT-6 监督 Profile

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

**为什么还要手动自检：** `gpt6_pi05` 的 `required_environment` 四项都有（预检会先拦一道），这段脚本只是让你在启动前就看到实际取值；换 shell、换 tmux 窗口后 `TMPDIR` 这类不会自动带上，必须在新 shell 里重新 export。

```bash
paos skill start libero --profile gpt6_pi05
```

**检查结果：** 命令返回后 flow 已起，接着用下一步的 status 确认 7 个 Tool 全部就绪。

**注意：** `paos skill start` 阻塞到 flow 就绪；π0.5 + 两个 image_vision + vla_bridge 实测 **8 分钟上下**（A100 上 8 分 09 秒，其中 π0.5 权重加载占绝大部分）。启动期间终端被占住是正常的，不要在同一个终端里再发命令，也别开第二个 `paos skill start`。

**注意：** 需要 `CUDA_VISIBLE_DEVICES` 与 `TMPDIR` 都已设置，否则预检报
`Required environment is not configured`。

## 6. 检查 Tool 就绪

不要只看启动命令的返回值，先确认 Runtime 与 Tool 状态。

```bash
paos skill status libero
```

**检查结果：** `State: running`、`Gateway GET /tools: ready`，且 `vlm_vla.benchmark.describe`、`vlm_vla.benchmark.run`、`vla.set_mode`、`vla.decide`、`vla.get_status`、`vision.get_frame`、`vision.get_frame_wrist` 共 7 个 Tool 均 ready。

**注意：** 第一个 episode 里常见一次 `C2 reason=policy_starved`——π0.5 还在把权重装进显存，10 秒内一个动作都没吐出来，
bridge 就把 episode 停住并开了检查点。这是正常的，agent 答一次 `student` 就继续；不想让它出现在正式记录里，照 §7.1 先热身一集。


## 7. 跑 libero_10 测评

### 7.1 先热身一集

π0.5 是懒加载：第一个 episode 的第一次推理要先把权重装进显存，而 bridge 的 `policy_starved` 阈值是 10 秒
（10 秒内策略一个动作都没吐出来，就把 episode 停住并开一个 `C2` 检查点）。所以**首集几乎必然出现一次
`C2 reason=policy_starved`**，agent 得答一次 `student` 才能继续——功能上没问题，但记录里不好看。

正式跑之前先空跑一集，让策略把权重读进显存，这一集的结果丢掉：

```bash
paos agent -m '用 libero skill 的 gpt6_pi05 profile 热身：先 vla.set_mode(mode=stop)，
再起 vlm_vla.benchmark.run（suite=libero_10、task_ids=[0]、init_state_ids=[0]、num_runs=1、
max_steps=60、seed=0），C0 直接 vla.decide(mode=student) 放行，然后 vla.set_mode(mode=student)
把这一集交回策略，等它结束就停掉 Session。这一集只看链路，不看成绩。' --session cli:gpt6pi05-warmup
```

### 7.2 单集冒烟（验链路，不判成绩）

```bash
paos agent -m '用 libero skill 的 gpt6_pi05 profile 跑一集冒烟（libero_10，task 0 / init 0）：

1) 先 vlm_vla.benchmark.describe 读实时能力表，确认当前加载的 suite 是 libero_10；
2) 走监督入口：先 vla.set_mode(mode=stop) 持住，再起 vlm_vla.benchmark.run，参数 suite=libero_10、task_ids=[0]、init_state_ids=[0]、num_runs=1、max_steps=520、seed=0；
3) 每轮严格按 SKILL.md 附录 A 的 §4.2–§4.4：第一步永远是 vla.get_status。
   episode.steps==0 就是 C0，直接 vla.decide(mode=student) 放行（这一步才是让 episode 真正开始的），C0 不要看图；
   到 C1 再 vision.get_frame（max_age_ms=60000；需要时加 vision.get_frame_wrist）并真的看图，
   然后恰好一次 vla.decide，回读 segment/checkpoint，再 vla.get_status 看这一段跑成什么样；
4) 只答 C0 和 C1，答完立刻 vla.set_mode(mode=student) 把剩下的 episode 交回策略跑完——绝不能把 episode 停在未回答的检查点上；
5) 等到终态，报告这一集的 instruction / success / termination / num_steps 和结果文件路径；
6) 最后停掉 Session。
判定只看 benchmark 自己写的 results/libero_10_*.json，不看 AgentTask 的记账。' --session cli:gpt6pi05-smoke-t0i0
```

**检查结果：** agent 依次 `describe` → `set_mode(stop)` → `run` → C0 放行 → 至少一次 C1（双相机取帧 + 恰好一次 `decide`）
→ `set_mode(student)` → 终态，报出 `success` / `termination` / `num_steps` 和结果文件路径。

**注意：** 监督入口只能是 `set_mode(mode=stop)`。先送 `policy`/`student` 再起批次就是非监督基线：
一个检查点都不会开，agent 永远等不到要它决策的地方——这个差别是静默的，表面上看只是"没人被问到"。

**注意：** 单集是随机样本，不是成绩。π0.5 每次推理会重新采样动作，同一 (task, init, seed) 跑两次结果可能不同。
另外 bridge 自报的步数和 benchmark 记的 `num_steps` 会不一致（实测 623 vs 520，两套计步口径），别当故障。

### 7.3 正式批次：一个 task 一次调用

`maxToolIterations` 是**一次 agent 调用**的工具调用上限（配置默认 400）。一集连带轮询和决策大概要 20–40 次工具调用，
所以一次调用最多也就十几集。把 10 个 task × 5 个初始状态共 50 集塞进一次调用，中途一定被截断。

正确口径是**每个 task 单独一次调用**（10 次，每次 5 集）：

```bash
for t in 0 1 2 3 4 5 6 7 8 9; do
  paos agent -m "用 libero skill 的 gpt6_pi05 profile 跑 libero_10 的 task $t 的 5 个初始状态：
  先 vlm_vla.benchmark.describe 确认 suite 是 libero_10；vla.set_mode(mode=stop) 后起 vlm_vla.benchmark.run，
  参数 suite=libero_10、task_ids=[$t]、init_state_ids=[0,1,2,3,4]、num_runs=1、max_steps=800、seed=0；
  每个检查点按 SKILL.md 附录 A §4.4 来：先 vla.get_status，需要看图时 vision.get_frame（max_age_ms=60000），
  每集最多 4 次决策、每段不超过 15 步，预算用完后立刻 vla.set_mode(mode=student) 交回剩余，
  永远不要让 episode 停在未回答的检查点上；少轮询，每集都等到终态再进下一集；
  批次结束后报告每集的 task/init/success/termination/num_steps 和总成功率，最后停掉 Session。
  判定只看 results/libero_10_*.json。" --session "cli:gpt6pi05-t${t}"
done
```

**注意：** `max_steps` 用 **800**。这是 libero_10 的历史基线口径——π0.5 在 libero_10 上 50 集 0.92 的那一批就是 800 步；
用 520 会把一批本来能做完的长程任务判成 `timed_out`，成功率不能拿去和基线比。

**注意：** `maxToolIterations` 建议抬到 1000（`~/.PhyAgentOS/config.json` 的 `agents.defaults`）。400 跑一个 task 的 5 集
勉强够，但 agent 轮询多一点就会被截断；真被截断了也不用重跑，去 `results/libero_10_*.json` 回收已经跑完的集数。

### 结果文件位置

```bash
find ~/.PhyAgentOS/forge_runtime/environments -name 'libero_10_*.json' -newermt '-2 hour' | sort
```

**检查结果：** 路径形如
`.../environments/libero/gpt6_pi05/<hash>/launch/profiles/gpt6_pi05/results/libero_10_<时间戳>_gateway-<id>.json`。

## 8. 停止 Skill

```bash
paos skill stop libero
```

**检查结果：** 状态回到 stopped，节点进程退出、显存释放。

**注意：** 换 profile 前必须先停干净：三个 profile 的节点 id 和端口都一样，两个 flow 同时跑会互相干扰
（表现为后起的那个 action server 一直报 `ACTION_NO_ROBOT_STATE`）。

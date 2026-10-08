# LIBERO-10 纯 VLM 出动作快速启动

按顺序完成 PAOS 准备、Node 与 Skill 安装、模型 API 配置和 libero_10 测评。每条命令下方列出了应检查的状态与注意事项。

这条链路里没有任何学习型策略：GPT-6 自己看图、自己把像素接地点解成抓取位姿、自己给夹爪开度。

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

### 宿主必须有 `uv`（本 profile 的三个 Python 节点）

这条链路的动作由三个随包 Python 节点提供（`image_vision`、`vision_grounding`、`libero_action_server`），
它们的启动脚本都是先用 `uv` 建 venv 再执行：

```bash
# nodes/<节点名>/<节点名>.sh 的内容
uv sync --project "$ROOT" --quiet
exec "$ROOT/.venv/bin/<节点名>" "$@"
```

所以宿主 PATH 里必须有 `uv`：

```bash
command -v uv && uv --version || echo "缺 uv"
```

**检查结果：** 打印出版本号。缺 uv 时（不需要 sudo）：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.local/bin:$PATH"
command -v uv && uv --version
```

**注意：** 缺 uv 不会在启动时报错，而是 `paos skill start --profile gpt6` 一直不出结果，
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
# 这条链路不需要 lerobot_runner（动作链路上没有学习型策略）
```

**检查结果：** 每条命令各自成功。`libero_benchmark` 制品约 540 MB，首次下载需要时间。

**注意：** 注册表访问不了时可用本地制品代替，例如
`paos forge-node install libero libero_benchmark --archive /abs/path/libero_benchmark-1.0.1-ubuntu20.1-linux-x86_64.tar.gz`。

### 预热三个 Python 节点（必须手工做一次）

Skill 装好后，先把这三个节点的依赖下下来，不要留给启动流程：

```bash
for n in image_vision vision_grounding libero_action_server; do
  cd "$HOME/.PhyAgentOS/skills/libero/nodes/$n" && uv sync --quiet && echo "OK $n"
done
```

**检查结果：** 打印三行 `OK image_vision`、`OK vision_grounding`、`OK libero_action_server`。

**注意：** 第一次会下几百 MB 的依赖，慢是正常的。这一步必须在启动前做完：`startup_timeout_s` 只有 900 秒，
把下载挤进启动窗口，网络一慢就准点超时。

### 检查版本、profile 与制品

```bash
paos skill inspect libero
paos forge-node verify libero gateway
paos forge-node verify libero libero_benchmark
```

**检查结果：** 版本为 0.3.4-ubuntu20.1，profile 共 6 个（act / gpt6 / gpt6_pi05 / kai0 / lingbot_va / pi05），两条 verify 均通过。


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
`paos skill start` 会在 15 分钟后准点失败并报 `Gateway GET /tools is unavailable`。详见 §6 的「代理坑」。

**代理本身挂掉是另一回事（外网的事）：** 如果那些代理变量指向的端口其实没在跑，症状是 `curl` 报
`Connection refused (os error 111)` 或 `tunnel error`，那么 `uv sync`、`pip` 这些**出网**动作会一起失败。
先用这两条判断：

```bash
env | grep -i proxy || echo "(无 proxy 变量)"
curl -sS -o /dev/null -w 'pythonhosted: %{http_code} %{time_total}s\n' \
  --noproxy '*' --max-time 15 https://files.pythonhosted.org/simple/ || echo "pythonhosted: FAIL"
```

第二条打印出 200/404 就说明直连没问题。这时把死掉的代理从当前 shell 清掉、`no_proxy` 保留，再回到 §1 重跑预热：

```bash
unset http_proxy https_proxy ALL_PROXY HTTP_PROXY HTTPS_PROXY all_proxy
```


## 4. 配置 LLM API

这条链路没有本地权重，只要模型 API。

### 写入 `~/.PhyAgentOS/config.json`

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

**注意：** `maxToolIterations` 必须抬到 400。默认值跑不完一集纯 VLM，会在工具调用上限处被截断。

### 先确认这把 key 能看到这个模型

这条链路的模型**就是执行者本身**，模型名不存在等于整条链路没得跑。`gpt-6-astra-phyagentos` 只挂在**专有分组**的
通道上，普通分组的 key 通常只能看到 `gpt-6-astra`，直接配 `gpt-6-astra-phyagentos` 会拿到 `503 model_not_found`
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

provider 用 `custom` 即可，Skill / profile 一个字都不用改：

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

`custom` 走 `chat.completions`，`vision.get_frame` 返回的 JPEG 以
`data:image/jpeg;base64,...` 的 content part 送进模型；`deepseek-flash` 可据此调用
`motion.move_pose`。

## 5. 把测评协议写进配置

这条链路没有「起批次」的工具，批次由 `libero_benchmark` 在启动时自动开始，所以协议要写进已安装副本的配置里。

### 写批次协议

```yaml
# ~/.PhyAgentOS/skills/libero/profiles/gpt6/benchmark.yaml
suite: libero_10
task_ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
init_state_ids: [0, 1, 2, 3, 4]
num_runs: 1
max_steps: 520
result_dir: results
```

**检查结果：** 这就是 50 集（10 任务 × 5 初始状态）。先跑单集冒烟时改成 `task_ids: [2]`、`init_state_ids: [0]`。

**注意：** 这条 profile 是 AUTORUN，**真正终止 episode 的是这一份里的 `max_steps`**
（冒烟时 60 步就是 60 步结束、`termination: timed_out`）；下面 action server 那份只是把同一个数告诉 agent。
两份写成不一样时，agent 会按 action server 的数字以为自己还有余量（例如它报 `episode.max_steps 520`，
实际 60 步就被 harness 掐掉）。改预算时两份一起改。

### 同步 action server 的两处镜像值

```yaml
# ~/.PhyAgentOS/skills/libero/profiles/gpt6/libero_action_server.yaml
episode:
  result_dir: results
  max_steps: 520
```

**检查结果：** 这两处必须与 `benchmark.yaml` 一致：agent 读的步数预算和结果目录来自这一份，不是上面那份。

## 6. 启动纯 VLM Profile

### 启动前环境变量自检

Dora 0.4.1 在 `dora start` 时展开 dataflow 里的 `${...}`，被引用却没有设置的变量会让 Dora 报
`nodes[...] env: data did not match any variant of untagged enum EnvValue`。
渲染出来的 `dataflow.yaml` 里保留 `${...}` 是正常的，Dora 启动时才展开，不要用 `grep '\${'` 判断是否出错。

本 profile 不会踩这个坑：`profiles/gpt6/dataflow.yaml` 的节点 `env:` 里没有任何 `${...}` 占位符
（`${FORGE_RUNTIME_BIN}` / `${PAOS_SKILL_ROOT}` 只出现在 `path:`，安装渲染时就已经替换成绝对路径）。
所以缺环境变量时它照样能启动，不需要先 export 才能起。

下面两项仍然建议设置，它们决定的是运行行为，不是能不能启动：

```bash
python - <<'PY'
import os
import urllib.request

recommended = [
    "TMPDIR",                 # onefile 节点的解包目录
    "CUDA_VISIBLE_DEVICES",   # libero_benchmark 用哪张卡
]
for name in recommended:
    value = os.environ.get(name)
    print(f"{name}={value}" if value else f"{name} 未设置（本 profile 仍可启动）")

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

**代理坑（会让 start 在 15 分钟后准点失败）：** 如果这台机器上配了代理（`http_proxy` / `https_proxy` / `ALL_PROXY`，
例如 Clash 的 `127.0.0.1:7890`）而 `no_proxy` 里没有 `127.0.0.1`，Python 的 `urllib` 会把健康检查请求
`http://127.0.0.1:19003/tools` 交给代理。症状是 start 卡到 15 分钟超时、报 `Gateway GET /tools is unavailable`，
而 gateway 日志里**一条 `GET /tools` 访问记录都没有**（请求根本没到 gateway）。修法：
`export no_proxy="127.0.0.1,localhost,::1" NO_PROXY="$no_proxy"`。上面那段自检脚本会直接拦住这种情况。
**检查结果：** 打印两行。缺项时本 profile 仍能启动，但请回 §3 补齐后再跑，避免解包写到空间不足的
`/tmp`，或 benchmark 落到别的任务占用的卡上。

**注意：** 另外两条链路（`pi05` / `gpt6_pi05`）的节点 `env:` 确实引用了
`${CUDA_VISIBLE_DEVICES}`、`${TMPDIR}`、`${PI05_MODEL_DIR}`、`${PI05_TOKENIZER_DIR}`，
必须在与 `paos skill start` **同一个 shell**（同一个 tmux 窗口 / SSH 会话）里 export，换终端要重设。

```bash
paos skill start libero --profile gpt6
```

**检查结果：** 命令返回后 flow 已起，接着用下一步的 status 确认 5 个 Tool 全部就绪。

## 7. 检查 Tool 就绪

不要只看启动命令的返回值，先确认 Runtime 与 Tool 状态。

```bash
paos skill status libero
```

**检查结果：** `State: running`、`Gateway GET /tools: ready`，且 `vision.get_frame`、`vision.ground_point`、`motion.resolve_relative_pose`、`motion.move_pose`、`gripper.set_opening` 五个 Tool 均 ready。


## 8. 等仿真器开始，再启动 Agent

### 等日志出现 episode 1/1

```bash
DLOG=$HOME/.PhyAgentOS/logs/skills/paos-libero-gpt6-dora.log
for i in $(seq 1 30); do grep -q 'episode 1/1' "$DLOG" && break; sleep 10; done
grep -o 'episode 1/1 .*' "$DLOG" | tail -1
```

**检查结果：** 打印出一行 `episode 1/1 ...`（含 task id 和 instruction）。

**注意：** 从 flow ready 到这一行要 20–90 秒。太早起 agent 会拿不到初始观测直接退出。

### 用 agent 驱动这一集

```bash
paos agent -m '用 libero skill 的 gpt6 profile 跑当前这一集：先 vision.get_frame 看 agentview 和任务指令，
按 SKILL.md 附录 B 的循环（§6.1 只有你的动作推进仿真；§6.2 先 motion.resolve_relative_pose 读状态；
§6.4 终端相位只有 completed 是成功）自己完成整集；episode 到终态后报告 success、termination、num_steps。' \
  --session cli:gpt6-libero10-t2
```

**检查结果：** agent 报告这一集的 success / termination / num_steps。

**注意：** 一集一个 session。整批 50 集就是 50 个 session：批次边界由 benchmark 自己推进，
一个 session 连着盯多集会把上下文顶爆，agent 一死仿真就冻在检查点上不动。

**注意：** 纯 VLM 是「一个工具调用走一步仿真」，520 步一集要 agent 发几百次调用；
冒烟请把 `max_steps` 压到 40–60，否则光 agent 调用就够跑一晚上。

**注意：** agent 收尾时可能把自建的 AgentTask 记成 `failed`（`evidence association is below task policy`），
那是 agent 侧取证合同没配好，不是仿真或工具失败；结论看 benchmark 的结果文件。

### 结果文件位置

```bash
find ~/.PhyAgentOS/forge_runtime/environments -name 'libero_10_*.json' -newermt '-2 hour' | sort
```

**检查结果：** 路径形如
`.../environments/libero/gpt6/<hash>/launch/profiles/gpt6/results/libero_10_<时间戳>_gateway-<id>.json`。

## 9. 停止 Skill

```bash
paos skill stop libero
```

**检查结果：** 状态回到 stopped，节点进程退出、显存释放。

**注意：** 换 profile 前必须先停干净：三个 profile 的节点 id 和端口都一样，两个 flow 同时跑会互相干扰
（表现为后起的那个 action server 一直报 `ACTION_NO_ROBOT_STATE`）。

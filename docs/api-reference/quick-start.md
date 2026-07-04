---
title: 快速开始
description: 安装、初始化、启动 Agent 与无硬件冒烟测试
---

# 快速开始

## 1. 环境与安装

基础环境：

- Python 3.11 或 3.12
- Git
- 一个受支持的 LLM Provider；本地/远端 Runtime 场景还需要各自依赖
- 开发与测试使用 pytest 9

```bash
git clone https://github.com/PhyAgentOS/PhyAgentOS.git
cd PhyAgentOS
python -m pip install -e .

# 需要运行测试时
python -m pip install -e ".[dev]"
```

安装后可用的顶层命令：

```text
paos onboard
paos agent
paos gateway
paos status
paos provider login <provider>
```

## 2. 初始化与最小配置

```bash
paos onboard
```

该命令创建或刷新 `~/.PhyAgentOS/config.json`，并同步 Agent 工作区模板。默认 Agent 工作区为 `~/.PhyAgentOS/workspace`。当 `paos agent` 或 `paos gateway` 启动且 `runtime.enabled=true` 时，RuntimeWorkspaceManager 再创建 Runtime 协议文件并按配置启动 Watchdog。

最小 API Provider 配置示例：

```json
{
  "agents": {
    "defaults": {
      "model": "openrouter/openai/gpt-4o-mini",
      "workspace": "~/.PhyAgentOS/workspace"
    }
  },
  "providers": {
    "openrouter": {
      "apiKey": "YOUR_API_KEY"
    }
  },
  "runtime": {
    "enabled": true,
    "autostartWatchdog": true
  }
}
```

配置文件使用 camelCase；加载器同时接受 snake_case。`runtime.workspace` 未设置时，Runtime 与 Agent 使用同一工作区。

## 3. 启动 Agent

交互模式：

```bash
paos agent
```

单轮模式：

```bash
paos agent -m "检查已启用的 runtime target"
```

指定配置或工作区：

```bash
paos agent --config /path/to/config.json --workspace /path/to/workspace
```

长期在线并启用 Channel、Cron 和 Heartbeat：

```bash
paos gateway --port 18790
```

`--workspace` 在 single 模式覆盖 Agent 工作区；fleet 模式下覆盖 shared workspace。运行日志默认隐藏，可用 `paos agent --logs` 查看。

## 4. 无硬件 Runtime 冒烟测试

以下流程直接使用仓库内置 Dummy Target 和 Dummy Policy，不需要 LLM、仿真器或机器人：

```bash
python scripts/init_runtime_workspace.py --workspace /tmp/paos-runtime
python scripts/run_runtime_watchdog.py \
  --workspace /tmp/paos-runtime \
  --once \
  --session-id sess_dummy_smoke
```

验证 `/tmp/paos-runtime/SESSIONS.md` 中 `sess_dummy_smoke.status` 为 `succeeded`，并检查：

```text
/tmp/paos-runtime/artifacts/runtime/sess_dummy_smoke/episode.json
```

`--session-id` 会把指定 Session 重置为 pending 后执行，适合重复冒烟测试；正常后台 Watchdog 不会自动重跑终态 Session。

## 5. Runtime 工作区

| 文件/目录 | 所有权 | 用途 |
|---|---|---|
| `RUNTIME.md` | Runtime 自动生成 | 告诉 Agent 如何创建 Session |
| `TARGETS.md` | 用户维护 | Target、Endpoint、Adapter、Contract 引用 |
| `SKILLRUNTIME.md` | 用户维护 | Skill Runtime 与 Policy/IO Contract |
| `SESSIONS.md` | Agent + Runtime | 队列、状态和结果 |
| `ENVIRONMENT.md` | Runtime/Perception | Target 与场景状态 |
| `LESSONS.md` | Runtime/Verifier | 失败和验收经验 |
| `configs/runtime/` | 用户维护 | Sensor、Perception、Runtime Contract |
| `artifacts/runtime/` | Runtime | Episode 和语义验收证据 |

不要手工修改正在运行的 Session 状态，也不要把 `RUNTIME.md` 当作状态文件。新增 Session 时必须保留原有 Session 和 Result。

## 6. Session 状态

未开启 Agent 语义验收：

```text
pending → claimed → preflight_checking → running → finalizing
        → succeeded | failed | timed_out | cancelled
preflight_checking → rejected
```

开启语义验收且 Runtime 执行成功：

```text
finalizing → awaiting_verification → verifying
           → succeeded | failed | replanned
```

`replanned` 会保留原 Session，并追加一个新的 pending 子 Session。

## 7. 当前场景

### 7.1 LIBERO + OpenPI

在 LIBERO 环境所在机器启动 TargetWS：

```bash
MUJOCO_GL=egl PYTHONWARNINGS=ignore \
conda run -n liberopi python PhyAgentOS/runtime/targets/remote/libero/server.py \
  --host 0.0.0.0 --port 9002
```

在策略机器启动 pi0-family server：

```bash
conda run -n lerobot-pi python -m PhyAgentOS.runtime.policy.openpi.lerobot_pi0_server \
  --model-dir /path/to/checkpoint --host 0.0.0.0 --port 8000
```

在 Runtime 工作区中把：

- Target Endpoint 设为 `targetws://<libero-host>:9002`
- Session Policy Endpoint 设为 `openpi://<policy-host>:8000`
- `target_ref`/`skillruntime_ref` 对应 `libero_real_remote`/`pi05_libero_remote`

然后由 Agent 追加 Session，或执行已存在的 Session：

```bash
python scripts/run_runtime_watchdog.py \
  --workspace /path/to/runtime-workspace \
  --once \
  --session-id <session_id>
```

### 7.2 Isaac Sim TargetWS

```bash
python PhyAgentOS/runtime/targets/remote/isaacsim/server.py \
  --config rollout/configs/pipergo2_manipulation.json \
  --gui --port 9003
```

Merom 多机器人场景使用：

```bash
python PhyAgentOS/runtime/targets/remote/isaacsim/server.py \
  --config rollout/configs/merom_multi_robot.json \
  --gui --port 9003
```

Runtime Endpoint 为 `targetws://127.0.0.1:9003`。命令型 Session 由 `CommandSimSkillRuntime` 调用 Target 的 `execute_step`，VLA Session 则通过 OpenPI Policy 闭环。

### 7.3 BEHAVIOR-1K

```bash
# Terminal A: TargetWS
bash b1k_integration/scripts/start_behavior1k_server.sh --gui --port 9004

# Terminal B: Policy server
export CHECKPOINT_DIR=/path/to/pi0_b1k/checkpoint
bash b1k_integration/scripts/start_b1k_openpi_policy_server.sh

# Terminal C: E2E
python b1k_integration/scripts/run_b1k_openpi_real_e2e.py \
  --workspace b1k_integration/workspaces/behavior1k_eval
```

详细依赖和任务配置见 `b1k_integration/README.md` 与其 workspace 文档。

### 7.4 当前不支持的旧启动方式

不要使用以下历史命令：

```text
python hal/hal_watchdog.py ...
--driver franka_multi
--driver go2_edu
--driver xlerobot_2wheels_remote
```

v0.1.6 当前源码没有可安装的 `hal` Driver Runtime。对应 JSON 示例不代表后端仍可运行。真实机器人应在完成 `BaseRolloutTarget`、Contract、Adapter 和安全门禁后通过 Session Runtime 接入。

## 8. Agent 语义验收

```json
{
  "agents": {
    "verification": {
      "enabled": true,
      "model": null,
      "maxReplans": 1,
      "rgbRetention": "failed"
    }
  }
}
```

- `all`：所有终态保留 RGB。
- `failed`：成功后删除 RGB，失败/replan 保留；这是默认值。
- `none`：有效 verdict 后删除 RGB。

证据位于 `artifacts/runtime/<session_id>/`。验收失败不会把 Runtime 执行事实改写为另一次执行；它通过 Session 终态、Verification Attempt 和 LESSONS 记录语义结论。

## 9. Fleet 配置边界

```json
{
  "embodiments": {
    "mode": "fleet",
    "sharedWorkspace": "~/.workspaces/shared",
    "instances": [
      {
        "robotId": "robot_001",
        "driver": "logical_identifier",
        "workspace": "~/.workspaces/robot_001",
        "enabled": true
      }
    ]
  }
}
```

当前实现会创建 shared/instance 工作区并解析共享 Environment/LESSONS；`driver` 目前是拓扑元数据，不会自动构造旧 HAL Driver。多 Target 的实际执行能力仍由 `TARGETS.md` 和已注册 Target Runtime 决定。

## 10. 排障

### Runtime 文件未创建

确认 `runtime.enabled=true`，并启动 `paos agent`/`paos gateway`；也可显式运行：

```bash
python scripts/init_runtime_workspace.py --workspace /path/to/workspace
```

### Pending Session 不执行

检查：

1. Target 和 Skill ID 是否存在且相互支持。
2. Target 是否 enabled。`depends_on` 在 v0.1.6 仅有 Schema 字段，调度器尚未据此阻塞执行。
3. Remote Target 是否使用 `targetws://`；Policy 是否使用受支持 Scheme。
4. `runtime.autostartWatchdog` 是否开启，或手动运行 Watchdog。

### Preflight rejected

查看 `result.metadata.preflight.missing_items`。修正注册、Endpoint、Contract、Adapter、Sensor 或 Action Shape；不要通过忽略字段或降级策略绕过。

### Remote Target 连接失败

确认服务先于 Watchdog 启动、Host/Port 可达，并且 `TARGETS.md` 与 Session routing 没有互相覆盖成错误地址。

### Session 执行成功但未终态

如果启用了 `agents.verification.enabled`，这是预期的 `awaiting_verification`。保持 Agent/Verifier 运行，或由 Agent 调用 `verify_session`。

## 后续阅读

- [框架介绍](/architecture/)
- [开发者指南](/developer-guide/)
- [文档首页](/)
## 2. 初始化与最小配置

```bash
paos onboard
```

该命令创建或刷新 `~/.PhyAgentOS/config.json`，并同步 Agent 工作区模板。默认 Agent 工作区为 `~/.PhyAgentOS/workspace`。当 `paos agent` 或 `paos gateway` 启动且 `runtime.enabled=true` 时，RuntimeWorkspaceManager 再创建 Runtime 协议文件并按配置启动 Watchdog。

最小 API Provider 配置示例：

```json
{
  "agents": {
    "defaults": {
      "model": "openrouter/openai/gpt-4o-mini",
      "workspace": "~/.PhyAgentOS/workspace"
    }
  },
  "providers": {
    "openrouter": {
      "apiKey": "YOUR_API_KEY"
    }
  },
  "runtime": {
    "enabled": true,
    "autostartWatchdog": true
  }
}
```

配置文件使用 camelCase；加载器同时接受 snake_case。`runtime.workspace` 未设置时，Runtime 与 Agent 使用同一工作区。

## 3. 启动 Agent

交互模式：

```bash
paos agent
```

单轮模式：

```bash
paos agent -m "检查已启用的 runtime target"
```

指定配置或工作区：

```bash
paos agent --config /path/to/config.json --workspace /path/to/workspace
```

长期在线并启用 Channel、Cron 和 Heartbeat：

```bash
paos gateway --port 18790
```

`--workspace` 在 single 模式覆盖 Agent 工作区；fleet 模式下覆盖 shared workspace。运行日志默认隐藏，可用 `paos agent --logs` 查看。

## 4. 无硬件 Runtime 冒烟测试

以下流程直接使用仓库内置 Dummy Target 和 Dummy Policy，不需要 LLM、仿真器或机器人：

```bash
python scripts/init_runtime_workspace.py --workspace /tmp/paos-runtime
python scripts/run_runtime_watchdog.py \
  --workspace /tmp/paos-runtime \
  --once \
  --session-id sess_dummy_smoke
```

验证 `/tmp/paos-runtime/SESSIONS.md` 中 `sess_dummy_smoke.status` 为 `succeeded`，并检查：

```text
/tmp/paos-runtime/artifacts/runtime/sess_dummy_smoke/episode.json
```

`--session-id` 会把指定 Session 重置为 pending 后执行，适合重复冒烟测试；正常后台 Watchdog 不会自动重跑终态 Session。

## 5. Runtime 工作区

| 文件/目录 | 所有权 | 用途 |
|---|---|---|
| `RUNTIME.md` | Runtime 自动生成 | 告诉 Agent 如何创建 Session |
| `TARGETS.md` | 用户维护 | Target、Endpoint、Adapter、Contract 引用 |
| `SKILLRUNTIME.md` | 用户维护 | Skill Runtime 与 Policy/IO Contract |
| `SESSIONS.md` | Agent + Runtime | 队列、状态和结果 |
| `ENVIRONMENT.md` | Runtime/Perception | Target 与场景状态 |
| `LESSONS.md` | Runtime/Verifier | 失败和验收经验 |
| `configs/runtime/` | 用户维护 | Sensor、Perception、Runtime Contract |
| `artifacts/runtime/` | Runtime | Episode 和语义验收证据 |

不要手工修改正在运行的 Session 状态，也不要把 `RUNTIME.md` 当作状态文件。新增 Session 时必须保留原有 Session 和 Result。

## 6. Session 状态

未开启 Agent 语义验收：

```text
pending → claimed → preflight_checking → running → finalizing
        → succeeded | failed | timed_out | cancelled
preflight_checking → rejected
```

开启语义验收且 Runtime 执行成功：

```text
finalizing → awaiting_verification → verifying
           → succeeded | failed | replanned
```

`replanned` 会保留原 Session，并追加一个新的 pending 子 Session。

## 7. 当前场景

### 7.1 LIBERO + OpenPI

在 LIBERO 环境所在机器启动 TargetWS：

```bash
MUJOCO_GL=egl PYTHONWARNINGS=ignore \
conda run -n liberopi python PhyAgentOS/runtime/targets/remote/libero/server.py \
  --host 0.0.0.0 --port 9002
```

在策略机器启动 pi0-family server：

```bash
conda run -n lerobot-pi python -m PhyAgentOS.runtime.policy.openpi.lerobot_pi0_server \
  --model-dir /path/to/checkpoint --host 0.0.0.0 --port 8000
```

在 Runtime 工作区中把：

- Target Endpoint 设为 `targetws://<libero-host>:9002`
- Session Policy Endpoint 设为 `openpi://<policy-host>:8000`
- `target_ref`/`skillruntime_ref` 对应 `libero_real_remote`/`pi05_libero_remote`

然后由 Agent 追加 Session，或执行已存在的 Session：

```bash
python scripts/run_runtime_watchdog.py \
  --workspace /path/to/runtime-workspace \
  --once \
  --session-id <session_id>
```

### 7.2 Isaac Sim TargetWS

```bash
python PhyAgentOS/runtime/targets/remote/isaacsim/server.py \
  --config rollout/configs/pipergo2_manipulation.json \
  --gui --port 9003
```

Merom 多机器人场景使用：

```bash
python PhyAgentOS/runtime/targets/remote/isaacsim/server.py \
  --config rollout/configs/merom_multi_robot.json \
  --gui --port 9003
```

Runtime Endpoint 为 `targetws://127.0.0.1:9003`。命令型 Session 由 `CommandSimSkillRuntime` 调用 Target 的 `execute_step`，VLA Session 则通过 OpenPI Policy 闭环。

### 7.3 BEHAVIOR-1K

```bash
# Terminal A: TargetWS
bash b1k_integration/scripts/start_behavior1k_server.sh --gui --port 9004

# Terminal B: Policy server
export CHECKPOINT_DIR=/path/to/pi0_b1k/checkpoint
bash b1k_integration/scripts/start_b1k_openpi_policy_server.sh

# Terminal C: E2E
python b1k_integration/scripts/run_b1k_openpi_real_e2e.py \
  --workspace b1k_integration/workspaces/behavior1k_eval
```

详细依赖和任务配置见 `b1k_integration/README.md` 与其 workspace 文档。

### 7.4 当前不支持的旧启动方式

不要使用以下历史命令：

```text
python hal/hal_watchdog.py ...
--driver franka_multi
--driver go2_edu
--driver xlerobot_2wheels_remote
```

v0.1.6 当前源码没有可安装的 `hal` Driver Runtime。对应 JSON 示例不代表后端仍可运行。真实机器人应在完成 `BaseRolloutTarget`、Contract、Adapter 和安全门禁后通过 Session Runtime 接入。

## 8. Agent 语义验收

```json
{
  "agents": {
    "verification": {
      "enabled": true,
      "model": null,
      "maxReplans": 1,
      "rgbRetention": "failed"
    }
  }
}
```

- `all`：所有终态保留 RGB。
- `failed`：成功后删除 RGB，失败/replan 保留；这是默认值。
- `none`：有效 verdict 后删除 RGB。

证据位于 `artifacts/runtime/<session_id>/`。验收失败不会把 Runtime 执行事实改写为另一次执行；它通过 Session 终态、Verification Attempt 和 LESSONS 记录语义结论。

## 9. Fleet 配置边界

```json
{
  "embodiments": {
    "mode": "fleet",
    "sharedWorkspace": "~/.workspaces/shared",
    "instances": [
      {
        "robotId": "robot_001",
        "driver": "logical_identifier",
        "workspace": "~/.workspaces/robot_001",
        "enabled": true
      }
    ]
  }
}
```

当前实现会创建 shared/instance 工作区并解析共享 Environment/LESSONS；`driver` 目前是拓扑元数据，不会自动构造旧 HAL Driver。多 Target 的实际执行能力仍由 `TARGETS.md` 和已注册 Target Runtime 决定。

## 10. 排障

### Runtime 文件未创建

确认 `runtime.enabled=true`，并启动 `paos agent`/`paos gateway`；也可显式运行：

```bash
python scripts/init_runtime_workspace.py --workspace /path/to/workspace
```

### Pending Session 不执行

检查：

1. Target 和 Skill ID 是否存在且相互支持。
2. Target 是否 enabled。`depends_on` 在 v0.1.6 仅有 Schema 字段，调度器尚未据此阻塞执行。
3. Remote Target 是否使用 `targetws://`；Policy 是否使用受支持 Scheme。
4. `runtime.autostartWatchdog` 是否开启，或手动运行 Watchdog。

### Preflight rejected

查看 `result.metadata.preflight.missing_items`。修正注册、Endpoint、Contract、Adapter、Sensor 或 Action Shape；不要通过忽略字段或降级策略绕过。

### Remote Target 连接失败

确认服务先于 Watchdog 启动、Host/Port 可达，并且 `TARGETS.md` 与 Session routing 没有互相覆盖成错误地址。

### Session 执行成功但未终态

如果启用了 `agents.verification.enabled`，这是预期的 `awaiting_verification`。保持 Agent/Verifier 运行，或由 Agent 调用 `verify_session`。

## 后续阅读

- [框架介绍](/architecture/)
- [开发者指南](/developer-guide/)
- [文档首页](/)
## 3. 启动 Agent

交互模式：

```bash
paos agent
```

单轮模式：

```bash
paos agent -m "检查已启用的 runtime target"
```

指定配置或工作区：

```bash
paos agent --config /path/to/config.json --workspace /path/to/workspace
```

长期在线并启用 Channel、Cron 和 Heartbeat：

```bash
paos gateway --port 18790
```

`--workspace` 在 single 模式覆盖 Agent 工作区；fleet 模式下覆盖 shared workspace。运行日志默认隐藏，可用 `paos agent --logs` 查看。

## 4. 无硬件 Runtime 冒烟测试

以下流程直接使用仓库内置 Dummy Target 和 Dummy Policy，不需要 LLM、仿真器或机器人：

```bash
python scripts/init_runtime_workspace.py --workspace /tmp/paos-runtime
python scripts/run_runtime_watchdog.py \
  --workspace /tmp/paos-runtime \
  --once \
  --session-id sess_dummy_smoke
```

验证 `/tmp/paos-runtime/SESSIONS.md` 中 `sess_dummy_smoke.status` 为 `succeeded`，并检查：

```text
/tmp/paos-runtime/artifacts/runtime/sess_dummy_smoke/episode.json
```

`--session-id` 会把指定 Session 重置为 pending 后执行，适合重复冒烟测试；正常后台 Watchdog 不会自动重跑终态 Session。

## 5. Runtime 工作区

| 文件/目录 | 所有权 | 用途 |
|---|---|---|
| `RUNTIME.md` | Runtime 自动生成 | 告诉 Agent 如何创建 Session |
| `TARGETS.md` | 用户维护 | Target、Endpoint、Adapter、Contract 引用 |
| `SKILLRUNTIME.md` | 用户维护 | Skill Runtime 与 Policy/IO Contract |
| `SESSIONS.md` | Agent + Runtime | 队列、状态和结果 |
| `ENVIRONMENT.md` | Runtime/Perception | Target 与场景状态 |
| `LESSONS.md` | Runtime/Verifier | 失败和验收经验 |
| `configs/runtime/` | 用户维护 | Sensor、Perception、Runtime Contract |
| `artifacts/runtime/` | Runtime | Episode 和语义验收证据 |

不要手工修改正在运行的 Session 状态，也不要把 `RUNTIME.md` 当作状态文件。新增 Session 时必须保留原有 Session 和 Result。

## 6. Session 状态

未开启 Agent 语义验收：

```text
pending → claimed → preflight_checking → running → finalizing
        → succeeded | failed | timed_out | cancelled
preflight_checking → rejected
```

开启语义验收且 Runtime 执行成功：

```text
finalizing → awaiting_verification → verifying
           → succeeded | failed | replanned
```

`replanned` 会保留原 Session，并追加一个新的 pending 子 Session。

## 7. 当前场景

### 7.1 LIBERO + OpenPI

在 LIBERO 环境所在机器启动 TargetWS：

```bash
MUJOCO_GL=egl PYTHONWARNINGS=ignore \
conda run -n liberopi python PhyAgentOS/runtime/targets/remote/libero/server.py \
  --host 0.0.0.0 --port 9002
```

在策略机器启动 pi0-family server：

```bash
conda run -n lerobot-pi python -m PhyAgentOS.runtime.policy.openpi.lerobot_pi0_server \
  --model-dir /path/to/checkpoint --host 0.0.0.0 --port 8000
```

在 Runtime 工作区中把：

- Target Endpoint 设为 `targetws://<libero-host>:9002`
- Session Policy Endpoint 设为 `openpi://<policy-host>:8000`
- `target_ref`/`skillruntime_ref` 对应 `libero_real_remote`/`pi05_libero_remote`

然后由 Agent 追加 Session，或执行已存在的 Session：

```bash
python scripts/run_runtime_watchdog.py \
  --workspace /path/to/runtime-workspace \
  --once \
  --session-id <session_id>
```

### 7.2 Isaac Sim TargetWS

```bash
python PhyAgentOS/runtime/targets/remote/isaacsim/server.py \
  --config rollout/configs/pipergo2_manipulation.json \
  --gui --port 9003
```

Merom 多机器人场景使用：

```bash
python PhyAgentOS/runtime/targets/remote/isaacsim/server.py \
  --config rollout/configs/merom_multi_robot.json \
  --gui --port 9003
```

Runtime Endpoint 为 `targetws://127.0.0.1:9003`。命令型 Session 由 `CommandSimSkillRuntime` 调用 Target 的 `execute_step`，VLA Session 则通过 OpenPI Policy 闭环。

### 7.3 BEHAVIOR-1K

```bash
# Terminal A: TargetWS
bash b1k_integration/scripts/start_behavior1k_server.sh --gui --port 9004

# Terminal B: Policy server
export CHECKPOINT_DIR=/path/to/pi0_b1k/checkpoint
bash b1k_integration/scripts/start_b1k_openpi_policy_server.sh

# Terminal C: E2E
python b1k_integration/scripts/run_b1k_openpi_real_e2e.py \
  --workspace b1k_integration/workspaces/behavior1k_eval
```

详细依赖和任务配置见 `b1k_integration/README.md` 与其 workspace 文档。

### 7.4 当前不支持的旧启动方式

不要使用以下历史命令：

```text
python hal/hal_watchdog.py ...
--driver franka_multi
--driver go2_edu
--driver xlerobot_2wheels_remote
```

v0.1.6 当前源码没有可安装的 `hal` Driver Runtime。对应 JSON 示例不代表后端仍可运行。真实机器人应在完成 `BaseRolloutTarget`、Contract、Adapter 和安全门禁后通过 Session Runtime 接入。

## 8. Agent 语义验收

```json
{
  "agents": {
    "verification": {
      "enabled": true,
      "model": null,
      "maxReplans": 1,
      "rgbRetention": "failed"
    }
  }
}
```

- `all`：所有终态保留 RGB。
- `failed`：成功后删除 RGB，失败/replan 保留；这是默认值。
- `none`：有效 verdict 后删除 RGB。

证据位于 `artifacts/runtime/<session_id>/`。验收失败不会把 Runtime 执行事实改写为另一次执行；它通过 Session 终态、Verification Attempt 和 LESSONS 记录语义结论。

## 9. Fleet 配置边界

```json
{
  "embodiments": {
    "mode": "fleet",
    "sharedWorkspace": "~/.workspaces/shared",
    "instances": [
      {
        "robotId": "robot_001",
        "driver": "logical_identifier",
        "workspace": "~/.workspaces/robot_001",
        "enabled": true
      }
    ]
  }
}
```

当前实现会创建 shared/instance 工作区并解析共享 Environment/LESSONS；`driver` 目前是拓扑元数据，不会自动构造旧 HAL Driver。多 Target 的实际执行能力仍由 `TARGETS.md` 和已注册 Target Runtime 决定。

## 10. 排障

### Runtime 文件未创建

确认 `runtime.enabled=true`，并启动 `paos agent`/`paos gateway`；也可显式运行：

```bash
python scripts/init_runtime_workspace.py --workspace /path/to/workspace
```

### Pending Session 不执行

检查：

1. Target 和 Skill ID 是否存在且相互支持。
2. Target 是否 enabled。`depends_on` 在 v0.1.6 仅有 Schema 字段，调度器尚未据此阻塞执行。
3. Remote Target 是否使用 `targetws://`；Policy 是否使用受支持 Scheme。
4. `runtime.autostartWatchdog` 是否开启，或手动运行 Watchdog。

### Preflight rejected

查看 `result.metadata.preflight.missing_items`。修正注册、Endpoint、Contract、Adapter、Sensor 或 Action Shape；不要通过忽略字段或降级策略绕过。

### Remote Target 连接失败

确认服务先于 Watchdog 启动、Host/Port 可达，并且 `TARGETS.md` 与 Session routing 没有互相覆盖成错误地址。

### Session 执行成功但未终态

如果启用了 `agents.verification.enabled`，这是预期的 `awaiting_verification`。保持 Agent/Verifier 运行，或由 Agent 调用 `verify_session`。

## 后续阅读

- [框架介绍](/architecture/)
- [开发者指南](/developer-guide/)
- [文档首页](/)
## 4. 无硬件 Runtime 冒烟测试

以下流程直接使用仓库内置 Dummy Target 和 Dummy Policy，不需要 LLM、仿真器或机器人：

```bash
python scripts/init_runtime_workspace.py --workspace /tmp/paos-runtime
python scripts/run_runtime_watchdog.py \
  --workspace /tmp/paos-runtime \
  --once \
  --session-id sess_dummy_smoke
```

验证 `/tmp/paos-runtime/SESSIONS.md` 中 `sess_dummy_smoke.status` 为 `succeeded`，并检查：

```text
/tmp/paos-runtime/artifacts/runtime/sess_dummy_smoke/episode.json
```

`--session-id` 会把指定 Session 重置为 pending 后执行，适合重复冒烟测试；正常后台 Watchdog 不会自动重跑终态 Session。

## 5. Runtime 工作区

| 文件/目录 | 所有权 | 用途 |
|---|---|---|
| `RUNTIME.md` | Runtime 自动生成 | 告诉 Agent 如何创建 Session |
| `TARGETS.md` | 用户维护 | Target、Endpoint、Adapter、Contract 引用 |
| `SKILLRUNTIME.md` | 用户维护 | Skill Runtime 与 Policy/IO Contract |
| `SESSIONS.md` | Agent + Runtime | 队列、状态和结果 |
| `ENVIRONMENT.md` | Runtime/Perception | Target 与场景状态 |
| `LESSONS.md` | Runtime/Verifier | 失败和验收经验 |
| `configs/runtime/` | 用户维护 | Sensor、Perception、Runtime Contract |
| `artifacts/runtime/` | Runtime | Episode 和语义验收证据 |

不要手工修改正在运行的 Session 状态，也不要把 `RUNTIME.md` 当作状态文件。新增 Session 时必须保留原有 Session 和 Result。

## 6. Session 状态

未开启 Agent 语义验收：

```text
pending → claimed → preflight_checking → running → finalizing
        → succeeded | failed | timed_out | cancelled
preflight_checking → rejected
```

开启语义验收且 Runtime 执行成功：

```text
finalizing → awaiting_verification → verifying
           → succeeded | failed | replanned
```

`replanned` 会保留原 Session，并追加一个新的 pending 子 Session。

## 7. 当前场景

### 7.1 LIBERO + OpenPI

在 LIBERO 环境所在机器启动 TargetWS：

```bash
MUJOCO_GL=egl PYTHONWARNINGS=ignore \
conda run -n liberopi python PhyAgentOS/runtime/targets/remote/libero/server.py \
  --host 0.0.0.0 --port 9002
```

在策略机器启动 pi0-family server：

```bash
conda run -n lerobot-pi python -m PhyAgentOS.runtime.policy.openpi.lerobot_pi0_server \
  --model-dir /path/to/checkpoint --host 0.0.0.0 --port 8000
```

在 Runtime 工作区中把：

- Target Endpoint 设为 `targetws://<libero-host>:9002`
- Session Policy Endpoint 设为 `openpi://<policy-host>:8000`
- `target_ref`/`skillruntime_ref` 对应 `libero_real_remote`/`pi05_libero_remote`

然后由 Agent 追加 Session，或执行已存在的 Session：

```bash
python scripts/run_runtime_watchdog.py \
  --workspace /path/to/runtime-workspace \
  --once \
  --session-id <session_id>
```

### 7.2 Isaac Sim TargetWS

```bash
python PhyAgentOS/runtime/targets/remote/isaacsim/server.py \
  --config rollout/configs/pipergo2_manipulation.json \
  --gui --port 9003
```

Merom 多机器人场景使用：

```bash
python PhyAgentOS/runtime/targets/remote/isaacsim/server.py \
  --config rollout/configs/merom_multi_robot.json \
  --gui --port 9003
```

Runtime Endpoint 为 `targetws://127.0.0.1:9003`。命令型 Session 由 `CommandSimSkillRuntime` 调用 Target 的 `execute_step`，VLA Session 则通过 OpenPI Policy 闭环。

### 7.3 BEHAVIOR-1K

```bash
# Terminal A: TargetWS
bash b1k_integration/scripts/start_behavior1k_server.sh --gui --port 9004

# Terminal B: Policy server
export CHECKPOINT_DIR=/path/to/pi0_b1k/checkpoint
bash b1k_integration/scripts/start_b1k_openpi_policy_server.sh

# Terminal C: E2E
python b1k_integration/scripts/run_b1k_openpi_real_e2e.py \
  --workspace b1k_integration/workspaces/behavior1k_eval
```

详细依赖和任务配置见 `b1k_integration/README.md` 与其 workspace 文档。

### 7.4 当前不支持的旧启动方式

不要使用以下历史命令：

```text
python hal/hal_watchdog.py ...
--driver franka_multi
--driver go2_edu
--driver xlerobot_2wheels_remote
```

v0.1.6 当前源码没有可安装的 `hal` Driver Runtime。对应 JSON 示例不代表后端仍可运行。真实机器人应在完成 `BaseRolloutTarget`、Contract、Adapter 和安全门禁后通过 Session Runtime 接入。

## 8. Agent 语义验收

```json
{
  "agents": {
    "verification": {
      "enabled": true,
      "model": null,
      "maxReplans": 1,
      "rgbRetention": "failed"
    }
  }
}
```

- `all`：所有终态保留 RGB。
- `failed`：成功后删除 RGB，失败/replan 保留；这是默认值。
- `none`：有效 verdict 后删除 RGB。

证据位于 `artifacts/runtime/<session_id>/`。验收失败不会把 Runtime 执行事实改写为另一次执行；它通过 Session 终态、Verification Attempt 和 LESSONS 记录语义结论。

## 9. Fleet 配置边界

```json
{
  "embodiments": {
    "mode": "fleet",
    "sharedWorkspace": "~/.workspaces/shared",
    "instances": [
      {
        "robotId": "robot_001",
        "driver": "logical_identifier",
        "workspace": "~/.workspaces/robot_001",
        "enabled": true
      }
    ]
  }
}
```

当前实现会创建 shared/instance 工作区并解析共享 Environment/LESSONS；`driver` 目前是拓扑元数据，不会自动构造旧 HAL Driver。多 Target 的实际执行能力仍由 `TARGETS.md` 和已注册 Target Runtime 决定。

## 10. 排障

### Runtime 文件未创建

确认 `runtime.enabled=true`，并启动 `paos agent`/`paos gateway`；也可显式运行：

```bash
python scripts/init_runtime_workspace.py --workspace /path/to/workspace
```

### Pending Session 不执行

检查：

1. Target 和 Skill ID 是否存在且相互支持。
2. Target 是否 enabled。`depends_on` 在 v0.1.6 仅有 Schema 字段，调度器尚未据此阻塞执行。
3. Remote Target 是否使用 `targetws://`；Policy 是否使用受支持 Scheme。
4. `runtime.autostartWatchdog` 是否开启，或手动运行 Watchdog。

### Preflight rejected

查看 `result.metadata.preflight.missing_items`。修正注册、Endpoint、Contract、Adapter、Sensor 或 Action Shape；不要通过忽略字段或降级策略绕过。

### Remote Target 连接失败

确认服务先于 Watchdog 启动、Host/Port 可达，并且 `TARGETS.md` 与 Session routing 没有互相覆盖成错误地址。

### Session 执行成功但未终态

如果启用了 `agents.verification.enabled`，这是预期的 `awaiting_verification`。保持 Agent/Verifier 运行，或由 Agent 调用 `verify_session`。

## 后续阅读

- [框架介绍](/architecture/)
- [开发者指南](/developer-guide/)
- [文档首页](/)
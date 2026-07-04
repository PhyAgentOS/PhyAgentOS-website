---
title: 扩展流程
description: 文档 Schema、生命周期、Preflight、添加 Target 与 Skill Runtime
---

# 扩展流程

## 3. Runtime 文档 Schema

### 3.1 TARGETS.md

每个 Target 必须声明：

- 唯一 `id`、`target_class=local|remote`、`target_kind`
- `workspace` 与 `supported_skillruntimes`
- `target_runtime`、`target_adapter`、`runtime_contract_ref`
- Remote Target 的 `targetws://` Endpoint
- Observation 与可选 Perception 引用

Schema 支持 `game | debug | simulation | real_robot`。只有在 Factory 中注册的 `target_runtime` 才能被构造。

### 3.2 SKILLRUNTIME.md

`runtime_kind` 只能是 `policy` 或 `builtin`：

- Policy Runtime 必须声明 Policy Client 与 Policy Adapter。
- 暴露 Target Tool 的 Builtin Runtime 必须声明 `target_tool_policy`。
- `supported_target_kinds` 必须包含目标类型。
- `requires.sensors` 非空时必须有可解析的 Sensor Config。
- `environment_outputs` 非空时会触发 Perception Plan 与严格输出检查。

### 3.3 SESSIONS.md

最小开发示例：

```yaml
version: runtime_sessions_v1
sessions:
  - session_id: sess_example
    target_ref: target://dummy_sim
    skillruntime_ref: skillruntime://openpi_sim_vla
    task_description: runtime smoke test
    status: pending
    priority: normal
    routing:
      target_endpoint: null
      policy_endpoint: dummy://local
      adapter_resolution: strict_auto
      adapter_overrides: null
    execution:
      max_steps: 10
      replan_every_steps: 5
      action_chunk_mode: chunk_buffer
      chunk_switch_mode: hard_switch
    result: {}
```

完整字段定义以 `SessionSpec` 为准。不要在 Session 中内联 Sensor、Perception Model 或 Target/Policy pair Adapter。

## 4. 生命周期与并发

Watchdog 是串行 Worker；调度顺序为 priority 后按文档顺序。`depends_on` 已进入 Schema，但 v0.1.6 调度器尚未执行依赖判定，编排方当前不能依赖该字段保证顺序。

```text
pending
  → claimed
  → preflight_checking
  → running
  → finalizing
  → succeeded | failed | timed_out | cancelled

preflight_checking → rejected
finalizing → awaiting_verification → verifying
verifying → succeeded | failed | replanned | awaiting_verification
```

`SessionRegistry` 使用 `SESSIONS.md.lock` 和 claim token 保护状态更新。开发者不应绕过 Registry 直接推进状态。

## 5. Preflight 当前检查

v0.1.6 Preflight 覆盖：

- Target enable、class/kind、Endpoint 与 supported Skill
- Runtime Contract 可读性、Target ID 与 Adapter 一致性
- Skill Runtime 注册、Target kind 与 Policy Endpoint
- Empty Observation 双方显式允许
- Target/Policy Adapter 和 Bridge 注册
- Adapter Observation/Action Shape、dtype 与 layout
- Required Sensor 与 Observation Schema
- Policy Output 与 Target Action Contract 的表示、Shape 和归一化 Bridge
- Builtin Target Tool Manifest 的禁止项

当前边界：real-robot Operator Override、完整 SafetyGuard 参数和远端 describe/health 契约还未全部成为强制检查；集成方不能把通过现有 Preflight 等同于真机安全认证。

## 6. 添加 Local Target

最短实现路径：

1. 实现 `BaseRolloutTarget`。
2. 编写 TargetAdapter 和 Runtime Contract YAML。
3. 用 `register_local_target_runtime(runtime_name, factory)` 注册。
4. 在 `TARGETS.md` 增加 Target，并只列出已验证的 Skill Runtime。
5. 增加 lifecycle、Adapter Contract、Preflight 和端到端 Session 测试。

```python
from PhyAgentOS.runtime.targets.factory import register_local_target_runtime

register_local_target_runtime("MyTargetRuntime", build_my_target)
```

当前注册表通过模块导入完成，不提供旧 `PhyAgentOS_plugin.toml` Driver 自动发现机制。

## 7. 添加 Remote Target

Remote Target 推荐复用：

- `TargetWSClient`：将 `targetws://` 转为 WebSocket，使用 Runtime Envelope + msgpack。
- `RemoteTargetProxy`：映射 `target.*` 与 `agent_tool.*` RPC。
- `register_remote_target_runtime(runtime_name, factory)`：注册构造器。

服务端至少应实现生命周期消息：`target.describe`、`target.configure_session`、`target.start_session`、`target.reset`、`target.observe`、`target.action_chunk`、`target.execution_status`、`target.cancel` 和 `target.close`。Response 必须回显匹配的 seq、session、target 和 skillruntime 标识。

## 8. 添加 Skill Runtime

1. 继承 `PolicySkillRuntime` 或 `BuiltinSkillRuntime`。
2. 只使用 `TargetSessionHandle`。
3. 用 `register_skill_runtime(name, factory)` 注册。
4. 在 `SKILLRUNTIME.md` 声明 Loop、Target kind、Policy、IO Contract 和 Requirements。
5. 针对取消、超时、终态和不兼容 Contract 编写测试。

Builtin Runtime 暴露 Tool 时，Target 必须在 `describe_target_tools` 中提供 Schema，Skill 必须在 `target_tool_policy.expose` 中显式允许。

## 9. Policy 与通信

| Scheme | Client |
|---|---|
| `dummy://local` | `DummyPolicyClient` |
| `openpi://host:port` | OpenPI client |
| `policyws://host:port` | OpenPI-compatible client |
| `b1k-ws://host:port` | BEHAVIOR-1K client |

Remote Target 使用 `phyagentos.runtime_rpc.v2` Envelope 和 msgpack。大型数组可内联编码；Artifact 与环境状态应通过文件路径/URI 落盘，避免把大对象写入 Markdown。

## 10. Perception 开发

Perception 配置由三层组成：

1. Sensor Config：传感器、Observation Key、Shape、dtype 与标定引用。
2. Perception Config：Model、Plugin Candidate、Pipeline 和输出。
3. Skill Requirements：本次 Session 需要的 Sensor 与 Environment Output。

`PerceptionRuntime.resolve_and_check` 生成 Plan；`EnvironmentWriter` reconcile/merge `PhyAgentOS.environment.v2`。2D-only 结果不能生成虚假的米制 3D Pose，原始图像、Mask、Depth、Point Cloud 和 logits 应写 Artifact。

## 11. SessionVerifier 扩展边界

Runtime 成功后，`ResultWriter` 生成 Episode 与 Verification Bundle；Agent 侧 `SessionVerifier` 负责多模态语义 verdict。Review 模式只追加 Attempt 和 Lesson，不修改既有终态或创建 Replan。

新增证据类型时必须同时更新：Bundle Schema/Writer、Verifier Prompt、Retention 行为和测试，确保状态与 Artifact 生命周期一致。

## 12. 测试与质量门禁

```bash
pytest
pytest tests/runtime
pytest tests/runtime/test_runtime_protocol_alignment.py \
       tests/runtime/test_runtime_templates.py \
       tests/runtime/test_supervisor_single_session.py
ruff check PhyAgentOS tests
```

外部 Simulator/Policy/Robot 集成至少按以下顺序验证：Schema → Factory → Preflight rejection/acceptance → 单 Session → Timeout/Cancel → Artifact → 多次运行资源释放。真机测试还必须在 Target 侧独立验证安全停止。

## 13. 后续设计方向

HAL v3 的下一阶段包括：统一 `strict_environment_contract=true`、完整 real-robot SafetyGuard/Operator Override、Session 依赖调度、Agent-interactive Builtin Runtime、Goal Graph/Session Compiler、确定性多 Bridge 解析和长期 Fleet 编排。这些能力进入公共文档前，需要先完成 Schema、实现与端到端测试闭环。

## 后续阅读

- [框架介绍](/architecture/)
- [用户手册](/api-reference/)
- [文档首页](/)
## 4. 生命周期与并发

Watchdog 是串行 Worker；调度顺序为 priority 后按文档顺序。`depends_on` 已进入 Schema，但 v0.1.6 调度器尚未执行依赖判定，编排方当前不能依赖该字段保证顺序。

```text
pending
  → claimed
  → preflight_checking
  → running
  → finalizing
  → succeeded | failed | timed_out | cancelled

preflight_checking → rejected
finalizing → awaiting_verification → verifying
verifying → succeeded | failed | replanned | awaiting_verification
```

`SessionRegistry` 使用 `SESSIONS.md.lock` 和 claim token 保护状态更新。开发者不应绕过 Registry 直接推进状态。

## 5. Preflight 当前检查

v0.1.6 Preflight 覆盖：

- Target enable、class/kind、Endpoint 与 supported Skill
- Runtime Contract 可读性、Target ID 与 Adapter 一致性
- Skill Runtime 注册、Target kind 与 Policy Endpoint
- Empty Observation 双方显式允许
- Target/Policy Adapter 和 Bridge 注册
- Adapter Observation/Action Shape、dtype 与 layout
- Required Sensor 与 Observation Schema
- Policy Output 与 Target Action Contract 的表示、Shape 和归一化 Bridge
- Builtin Target Tool Manifest 的禁止项

当前边界：real-robot Operator Override、完整 SafetyGuard 参数和远端 describe/health 契约还未全部成为强制检查；集成方不能把通过现有 Preflight 等同于真机安全认证。

## 6. 添加 Local Target

最短实现路径：

1. 实现 `BaseRolloutTarget`。
2. 编写 TargetAdapter 和 Runtime Contract YAML。
3. 用 `register_local_target_runtime(runtime_name, factory)` 注册。
4. 在 `TARGETS.md` 增加 Target，并只列出已验证的 Skill Runtime。
5. 增加 lifecycle、Adapter Contract、Preflight 和端到端 Session 测试。

```python
from PhyAgentOS.runtime.targets.factory import register_local_target_runtime

register_local_target_runtime("MyTargetRuntime", build_my_target)
```

当前注册表通过模块导入完成，不提供旧 `PhyAgentOS_plugin.toml` Driver 自动发现机制。

## 7. 添加 Remote Target

Remote Target 推荐复用：

- `TargetWSClient`：将 `targetws://` 转为 WebSocket，使用 Runtime Envelope + msgpack。
- `RemoteTargetProxy`：映射 `target.*` 与 `agent_tool.*` RPC。
- `register_remote_target_runtime(runtime_name, factory)`：注册构造器。

服务端至少应实现生命周期消息：`target.describe`、`target.configure_session`、`target.start_session`、`target.reset`、`target.observe`、`target.action_chunk`、`target.execution_status`、`target.cancel` 和 `target.close`。Response 必须回显匹配的 seq、session、target 和 skillruntime 标识。

## 8. 添加 Skill Runtime

1. 继承 `PolicySkillRuntime` 或 `BuiltinSkillRuntime`。
2. 只使用 `TargetSessionHandle`。
3. 用 `register_skill_runtime(name, factory)` 注册。
4. 在 `SKILLRUNTIME.md` 声明 Loop、Target kind、Policy、IO Contract 和 Requirements。
5. 针对取消、超时、终态和不兼容 Contract 编写测试。

Builtin Runtime 暴露 Tool 时，Target 必须在 `describe_target_tools` 中提供 Schema，Skill 必须在 `target_tool_policy.expose` 中显式允许。

## 9. Policy 与通信

| Scheme | Client |
|---|---|
| `dummy://local` | `DummyPolicyClient` |
| `openpi://host:port` | OpenPI client |
| `policyws://host:port` | OpenPI-compatible client |
| `b1k-ws://host:port` | BEHAVIOR-1K client |

Remote Target 使用 `phyagentos.runtime_rpc.v2` Envelope 和 msgpack。大型数组可内联编码；Artifact 与环境状态应通过文件路径/URI 落盘，避免把大对象写入 Markdown。

## 10. Perception 开发

Perception 配置由三层组成：

1. Sensor Config：传感器、Observation Key、Shape、dtype 与标定引用。
2. Perception Config：Model、Plugin Candidate、Pipeline 和输出。
3. Skill Requirements：本次 Session 需要的 Sensor 与 Environment Output。

`PerceptionRuntime.resolve_and_check` 生成 Plan；`EnvironmentWriter` reconcile/merge `PhyAgentOS.environment.v2`。2D-only 结果不能生成虚假的米制 3D Pose，原始图像、Mask、Depth、Point Cloud 和 logits 应写 Artifact。

## 11. SessionVerifier 扩展边界

Runtime 成功后，`ResultWriter` 生成 Episode 与 Verification Bundle；Agent 侧 `SessionVerifier` 负责多模态语义 verdict。Review 模式只追加 Attempt 和 Lesson，不修改既有终态或创建 Replan。

新增证据类型时必须同时更新：Bundle Schema/Writer、Verifier Prompt、Retention 行为和测试，确保状态与 Artifact 生命周期一致。

## 12. 测试与质量门禁

```bash
pytest
pytest tests/runtime
pytest tests/runtime/test_runtime_protocol_alignment.py \
       tests/runtime/test_runtime_templates.py \
       tests/runtime/test_supervisor_single_session.py
ruff check PhyAgentOS tests
```

外部 Simulator/Policy/Robot 集成至少按以下顺序验证：Schema → Factory → Preflight rejection/acceptance → 单 Session → Timeout/Cancel → Artifact → 多次运行资源释放。真机测试还必须在 Target 侧独立验证安全停止。

## 13. 后续设计方向

HAL v3 的下一阶段包括：统一 `strict_environment_contract=true`、完整 real-robot SafetyGuard/Operator Override、Session 依赖调度、Agent-interactive Builtin Runtime、Goal Graph/Session Compiler、确定性多 Bridge 解析和长期 Fleet 编排。这些能力进入公共文档前，需要先完成 Schema、实现与端到端测试闭环。

## 后续阅读

- [框架介绍](/architecture/)
- [用户手册](/api-reference/)
- [文档首页](/)
## 5. Preflight 当前检查

v0.1.6 Preflight 覆盖：

- Target enable、class/kind、Endpoint 与 supported Skill
- Runtime Contract 可读性、Target ID 与 Adapter 一致性
- Skill Runtime 注册、Target kind 与 Policy Endpoint
- Empty Observation 双方显式允许
- Target/Policy Adapter 和 Bridge 注册
- Adapter Observation/Action Shape、dtype 与 layout
- Required Sensor 与 Observation Schema
- Policy Output 与 Target Action Contract 的表示、Shape 和归一化 Bridge
- Builtin Target Tool Manifest 的禁止项

当前边界：real-robot Operator Override、完整 SafetyGuard 参数和远端 describe/health 契约还未全部成为强制检查；集成方不能把通过现有 Preflight 等同于真机安全认证。

## 6. 添加 Local Target

最短实现路径：

1. 实现 `BaseRolloutTarget`。
2. 编写 TargetAdapter 和 Runtime Contract YAML。
3. 用 `register_local_target_runtime(runtime_name, factory)` 注册。
4. 在 `TARGETS.md` 增加 Target，并只列出已验证的 Skill Runtime。
5. 增加 lifecycle、Adapter Contract、Preflight 和端到端 Session 测试。

```python
from PhyAgentOS.runtime.targets.factory import register_local_target_runtime

register_local_target_runtime("MyTargetRuntime", build_my_target)
```

当前注册表通过模块导入完成，不提供旧 `PhyAgentOS_plugin.toml` Driver 自动发现机制。

## 7. 添加 Remote Target

Remote Target 推荐复用：

- `TargetWSClient`：将 `targetws://` 转为 WebSocket，使用 Runtime Envelope + msgpack。
- `RemoteTargetProxy`：映射 `target.*` 与 `agent_tool.*` RPC。
- `register_remote_target_runtime(runtime_name, factory)`：注册构造器。

服务端至少应实现生命周期消息：`target.describe`、`target.configure_session`、`target.start_session`、`target.reset`、`target.observe`、`target.action_chunk`、`target.execution_status`、`target.cancel` 和 `target.close`。Response 必须回显匹配的 seq、session、target 和 skillruntime 标识。

## 8. 添加 Skill Runtime

1. 继承 `PolicySkillRuntime` 或 `BuiltinSkillRuntime`。
2. 只使用 `TargetSessionHandle`。
3. 用 `register_skill_runtime(name, factory)` 注册。
4. 在 `SKILLRUNTIME.md` 声明 Loop、Target kind、Policy、IO Contract 和 Requirements。
5. 针对取消、超时、终态和不兼容 Contract 编写测试。

Builtin Runtime 暴露 Tool 时，Target 必须在 `describe_target_tools` 中提供 Schema，Skill 必须在 `target_tool_policy.expose` 中显式允许。

## 9. Policy 与通信

| Scheme | Client |
|---|---|
| `dummy://local` | `DummyPolicyClient` |
| `openpi://host:port` | OpenPI client |
| `policyws://host:port` | OpenPI-compatible client |
| `b1k-ws://host:port` | BEHAVIOR-1K client |

Remote Target 使用 `phyagentos.runtime_rpc.v2` Envelope 和 msgpack。大型数组可内联编码；Artifact 与环境状态应通过文件路径/URI 落盘，避免把大对象写入 Markdown。

## 10. Perception 开发

Perception 配置由三层组成：

1. Sensor Config：传感器、Observation Key、Shape、dtype 与标定引用。
2. Perception Config：Model、Plugin Candidate、Pipeline 和输出。
3. Skill Requirements：本次 Session 需要的 Sensor 与 Environment Output。

`PerceptionRuntime.resolve_and_check` 生成 Plan；`EnvironmentWriter` reconcile/merge `PhyAgentOS.environment.v2`。2D-only 结果不能生成虚假的米制 3D Pose，原始图像、Mask、Depth、Point Cloud 和 logits 应写 Artifact。

## 11. SessionVerifier 扩展边界

Runtime 成功后，`ResultWriter` 生成 Episode 与 Verification Bundle；Agent 侧 `SessionVerifier` 负责多模态语义 verdict。Review 模式只追加 Attempt 和 Lesson，不修改既有终态或创建 Replan。

新增证据类型时必须同时更新：Bundle Schema/Writer、Verifier Prompt、Retention 行为和测试，确保状态与 Artifact 生命周期一致。

## 12. 测试与质量门禁

```bash
pytest
pytest tests/runtime
pytest tests/runtime/test_runtime_protocol_alignment.py \
       tests/runtime/test_runtime_templates.py \
       tests/runtime/test_supervisor_single_session.py
ruff check PhyAgentOS tests
```

外部 Simulator/Policy/Robot 集成至少按以下顺序验证：Schema → Factory → Preflight rejection/acceptance → 单 Session → Timeout/Cancel → Artifact → 多次运行资源释放。真机测试还必须在 Target 侧独立验证安全停止。

## 13. 后续设计方向

HAL v3 的下一阶段包括：统一 `strict_environment_contract=true`、完整 real-robot SafetyGuard/Operator Override、Session 依赖调度、Agent-interactive Builtin Runtime、Goal Graph/Session Compiler、确定性多 Bridge 解析和长期 Fleet 编排。这些能力进入公共文档前，需要先完成 Schema、实现与端到端测试闭环。

## 后续阅读

- [框架介绍](/architecture/)
- [用户手册](/api-reference/)
- [文档首页](/)
## 6. 添加 Local Target

最短实现路径：

1. 实现 `BaseRolloutTarget`。
2. 编写 TargetAdapter 和 Runtime Contract YAML。
3. 用 `register_local_target_runtime(runtime_name, factory)` 注册。
4. 在 `TARGETS.md` 增加 Target，并只列出已验证的 Skill Runtime。
5. 增加 lifecycle、Adapter Contract、Preflight 和端到端 Session 测试。

```python
from PhyAgentOS.runtime.targets.factory import register_local_target_runtime

register_local_target_runtime("MyTargetRuntime", build_my_target)
```

当前注册表通过模块导入完成，不提供旧 `PhyAgentOS_plugin.toml` Driver 自动发现机制。

## 7. 添加 Remote Target

Remote Target 推荐复用：

- `TargetWSClient`：将 `targetws://` 转为 WebSocket，使用 Runtime Envelope + msgpack。
- `RemoteTargetProxy`：映射 `target.*` 与 `agent_tool.*` RPC。
- `register_remote_target_runtime(runtime_name, factory)`：注册构造器。

服务端至少应实现生命周期消息：`target.describe`、`target.configure_session`、`target.start_session`、`target.reset`、`target.observe`、`target.action_chunk`、`target.execution_status`、`target.cancel` 和 `target.close`。Response 必须回显匹配的 seq、session、target 和 skillruntime 标识。

## 8. 添加 Skill Runtime

1. 继承 `PolicySkillRuntime` 或 `BuiltinSkillRuntime`。
2. 只使用 `TargetSessionHandle`。
3. 用 `register_skill_runtime(name, factory)` 注册。
4. 在 `SKILLRUNTIME.md` 声明 Loop、Target kind、Policy、IO Contract 和 Requirements。
5. 针对取消、超时、终态和不兼容 Contract 编写测试。

Builtin Runtime 暴露 Tool 时，Target 必须在 `describe_target_tools` 中提供 Schema，Skill 必须在 `target_tool_policy.expose` 中显式允许。

## 9. Policy 与通信

| Scheme | Client |
|---|---|
| `dummy://local` | `DummyPolicyClient` |
| `openpi://host:port` | OpenPI client |
| `policyws://host:port` | OpenPI-compatible client |
| `b1k-ws://host:port` | BEHAVIOR-1K client |

Remote Target 使用 `phyagentos.runtime_rpc.v2` Envelope 和 msgpack。大型数组可内联编码；Artifact 与环境状态应通过文件路径/URI 落盘，避免把大对象写入 Markdown。

## 10. Perception 开发

Perception 配置由三层组成：

1. Sensor Config：传感器、Observation Key、Shape、dtype 与标定引用。
2. Perception Config：Model、Plugin Candidate、Pipeline 和输出。
3. Skill Requirements：本次 Session 需要的 Sensor 与 Environment Output。

`PerceptionRuntime.resolve_and_check` 生成 Plan；`EnvironmentWriter` reconcile/merge `PhyAgentOS.environment.v2`。2D-only 结果不能生成虚假的米制 3D Pose，原始图像、Mask、Depth、Point Cloud 和 logits 应写 Artifact。

## 11. SessionVerifier 扩展边界

Runtime 成功后，`ResultWriter` 生成 Episode 与 Verification Bundle；Agent 侧 `SessionVerifier` 负责多模态语义 verdict。Review 模式只追加 Attempt 和 Lesson，不修改既有终态或创建 Replan。

新增证据类型时必须同时更新：Bundle Schema/Writer、Verifier Prompt、Retention 行为和测试，确保状态与 Artifact 生命周期一致。

## 12. 测试与质量门禁

```bash
pytest
pytest tests/runtime
pytest tests/runtime/test_runtime_protocol_alignment.py \
       tests/runtime/test_runtime_templates.py \
       tests/runtime/test_supervisor_single_session.py
ruff check PhyAgentOS tests
```

外部 Simulator/Policy/Robot 集成至少按以下顺序验证：Schema → Factory → Preflight rejection/acceptance → 单 Session → Timeout/Cancel → Artifact → 多次运行资源释放。真机测试还必须在 Target 侧独立验证安全停止。

## 13. 后续设计方向

HAL v3 的下一阶段包括：统一 `strict_environment_contract=true`、完整 real-robot SafetyGuard/Operator Override、Session 依赖调度、Agent-interactive Builtin Runtime、Goal Graph/Session Compiler、确定性多 Bridge 解析和长期 Fleet 编排。这些能力进入公共文档前，需要先完成 Schema、实现与端到端测试闭环。

## 后续阅读

- [框架介绍](/architecture/)
- [用户手册](/api-reference/)
- [文档首页](/)
## 7. 添加 Remote Target

Remote Target 推荐复用：

- `TargetWSClient`：将 `targetws://` 转为 WebSocket，使用 Runtime Envelope + msgpack。
- `RemoteTargetProxy`：映射 `target.*` 与 `agent_tool.*` RPC。
- `register_remote_target_runtime(runtime_name, factory)`：注册构造器。

服务端至少应实现生命周期消息：`target.describe`、`target.configure_session`、`target.start_session`、`target.reset`、`target.observe`、`target.action_chunk`、`target.execution_status`、`target.cancel` 和 `target.close`。Response 必须回显匹配的 seq、session、target 和 skillruntime 标识。

## 8. 添加 Skill Runtime

1. 继承 `PolicySkillRuntime` 或 `BuiltinSkillRuntime`。
2. 只使用 `TargetSessionHandle`。
3. 用 `register_skill_runtime(name, factory)` 注册。
4. 在 `SKILLRUNTIME.md` 声明 Loop、Target kind、Policy、IO Contract 和 Requirements。
5. 针对取消、超时、终态和不兼容 Contract 编写测试。

Builtin Runtime 暴露 Tool 时，Target 必须在 `describe_target_tools` 中提供 Schema，Skill 必须在 `target_tool_policy.expose` 中显式允许。

## 9. Policy 与通信

| Scheme | Client |
|---|---|
| `dummy://local` | `DummyPolicyClient` |
| `openpi://host:port` | OpenPI client |
| `policyws://host:port` | OpenPI-compatible client |
| `b1k-ws://host:port` | BEHAVIOR-1K client |

Remote Target 使用 `phyagentos.runtime_rpc.v2` Envelope 和 msgpack。大型数组可内联编码；Artifact 与环境状态应通过文件路径/URI 落盘，避免把大对象写入 Markdown。

## 10. Perception 开发

Perception 配置由三层组成：

1. Sensor Config：传感器、Observation Key、Shape、dtype 与标定引用。
2. Perception Config：Model、Plugin Candidate、Pipeline 和输出。
3. Skill Requirements：本次 Session 需要的 Sensor 与 Environment Output。

`PerceptionRuntime.resolve_and_check` 生成 Plan；`EnvironmentWriter` reconcile/merge `PhyAgentOS.environment.v2`。2D-only 结果不能生成虚假的米制 3D Pose，原始图像、Mask、Depth、Point Cloud 和 logits 应写 Artifact。

## 11. SessionVerifier 扩展边界

Runtime 成功后，`ResultWriter` 生成 Episode 与 Verification Bundle；Agent 侧 `SessionVerifier` 负责多模态语义 verdict。Review 模式只追加 Attempt 和 Lesson，不修改既有终态或创建 Replan。

新增证据类型时必须同时更新：Bundle Schema/Writer、Verifier Prompt、Retention 行为和测试，确保状态与 Artifact 生命周期一致。

## 12. 测试与质量门禁

```bash
pytest
pytest tests/runtime
pytest tests/runtime/test_runtime_protocol_alignment.py \
       tests/runtime/test_runtime_templates.py \
       tests/runtime/test_supervisor_single_session.py
ruff check PhyAgentOS tests
```

外部 Simulator/Policy/Robot 集成至少按以下顺序验证：Schema → Factory → Preflight rejection/acceptance → 单 Session → Timeout/Cancel → Artifact → 多次运行资源释放。真机测试还必须在 Target 侧独立验证安全停止。

## 13. 后续设计方向

HAL v3 的下一阶段包括：统一 `strict_environment_contract=true`、完整 real-robot SafetyGuard/Operator Override、Session 依赖调度、Agent-interactive Builtin Runtime、Goal Graph/Session Compiler、确定性多 Bridge 解析和长期 Fleet 编排。这些能力进入公共文档前，需要先完成 Schema、实现与端到端测试闭环。

## 后续阅读

- [框架介绍](/architecture/)
- [用户手册](/api-reference/)
- [文档首页](/)
## 8. 添加 Skill Runtime

1. 继承 `PolicySkillRuntime` 或 `BuiltinSkillRuntime`。
2. 只使用 `TargetSessionHandle`。
3. 用 `register_skill_runtime(name, factory)` 注册。
4. 在 `SKILLRUNTIME.md` 声明 Loop、Target kind、Policy、IO Contract 和 Requirements。
5. 针对取消、超时、终态和不兼容 Contract 编写测试。

Builtin Runtime 暴露 Tool 时，Target 必须在 `describe_target_tools` 中提供 Schema，Skill 必须在 `target_tool_policy.expose` 中显式允许。

## 9. Policy 与通信

| Scheme | Client |
|---|---|
| `dummy://local` | `DummyPolicyClient` |
| `openpi://host:port` | OpenPI client |
| `policyws://host:port` | OpenPI-compatible client |
| `b1k-ws://host:port` | BEHAVIOR-1K client |

Remote Target 使用 `phyagentos.runtime_rpc.v2` Envelope 和 msgpack。大型数组可内联编码；Artifact 与环境状态应通过文件路径/URI 落盘，避免把大对象写入 Markdown。

## 10. Perception 开发

Perception 配置由三层组成：

1. Sensor Config：传感器、Observation Key、Shape、dtype 与标定引用。
2. Perception Config：Model、Plugin Candidate、Pipeline 和输出。
3. Skill Requirements：本次 Session 需要的 Sensor 与 Environment Output。

`PerceptionRuntime.resolve_and_check` 生成 Plan；`EnvironmentWriter` reconcile/merge `PhyAgentOS.environment.v2`。2D-only 结果不能生成虚假的米制 3D Pose，原始图像、Mask、Depth、Point Cloud 和 logits 应写 Artifact。

## 11. SessionVerifier 扩展边界

Runtime 成功后，`ResultWriter` 生成 Episode 与 Verification Bundle；Agent 侧 `SessionVerifier` 负责多模态语义 verdict。Review 模式只追加 Attempt 和 Lesson，不修改既有终态或创建 Replan。

新增证据类型时必须同时更新：Bundle Schema/Writer、Verifier Prompt、Retention 行为和测试，确保状态与 Artifact 生命周期一致。

## 12. 测试与质量门禁

```bash
pytest
pytest tests/runtime
pytest tests/runtime/test_runtime_protocol_alignment.py \
       tests/runtime/test_runtime_templates.py \
       tests/runtime/test_supervisor_single_session.py
ruff check PhyAgentOS tests
```

外部 Simulator/Policy/Robot 集成至少按以下顺序验证：Schema → Factory → Preflight rejection/acceptance → 单 Session → Timeout/Cancel → Artifact → 多次运行资源释放。真机测试还必须在 Target 侧独立验证安全停止。

## 13. 后续设计方向

HAL v3 的下一阶段包括：统一 `strict_environment_contract=true`、完整 real-robot SafetyGuard/Operator Override、Session 依赖调度、Agent-interactive Builtin Runtime、Goal Graph/Session Compiler、确定性多 Bridge 解析和长期 Fleet 编排。这些能力进入公共文档前，需要先完成 Schema、实现与端到端测试闭环。

## 后续阅读

- [框架介绍](/architecture/)
- [用户手册](/api-reference/)
- [文档首页](/)
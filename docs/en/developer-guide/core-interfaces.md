---
title: Core Interfaces & Schemas
description: Development principles, BaseRolloutTarget, BaseSkillRuntime, Adapters & Bridges
---

# Core Interfaces & Schemas

## 1. Development Principles

In v0.1.6, we use a Session as the execution boundary. Runtime extensions follow these constraints:

1. The Agent and physical execution couple only through workspace protocols and Runtime interfaces.
2. A Skill Runtime never accesses a Target, SDK, simulator client, or WebSocket directly.
3. Every observation and action conversion is represented by an explicit Adapter/Bridge.
4. Preflight rejects incomplete contracts; it does not use implicit truncation, padding, or downgraded output.
5. Runtime writes state and facts; the Agent owns planning and optional semantic verification.

Core source entry points:

| Area | Path |
|---|---|
| Session schema/state machine | `PhyAgentOS/runtime/schemas/session.py` |
| Target/Skill schemas | `PhyAgentOS/runtime/schemas/target.py`, `skillruntime.py` |
| Watchdog | `PhyAgentOS/runtime/watchdog/supervisor.py` |
| Preflight | `PhyAgentOS/runtime/preflight/runtime_compatibility_preflight.py` |
| Session lifecycle | `PhyAgentOS/runtime/sessions/session_runner.py` |
| Target access boundary | `PhyAgentOS/runtime/sessions/target_session_handle.py` |
| Target factory | `PhyAgentOS/runtime/targets/factory.py` |
| Runtime registry | `PhyAgentOS/runtime/watchdog/runtime_registry.py` |
| Adapter factory | `PhyAgentOS/runtime/adapters/factory.py` |
| Workspace provisioning | `PhyAgentOS/runtime/workspace/manager.py` |

## 2. Core Interfaces

### 2.1 BaseRolloutTarget

```python
class BaseRolloutTarget(ABC):
    def build(self) -> None: ...
    def describe(self) -> dict: ...
    def configure_session(self, session_ctx: dict) -> dict: ...
    def start_session(self, session_ctx: dict) -> dict: ...
    def reset(self, session_ctx: dict) -> dict: ...
    def observe(self) -> dict: ...
    def observe_for_environment(self, session_ctx: dict) -> dict: ...
    def action_chunk(self, executable_action_chunk: dict) -> dict: ...
    def execution_status(self) -> dict: ...
    def describe_target_tools(self) -> dict: ...
    def call_target_tool(self, tool_name: str, arguments: dict) -> dict: ...
    def cancel(self, reason: str) -> None: ...
    def close(self) -> None: ...
```

The former `step/get_state` shape is not the current base API. Policy actions use `action_chunk`; Builtin Runtimes perform command interactions through constrained Target tools.

### 2.2 BaseSkillRuntime

```python
class BaseSkillRuntime(ABC):
    def start(self, skill_ctx: SkillContext) -> None: ...
    def cancel(self, skill_ctx: SkillContext, reason: str) -> None: ...
    def snapshot(self, skill_ctx: SkillContext) -> dict: ...
    def required_environment_outputs(self, skill_ctx: SkillContext) -> list[str]: ...
```

A concrete runtime selects one branch:

- `PolicySkillRuntime.run_policy_loop(...)`
- `BuiltinSkillRuntime.run_builtin_loop(...)`

### 2.3 Adapters and Bridges

```python
class BaseTargetAdapter(ABC):
    def output_observation_contract(self) -> dict: ...
    def input_action_contract(self) -> dict: ...
    def to_runtime_observation(self, raw_obs, target_info) -> dict: ...
    def to_executable_action_chunk(self, runtime_action_chunk, target_info) -> dict: ...

class BasePolicyAdapter(ABC):
    def input_observation_contract(self) -> dict: ...
    def output_action_contract(self) -> dict: ...
    def to_policy_input(self, runtime_observation, skill_ctx) -> dict: ...
    def from_policy_output(self, policy_output, skill_ctx) -> dict: ...

class BaseActionBridge(ABC):
    def apply(self, action_chunk, target_info) -> dict: ...
```

A TargetAdapter maps native Target data to/from Runtime data. A PolicyAdapter maps Runtime data to/from one policy. An ActionBridge performs only declared, verifiable action conversions.

### 2.4 TargetSessionHandle

A Skill Runtime receives a Handle, not a raw Target:

```python
observe() -> RuntimeObservation
action_chunk(chunk) -> dict
execution_status() -> dict
request_environment_refresh(request=None) -> EnvironmentSnapshot
call_target_tool(tool_name, arguments) -> dict
stop(reason) -> None
```

The Handle applies the TargetAdapter, ActionBridge, Tool Manifest, Perception Runtime, and Session trace.

## 3. Runtime Document Schemas

### 3.1 TARGETS.md

Each Target declares:

- a unique `id`, `target_class=local|remote`, and `target_kind`
- `workspace` and `supported_skillruntimes`
- `target_runtime`, `target_adapter`, and `runtime_contract_ref`
- a `targetws://` endpoint for a remote Target
- observation and optional perception references

The schema supports `game | debug | simulation | real_robot`. A `target_runtime` can be constructed only after registration in the factory.

### 3.2 SKILLRUNTIME.md

`runtime_kind` is either `policy` or `builtin`:

- A Policy Runtime declares a Policy Client and Policy Adapter.
- A Builtin Runtime that exposes Target tools declares `target_tool_policy`.
- `supported_target_kinds` includes the selected Target kind.
- Non-empty `requires.sensors` requires a resolvable Sensor Config.
- Non-empty `environment_outputs` triggers a Perception Plan and strict output checks.

### 3.3 SESSIONS.md

Minimal development example:

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

`SessionSpec` is the source of truth for all fields. Do not inline sensors, perception models, or a Target/Policy pair adapter in a Session.

## 4. Lifecycle and Concurrency

The Watchdog is a serial worker. It orders work by priority and then document order. `depends_on` is present in the schema, but the v0.1.6 scheduler does not enforce dependencies, so orchestrators cannot currently use it as an ordering guarantee.

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

`SessionRegistry` protects updates with `SESSIONS.md.lock` and claim tokens. Extensions must not advance state by bypassing the registry.

## 5. Current Preflight Checks

The v0.1.6 Preflight covers:

- Target enablement, class/kind, endpoint, and supported Skill
- Runtime Contract readability plus Target ID and Adapter consistency
- Skill Runtime registration, Target kind, and Policy Endpoint
- explicit Empty Observation agreement on both sides
- Target/Policy Adapter and Bridge registration
- Adapter observation/action shape, dtype, and layout
- required sensors and observation schemas
- Policy output vs Target Action Contract representation, shape, and normalization bridge
- forbidden entries in Builtin Target Tool manifests

Current boundary: real-robot operator override, the complete SafetyGuard parameter set, and remote describe/health contracts are not all mandatory checks yet. Passing the current Preflight is not a real-robot safety certification.

## 6. Adding a Local Target

Shortest implementation path:

1. Implement `BaseRolloutTarget`.
2. Add a TargetAdapter and Runtime Contract YAML.
3. Register it with `register_local_target_runtime(runtime_name, factory)`.
4. Add it to `TARGETS.md` and list only validated Skill Runtimes.
5. Add lifecycle, adapter-contract, Preflight, and end-to-end Session tests.

```python
from PhyAgentOS.runtime.targets.factory import register_local_target_runtime

register_local_target_runtime("MyTargetRuntime", build_my_target)
```

The current registry is populated by module imports. It does not provide the former `PhyAgentOS_plugin.toml` Driver auto-discovery path.

## 7. Adding a Remote Target

Remote Targets should reuse:

- `TargetWSClient`, which maps `targetws://` to WebSocket and uses Runtime Envelope + msgpack
- `RemoteTargetProxy`, which maps `target.*` and `agent_tool.*` RPCs
- `register_remote_target_runtime(runtime_name, factory)` for construction

The server should implement at least `target.describe`, `target.configure_session`, `target.start_session`, `target.reset`, `target.observe`, `target.action_chunk`, `target.execution_status`, `target.cancel`, and `target.close`. Responses must echo matching seq, session, target, and skillruntime identifiers.

## 8. Adding a Skill Runtime

1. Subclass `PolicySkillRuntime` or `BuiltinSkillRuntime`.
2. Use only `TargetSessionHandle`.
3. Register with `register_skill_runtime(name, factory)`.
4. Declare loop, Target kinds, policy, I/O contracts, and requirements in `SKILLRUNTIME.md`.
5. Test cancellation, timeout, terminal state, and incompatible contracts.

When a Builtin Runtime exposes a tool, the Target supplies its schema through `describe_target_tools`, and the Skill explicitly allows it in `target_tool_policy.expose`.

## 9. Policy and Communication

| Scheme | Client |
|---|---|
| `dummy://local` | `DummyPolicyClient` |
| `openpi://host:port` | OpenPI client |
| `policyws://host:port` | OpenPI-compatible client |
| `b1k-ws://host:port` | BEHAVIOR-1K client |

Remote Targets use `phyagentos.runtime_rpc.v2` envelopes and msgpack. Large arrays may use inline encoding; artifacts and environment state should be persisted through paths/URIs instead of embedding large objects in Markdown.

## 10. Perception Development

Perception configuration has three layers:

1. Sensor Config: sensors, observation keys, shape, dtype, and calibration references.
2. Perception Config: models, plugin candidates, pipelines, and outputs.
3. Skill Requirements: sensors and environment outputs required by this Session.

`PerceptionRuntime.resolve_and_check` produces a plan; `EnvironmentWriter` reconciles and merges `PhyAgentOS.environment.v2`. A 2D-only result must not fabricate a metric 3D pose. Raw images, masks, depth, point clouds, and logits belong in artifacts.

## 11. SessionVerifier Extension Boundary

After Runtime success, `ResultWriter` creates an episode and verification bundle. The Agent-side `SessionVerifier` owns the multimodal semantic verdict. Review mode appends an attempt and lesson without changing a terminal state or creating a replan.

Adding an evidence type requires coordinated changes to the bundle schema/writer, verifier prompt, retention behavior, and tests so state and artifact lifecycles stay consistent.

## 12. Tests and Quality Gates

```bash
pytest
pytest tests/runtime
pytest tests/runtime/test_runtime_protocol_alignment.py \
       tests/runtime/test_runtime_templates.py \
       tests/runtime/test_supervisor_single_session.py
ruff check PhyAgentOS tests
```

Validate an external simulator/policy/robot integration in this order: schema → factory → Preflight rejection/acceptance → one Session → timeout/cancel → artifacts → resource release over repeated runs. Real-robot tests also require an independently validated target-side safety stop.

## 13. Future Design Direction

The next HAL v3 stage includes uniform `strict_environment_contract=true`, complete real-robot SafetyGuard/operator override, Session dependency scheduling, agent-interactive Builtin Runtimes, Goal Graph/Session Compiler, deterministic multi-Bridge resolution, and long-horizon Fleet orchestration. Before these capabilities enter public current-state documentation, their schemas, implementation, and end-to-end tests must be complete.

## Further Reading

- [Framework Introduction](/en/architecture/)
- [User Manual](/en/api-reference/)
- [Documentation Home](/en/)
## 2. Core Interfaces

### 2.1 BaseRolloutTarget

```python
class BaseRolloutTarget(ABC):
    def build(self) -> None: ...
    def describe(self) -> dict: ...
    def configure_session(self, session_ctx: dict) -> dict: ...
    def start_session(self, session_ctx: dict) -> dict: ...
    def reset(self, session_ctx: dict) -> dict: ...
    def observe(self) -> dict: ...
    def observe_for_environment(self, session_ctx: dict) -> dict: ...
    def action_chunk(self, executable_action_chunk: dict) -> dict: ...
    def execution_status(self) -> dict: ...
    def describe_target_tools(self) -> dict: ...
    def call_target_tool(self, tool_name: str, arguments: dict) -> dict: ...
    def cancel(self, reason: str) -> None: ...
    def close(self) -> None: ...
```

The former `step/get_state` shape is not the current base API. Policy actions use `action_chunk`; Builtin Runtimes perform command interactions through constrained Target tools.

### 2.2 BaseSkillRuntime

```python
class BaseSkillRuntime(ABC):
    def start(self, skill_ctx: SkillContext) -> None: ...
    def cancel(self, skill_ctx: SkillContext, reason: str) -> None: ...
    def snapshot(self, skill_ctx: SkillContext) -> dict: ...
    def required_environment_outputs(self, skill_ctx: SkillContext) -> list[str]: ...
```

A concrete runtime selects one branch:

- `PolicySkillRuntime.run_policy_loop(...)`
- `BuiltinSkillRuntime.run_builtin_loop(...)`

### 2.3 Adapters and Bridges

```python
class BaseTargetAdapter(ABC):
    def output_observation_contract(self) -> dict: ...
    def input_action_contract(self) -> dict: ...
    def to_runtime_observation(self, raw_obs, target_info) -> dict: ...
    def to_executable_action_chunk(self, runtime_action_chunk, target_info) -> dict: ...

class BasePolicyAdapter(ABC):
    def input_observation_contract(self) -> dict: ...
    def output_action_contract(self) -> dict: ...
    def to_policy_input(self, runtime_observation, skill_ctx) -> dict: ...
    def from_policy_output(self, policy_output, skill_ctx) -> dict: ...

class BaseActionBridge(ABC):
    def apply(self, action_chunk, target_info) -> dict: ...
```

A TargetAdapter maps native Target data to/from Runtime data. A PolicyAdapter maps Runtime data to/from one policy. An ActionBridge performs only declared, verifiable action conversions.

### 2.4 TargetSessionHandle

A Skill Runtime receives a Handle, not a raw Target:

```python
observe() -> RuntimeObservation
action_chunk(chunk) -> dict
execution_status() -> dict
request_environment_refresh(request=None) -> EnvironmentSnapshot
call_target_tool(tool_name, arguments) -> dict
stop(reason) -> None
```

The Handle applies the TargetAdapter, ActionBridge, Tool Manifest, Perception Runtime, and Session trace.

## 3. Runtime Document Schemas

### 3.1 TARGETS.md

Each Target declares:

- a unique `id`, `target_class=local|remote`, and `target_kind`
- `workspace` and `supported_skillruntimes`
- `target_runtime`, `target_adapter`, and `runtime_contract_ref`
- a `targetws://` endpoint for a remote Target
- observation and optional perception references

The schema supports `game | debug | simulation | real_robot`. A `target_runtime` can be constructed only after registration in the factory.

### 3.2 SKILLRUNTIME.md

`runtime_kind` is either `policy` or `builtin`:

- A Policy Runtime declares a Policy Client and Policy Adapter.
- A Builtin Runtime that exposes Target tools declares `target_tool_policy`.
- `supported_target_kinds` includes the selected Target kind.
- Non-empty `requires.sensors` requires a resolvable Sensor Config.
- Non-empty `environment_outputs` triggers a Perception Plan and strict output checks.

### 3.3 SESSIONS.md

Minimal development example:

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

`SessionSpec` is the source of truth for all fields. Do not inline sensors, perception models, or a Target/Policy pair adapter in a Session.

## 4. Lifecycle and Concurrency

The Watchdog is a serial worker. It orders work by priority and then document order. `depends_on` is present in the schema, but the v0.1.6 scheduler does not enforce dependencies, so orchestrators cannot currently use it as an ordering guarantee.

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

`SessionRegistry` protects updates with `SESSIONS.md.lock` and claim tokens. Extensions must not advance state by bypassing the registry.

## 5. Current Preflight Checks

The v0.1.6 Preflight covers:

- Target enablement, class/kind, endpoint, and supported Skill
- Runtime Contract readability plus Target ID and Adapter consistency
- Skill Runtime registration, Target kind, and Policy Endpoint
- explicit Empty Observation agreement on both sides
- Target/Policy Adapter and Bridge registration
- Adapter observation/action shape, dtype, and layout
- required sensors and observation schemas
- Policy output vs Target Action Contract representation, shape, and normalization bridge
- forbidden entries in Builtin Target Tool manifests

Current boundary: real-robot operator override, the complete SafetyGuard parameter set, and remote describe/health contracts are not all mandatory checks yet. Passing the current Preflight is not a real-robot safety certification.

## 6. Adding a Local Target

Shortest implementation path:

1. Implement `BaseRolloutTarget`.
2. Add a TargetAdapter and Runtime Contract YAML.
3. Register it with `register_local_target_runtime(runtime_name, factory)`.
4. Add it to `TARGETS.md` and list only validated Skill Runtimes.
5. Add lifecycle, adapter-contract, Preflight, and end-to-end Session tests.

```python
from PhyAgentOS.runtime.targets.factory import register_local_target_runtime

register_local_target_runtime("MyTargetRuntime", build_my_target)
```

The current registry is populated by module imports. It does not provide the former `PhyAgentOS_plugin.toml` Driver auto-discovery path.

## 7. Adding a Remote Target

Remote Targets should reuse:

- `TargetWSClient`, which maps `targetws://` to WebSocket and uses Runtime Envelope + msgpack
- `RemoteTargetProxy`, which maps `target.*` and `agent_tool.*` RPCs
- `register_remote_target_runtime(runtime_name, factory)` for construction

The server should implement at least `target.describe`, `target.configure_session`, `target.start_session`, `target.reset`, `target.observe`, `target.action_chunk`, `target.execution_status`, `target.cancel`, and `target.close`. Responses must echo matching seq, session, target, and skillruntime identifiers.

## 8. Adding a Skill Runtime

1. Subclass `PolicySkillRuntime` or `BuiltinSkillRuntime`.
2. Use only `TargetSessionHandle`.
3. Register with `register_skill_runtime(name, factory)`.
4. Declare loop, Target kinds, policy, I/O contracts, and requirements in `SKILLRUNTIME.md`.
5. Test cancellation, timeout, terminal state, and incompatible contracts.

When a Builtin Runtime exposes a tool, the Target supplies its schema through `describe_target_tools`, and the Skill explicitly allows it in `target_tool_policy.expose`.

## 9. Policy and Communication

| Scheme | Client |
|---|---|
| `dummy://local` | `DummyPolicyClient` |
| `openpi://host:port` | OpenPI client |
| `policyws://host:port` | OpenPI-compatible client |
| `b1k-ws://host:port` | BEHAVIOR-1K client |

Remote Targets use `phyagentos.runtime_rpc.v2` envelopes and msgpack. Large arrays may use inline encoding; artifacts and environment state should be persisted through paths/URIs instead of embedding large objects in Markdown.

## 10. Perception Development

Perception configuration has three layers:

1. Sensor Config: sensors, observation keys, shape, dtype, and calibration references.
2. Perception Config: models, plugin candidates, pipelines, and outputs.
3. Skill Requirements: sensors and environment outputs required by this Session.

`PerceptionRuntime.resolve_and_check` produces a plan; `EnvironmentWriter` reconciles and merges `PhyAgentOS.environment.v2`. A 2D-only result must not fabricate a metric 3D pose. Raw images, masks, depth, point clouds, and logits belong in artifacts.

## 11. SessionVerifier Extension Boundary

After Runtime success, `ResultWriter` creates an episode and verification bundle. The Agent-side `SessionVerifier` owns the multimodal semantic verdict. Review mode appends an attempt and lesson without changing a terminal state or creating a replan.

Adding an evidence type requires coordinated changes to the bundle schema/writer, verifier prompt, retention behavior, and tests so state and artifact lifecycles stay consistent.

## 12. Tests and Quality Gates

```bash
pytest
pytest tests/runtime
pytest tests/runtime/test_runtime_protocol_alignment.py \
       tests/runtime/test_runtime_templates.py \
       tests/runtime/test_supervisor_single_session.py
ruff check PhyAgentOS tests
```

Validate an external simulator/policy/robot integration in this order: schema → factory → Preflight rejection/acceptance → one Session → timeout/cancel → artifacts → resource release over repeated runs. Real-robot tests also require an independently validated target-side safety stop.

## 13. Future Design Direction

The next HAL v3 stage includes uniform `strict_environment_contract=true`, complete real-robot SafetyGuard/operator override, Session dependency scheduling, agent-interactive Builtin Runtimes, Goal Graph/Session Compiler, deterministic multi-Bridge resolution, and long-horizon Fleet orchestration. Before these capabilities enter public current-state documentation, their schemas, implementation, and end-to-end tests must be complete.

## Further Reading

- [Framework Introduction](/en/architecture/)
- [User Manual](/en/api-reference/)
- [Documentation Home](/en/)
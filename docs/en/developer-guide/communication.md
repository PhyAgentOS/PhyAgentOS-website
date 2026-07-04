---
title: Communication Protocol & RPC Boundaries
description: Three communication boundaries, Remote Target envelope, Policy endpoints
---

# Communication Protocol & RPC Boundaries

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

## Communication Architecture

> Version: v0.1.6 · [中文](COMMUNICATION.md)

### 1. Three Communication Boundaries

PhyAgentOS separates responsibilities across three boundaries instead of one universal bus:

1. Agent messaging: Channel ↔ MessageBus ↔ AgentLoop.
2. Agent/Runtime: Markdown + YAML workspace protocols.
3. Runtime/Target/Policy: local calls or msgpack-over-WebSocket RPC.

```text
Channel ─ MessageBus ─ AgentLoop
                         │
                         │ TARGETS / SKILLRUNTIME / SESSIONS
                         ▼
                  WatchdogSupervisor
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
       targetws:// RPC       policy endpoint RPC
```

### 2. Agent Messaging Boundary

A Channel converts external input to `InboundMessage` and publishes it to MessageBus. AgentLoop processes context, model calls, and tools by session key, then returns `OutboundMessage` to the Channel. CLI single-turn mode may call `process_direct`, but the internal Agent loop remains the same.

A message Channel cannot mutate Runtime Session state or call a Target directly.

### 3. Workspace Protocol Boundary

| File | Primary writer | Primary reader |
|---|---|---|
| `RUNTIME.md` | RuntimeWorkspaceManager | Agent |
| `TARGETS.md` | User/integrator | Agent, Scheduler, Preflight |
| `SKILLRUNTIME.md` | User/integrator | Agent, Scheduler, Preflight |
| `SESSIONS.md` | Agent, Registry, Verifier | Agent, Watchdog, Verifier |
| `ENVIRONMENT.md` | Runtime/Perception | Agent, Skill |
| `LOG.md` | ResultWriter | Agent, Benchmarking, operations |
| `LESSONS.md` | Runtime/Verifier | Agent, developer |

`TARGETS.md` and `SKILLRUNTIME.md` declare capabilities, `SESSIONS.md` is queue/state, and `ENVIRONMENT.md` is a factual snapshot. They are not interchangeable.

### 4. Atomicity and Ownership

- `SessionRegistry` protects claims/state with `SESSIONS.md.lock` and atomic writes.
- `EnvironmentWriter` reconciles before atomically writing Environment v2.
- The Agent preserves existing Sessions/results when appending pending work.
- Runtime does not rewrite Agent plans; the Agent does not fabricate Runtime terminal states.
- Verification review appends audit data without changing a terminal state.

### 5. Remote Target Envelope

```yaml
version: phyagentos.runtime_rpc.v2
type: target.action_chunk
session_id: sess_001
target_id: target_001
skillruntime_id: skill_001
episode_id: ep_001
seq: 17
timestamp_ns: 1779030000000000000
trace_id: trace_001
payload: {}
```

Current transports:

- Remote Target: WebSocket + msgpack
- Local Target: in-process call with equivalent lifecycle semantics
- Policy: a separate client selected by endpoint scheme

Responses match request seq, session, target, and skillruntime. `target.observe` responds with `target.observation`; `agent_tool.call` responds with `agent_tool.result`.

### 6. Target Message Set

Current Proxy/Server lifecycle:

```text
target.describe
target.configure_session
target.start_session
target.reset
target.observe / target.observation
target.action_chunk
target.execution_status
agent_tool.call / agent_tool.result
target.cancel
target.close
runtime.error
```

`SessionRunner` enters the Target lifecycle only after accepted Preflight. Every subsequent Skill Runtime call goes through `TargetSessionHandle`.

### 7. Policy Endpoints

| Scheme | Meaning |
|---|---|
| `dummy://local` | Local deterministic Dummy Policy |
| `openpi://host:port` | OpenPI WebSocket Client |
| `policyws://host:port` | OpenPI-compatible Client |
| `b1k-ws://host:port` | BEHAVIOR-1K Policy Client |

PolicyAdapter creates policy payloads. Raw Target observations must not bypass the Adapter.

### 8. Data Placement

- Small structured control data goes in RPC payloads.
- Large images/masks/depth/point clouds/traces go to artifacts with path/URI references.
- ENVIRONMENT stores compact state and artifact references.
- `episode.json` stores one execution's facts; `LOG.md` stores history indexes.
- Verification Bundle stores task, environment, history, and RGB paths.

### 9. Error Boundary

`runtime.error` carries a stable `error_code` and actionable `message`. Connection errors, protocol mismatch, Preflight rejection, policy failure, Target failure, timeout, and semantic failure are separate layers and must not collapse into one generic task failure.

### 10. Current Limits and Evolution

v0.1.6 does not yet fully implement remote online healthchecks, Runner heartbeat RPC, Session dependency scheduling, or real-robot operator-override protocol. HAL v3 will continue converging on uniform envelopes, strict contracts, and target-side safety without allowing Runtime RPC to bypass the workspace Session state machine.

### Related Documentation

- [Integration Development Guide](/en/developer-guide/integration/)
- [Developer Manual](/en/developer-guide/)
- [Runtime Perception Guide](https://github.com/PhyAgentOS/PhyAgentOS/blob/pre-commit/PhyAgentOS/runtime/perception/README.md)
---
title: Runtime Session
description: Scenario entry points for LIBERO, Isaac Sim, and BEHAVIOR-1K
---

# Runtime Session

## 7. Current Scenarios

### 7.1 LIBERO + OpenPI

Start TargetWS on the LIBERO machine:

```bash
MUJOCO_GL=egl PYTHONWARNINGS=ignore \
conda run -n liberopi python PhyAgentOS/runtime/targets/remote/libero/server.py \
  --host 0.0.0.0 --port 9002
```

Start the pi0-family server on the policy machine:

```bash
conda run -n lerobot-pi python -m PhyAgentOS.runtime.policy.openpi.lerobot_pi0_server \
  --model-dir /path/to/checkpoint --host 0.0.0.0 --port 8000
```

In the Runtime workspace, set:

- Target endpoint: `targetws://<libero-host>:9002`
- Session policy endpoint: `openpi://<policy-host>:8000`
- `target_ref`/`skillruntime_ref`: `libero_real_remote`/`pi05_libero_remote`

Have the Agent append a Session, or run an existing one:

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

For the Merom multi-robot scene:

```bash
python PhyAgentOS/runtime/targets/remote/isaacsim/server.py \
  --config rollout/configs/merom_multi_robot.json \
  --gui --port 9003
```

The Runtime endpoint is `targetws://127.0.0.1:9003`. Command Sessions use `CommandSimSkillRuntime` to call the Target's `execute_step`; VLA Sessions use an OpenPI policy loop.

### 7.3 BEHAVIOR-1K

```bash
# Terminal A: TargetWS
bash b1k_integration/scripts/start_behavior1k_server.sh --gui --port 9004

# Terminal B: policy server
export CHECKPOINT_DIR=/path/to/pi0_b1k/checkpoint
bash b1k_integration/scripts/start_b1k_openpi_policy_server.sh

# Terminal C: E2E
python b1k_integration/scripts/run_b1k_openpi_real_e2e.py \
  --workspace b1k_integration/workspaces/behavior1k_eval
```

See `b1k_integration/README.md` and its workspace documentation for dependency and task configuration.

### 7.4 Retired Startup Paths

Do not use these historical commands:

```text
python hal/hal_watchdog.py ...
--driver franka_multi
--driver go2_edu
--driver xlerobot_2wheels_remote
```

The v0.1.6 source does not ship an installable `hal` Driver Runtime. Historical JSON examples do not imply that those backends remain available. A real robot should integrate through a `BaseRolloutTarget`, Runtime Contract, Adapter, and target-side safety gate.

## 8. Agent Semantic Verification

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

- `all`: keep RGB for every terminal state.
- `failed`: delete RGB after success and retain it for failure/replan; this is the default.
- `none`: delete RGB after any valid verdict.

Evidence lives under `artifacts/runtime/<session_id>/`. A failed semantic verdict does not rewrite Runtime execution as another execution. The Session state, verification attempt, and LESSONS record the semantic conclusion.

## 9. Fleet Configuration Boundary

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

The current implementation creates shared/instance workspaces and resolves shared Environment/LESSONS paths. `driver` is topology metadata; it does not construct a former HAL Driver. Actual multi-Target execution is determined by `TARGETS.md` and registered Target Runtimes.

## 10. Troubleshooting

### Runtime files are missing

Confirm `runtime.enabled=true` and start `paos agent`/`paos gateway`, or initialize explicitly:

```bash
python scripts/init_runtime_workspace.py --workspace /path/to/workspace
```

### A pending Session does not run

Check:

1. Target and Skill IDs exist and are mutually compatible.
2. The Target is enabled. In v0.1.6, `depends_on` is a schema field but the scheduler does not yet block execution on it.
3. Remote Targets use `targetws://`; policies use a supported scheme.
4. `runtime.autostartWatchdog` is enabled, or a Watchdog is running manually.

### Preflight rejected the Session

Inspect `result.metadata.preflight.missing_items`. Correct the registry, endpoint, contract, adapter, sensor, or action shape. Do not bypass the check with ignore fields or downgrade behavior.

### Remote Target connection failed

Start the service before the Watchdog, verify host/port reachability, and ensure `TARGETS.md` and Session routing do not override each other with an incorrect address.

### Runtime succeeded but the Session is not terminal

With `agents.verification.enabled`, `awaiting_verification` is expected. Keep the Agent/Verifier running or ask the Agent to call `verify_session`.

## Further Reading

- [Framework Introduction](/en/architecture/)
- [Developer Guide](/en/developer-guide/)
- [Documentation Home](/en/)
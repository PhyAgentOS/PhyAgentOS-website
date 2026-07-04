---
title: CLI 参考
description: paos 命令行工具参考
---

# CLI 参考

安装 PhyAgentOS 后，顶层命令包括：

```text
paos onboard
paos agent
paos gateway
paos status
paos provider login <provider>
```

## paos onboard

创建或刷新 `~/.PhyAgentOS/config.json`，并同步 Agent 工作区模板。默认 Agent 工作区为 `~/.PhyAgentOS/workspace`。

```bash
paos onboard
```

## paos agent

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

使用 `--logs` 显示 Runtime 日志。

## paos gateway

长期在线并启用 Channel、Cron 和 Heartbeat：

```bash
paos gateway --port 18790
```

## paos status

检查当前配置与运行状态。

```bash
paos status
```

## paos provider login

登录 OAuth provider：

```bash
paos provider login <provider>
```

> 详见 [快速开始](/api-reference/quick-start/) 与 [安装配置](/api-reference/configuration/)。

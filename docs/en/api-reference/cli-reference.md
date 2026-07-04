---
title: CLI Reference
description: paos command-line reference
---

# CLI Reference

After installing PhyAgentOS, the available top-level commands are:

```text
paos onboard
paos agent
paos gateway
paos status
paos provider login <provider>
```

## paos onboard

Creates or refreshes `~/.PhyAgentOS/config.json` and synchronizes Agent workspace templates. The default Agent workspace is `~/.PhyAgentOS/workspace`.

```bash
paos onboard
```

## paos agent

Interactive mode:

```bash
paos agent
```

Single-turn mode:

```bash
paos agent -m "inspect the enabled runtime targets"
```

Custom config or workspace:

```bash
paos agent --config /path/to/config.json --workspace /path/to/workspace
```

Use `--logs` to show Runtime logs.

## paos gateway

Long-running gateway with Channels, Cron, and Heartbeat:

```bash
paos gateway --port 18790
```

## paos status

Check current configuration and runtime status.

```bash
paos status
```

## paos provider login

Login with an OAuth provider:

```bash
paos provider login <provider>
```

> See [Quick Start](/api-reference/quick-start/) and [Configuration](/api-reference/configuration/) for details.

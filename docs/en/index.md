# PhyAgentOS Documentation

Version: **1.0.0**  
Implementation baseline: **Forge Skill binding, Query/Action/Session Tool API, AgentTask recovery, and version-scoped experience, 2026-08-30**

The PhyAgentOS team maintains this documentation for users, operators, and ecosystem developers. A feature is described as current only when it is supported by repository source, configuration schemas, and tests.

## Core manuals

1. [Framework Introduction](/en/01-framework-introduction.md): positioning, control-plane boundaries, execution/evidence/verdict separation, lifecycle, and implemented scope.
2. [User Manual](/en/02-user-manual.md): installation, provider and Forge configuration, task description, verification modes, artifacts, and troubleshooting.
3. [Developer Manual](/en/03-developer-manual.md): AgentTask, Tool API client, Skill Runtime, evidence, verifier, recovery, and testing.
4. [Forge Configuration Reference](/en/04-forge-configuration-reference.md): Forge Tool API, Resource Registry, evidence, verification, AgentTask, and embodiment fields.
5. [Agent Experience and Skill Evolution](/en/05-agent-experience-and-skill-evolution.md): Skill activation and attribution, episodes, Lesson clustering, Skill promotion, persistence, and guardrails.

## Focused manuals

- [Operations Manual](/user_manual/README_en.md)
- [Docker Deployment Guide](/user_manual/DOCKER_en.md)
- [Integration Development Guide](/user_development_guide/README_en.md)
- [Communication Architecture](/user_development_guide/COMMUNICATION_en.md)
- [Forge Tool API Integration Contract](/forge/README.md)

## Runtime and compatibility boundaries

PAOS supports Forge Query, Action, and Session through `/tools` and `/invocations`. The Agent-side aggregate is AgentTask, while physical execution remains owned by Gateway ToolInvocation and ToolEndpoint. Skill Runtime manages manifest-v2 bundles and named Dora profiles; it is distinct from the removed Markdown queue Runtime. Existing evolution, experience, verification, and Agent workspace data are read in place. Registry downloads are explicit and digest-verified.

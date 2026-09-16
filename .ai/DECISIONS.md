# Architectural Decisions Summary

Key decisions recorded in [docs/adr/](file:///d:/pro/Rolevia/docs/adr/):

* **ADR-0001 (Monorepo)**: pnpm workspaces + Turborepo + TypeScript.
* **ADR-0002 (Database)**: PostgreSQL 16+ as authoritative ACID store.
* **ADR-0003 (Vectors)**: pgvector with HNSW indexing within PostgreSQL.
* **ADR-0004 (Workflows)**: Temporal for long-running workflows and human gates.
* **ADR-0005 (Tenancy)**: Logical multi-tenancy with tenant_id, workspace_id, and RLS.
* **ADR-0006 (Auth)**: Hybrid RBAC (capabilities) and ABAC (consent/ownership).
* **ADR-0007 (Events)**: `<domain>.<entity>.<action>` asynchronous messaging via SQS/EventBridge.
* **ADR-0008 (Cloud)**: AWS target with Terraform.
* **ADR-0009 (AI Providers)**: Pluggable `LLMProvider` and `EmbeddingProvider` abstractions.
* **ADR-0010 (Connectors)**: `JobSourceAdapter` with declared capability flags.

# Architectural Topology — Rolevia

Summary of the system architecture for fast agent reference. Full specifications reside in [docs/architecture/](file:///d:/pro/Rolevia/docs/architecture/).

---

## 1. Monorepo Stack
* **Workspace Manager**: pnpm workspaces
* **Build Orchestrator**: Turborepo
* **Language**: TypeScript (strict mode)
* **Web Client**: Next.js 15, React 19, Tailwind CSS, semantic design tokens
* **Core API (Target)**: NestJS
* **Database**: PostgreSQL 16+ with `pgvector`
* **Ephemeral Cache & Locks**: Redis
* **Durable Workflows**: Temporal
* **Target Cloud**: AWS (ECS, Aurora Serverless, S3, KMS) managed with Terraform

---

## 2. Bounded Context Integrity
All cross-context communication uses domain contracts in `@rolevia/contracts` or asynchronous domain events (`<domain>.<entity>.<action>`). No direct database queries cross bounded context partitions.

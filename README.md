# Rolevia

> **A secure, multi-tenant AI Career Operating System** that understands a candidate, maintains persistent career intelligence, discovers relevant jobs, evaluates fit, generates truthful tailored application material, assists or automates permitted application workflows, tracks outcomes, prepares candidates for interviews, and continuously improves the user's career strategy.

---

## Maturity & Project Status

* **Current Phase**: **PHASE 0 — FOUNDATION**
* **Project Status**: `FOUNDATION / INITIAL BOOTSTRAP`
* **Implemented Baseline**:
  * Monorepo workspace configuration (`pnpm`, `Turborepo`, TypeScript)
  * Engineering constitution, AI context protocol, and persistent memory (`.ai/`)
  * Documentation architecture (`docs/`) including 16 phased roadmaps (Phase 00–15)
  * Architecture Decision Records (`docs/adr/`)
  * Agent role definitions (`.agents/`) and engineering skills (`.skills/`)
  * Core domain contracts (`packages/contracts`) and brand abstraction (`packages/config`)
  * Design tokens and web application shell (`packages/ui`, `apps/web`)
  * CI validation workflows (`.github/workflows/`)
* **Not Yet Implemented**:
  * Phase 1: Identity, authentication, and multitenancy runtime
  * Phase 2: Resume parsing and Career Intelligence Vault
  * Phase 3: pgvector context engine and RAG pipeline
  * Phase 4–15: Job connectors, Temporal workflows, automated submissions, billing

---

## Core Product Loop

```text
DISCOVER → UNDERSTAND → MATCH → RESEARCH → TAILOR → VALIDATE → APPROVE → APPLY → TRACK → INTERVIEW → OUTCOME → REMEMBER → ANALYZE → IMPROVE
```

### Invariant Rules
1. **Truthfulness Invariant**: AI must never fabricate candidate qualifications, credentials, or metrics.
2. **Precedence Hierarchy**: `User-confirmed facts > extracted facts > AI inference`.
3. **Human Agency**: Consequential AI actions (submitting applications, sending communications, deleting data) strictly require explicit user policy and human approval.

---

## Repository Structure

```text
rolevia/
├── .ai/              # Durable AI project memory and context protocols
├── .agents/          # Agent role instructions (architect, backend, security, etc.)
├── .github/          # GitHub workflows, issue templates, PR template
├── .skills/          # Reusable, executable engineering skill playbooks
├── apps/
│   └── web/          # Next.js web application shell & theme showcase
├── packages/
│   ├── config/       # Brand configuration, environment schemas, feature flags
│   ├── contracts/    # Domain data types, schemas, and event contracts
│   └── ui/           # Semantic design tokens and styling primitives
├── docs/             # Canonical documentation (architecture, phases, ADRs)
├── prompts/          # Repository bootstrap specifications
├── Makefile          # Developer task runner
├── pnpm-workspace.yaml
└── turbo.json
```

---

## Getting Started

### Prerequisites
* **Node.js**: `>= 20.0.0` (Tested on `v24.14.0`)
* **pnpm**: `>= 9.0.0` (Tested on `10.33.0`)

### Installation & Build
```bash
# 1. Install dependencies
pnpm install

# 2. Compile packages and apps
pnpm build

# 3. Start local development
pnpm dev
```

---

## Documentation Map

A new engineer or AI agent should start here:

* **Architecture Overview**: [docs/architecture/SYSTEM_OVERVIEW.md](file:///d:/pro/Rolevia/docs/architecture/SYSTEM_OVERVIEW.md)
* **Bounded Contexts**: [docs/architecture/BOUNDED_CONTEXTS.md](file:///d:/pro/Rolevia/docs/architecture/BOUNDED_CONTEXTS.md)
* **Tenancy & Isolation**: [docs/architecture/TENANCY.md](file:///d:/pro/Rolevia/docs/architecture/TENANCY.md)
* **Architecture Decision Records (ADR)**: [docs/adr/README.md](file:///d:/pro/Rolevia/docs/adr/README.md)
* **Phased Implementation Plans**: [docs/phases/](file:///d:/pro/Rolevia/docs/phases/)
* **AI Project Memory**: [.ai/README.md](file:///d:/pro/Rolevia/.ai/README.md)
* **Agent Operations**: [AGENTS.md](file:///d:/pro/Rolevia/AGENTS.md)
* **Coding Standards**: [docs/engineering/CODING_STANDARDS.md](file:///d:/pro/Rolevia/docs/engineering/CODING_STANDARDS.md)
* **Security Guidelines**: [SECURITY.md](file:///d:/pro/Rolevia/SECURITY.md)

---

## Contribution & Licensing

Please read [CONTRIBUTING.md](file:///d:/pro/Rolevia/CONTRIBUTING.md) before submitting pull requests.  
Licensing strategy is documented in [LICENSE-DECISION.md](file:///d:/pro/Rolevia/LICENSE-DECISION.md).

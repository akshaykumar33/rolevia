# Rolevia Documentation Index

Welcome to the Rolevia engineering documentation system. This repository serves as persistent, durable engineering memory.

---

## 0. Start Here

| If you are...                                 | Read                                                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Building a feature or fix (human or AI agent) | **[prompts/BUILD_PROMPT.md](file:///d:/pro/Rolevia/prompts/BUILD_PROMPT.md)** — the active delivery prompt                      |
| Shipping a user-facing change                 | **[design/UX_DEFINITION_OF_DONE.md](file:///d:/pro/Rolevia/docs/design/UX_DEFINITION_OF_DONE.md)** — the blocking UI/UX gate    |
| Branching, committing, or opening a PR        | **[engineering/GIT_WORKFLOW.md](file:///d:/pro/Rolevia/docs/engineering/GIT_WORKFLOW.md)** — branch, secret-scan, PR, merge law |
| Handling a credential or a leak               | **[security/SECRETS.md](file:///d:/pro/Rolevia/docs/security/SECRETS.md)**                                                      |
| New to the codebase                           | [../README.md](file:///d:/pro/Rolevia/README.md), then [../AGENTS.md](file:///d:/pro/Rolevia/AGENTS.md)                         |

---

## 1. Documentation Index

| Directory                                                  | Scope                                                              | Key Documents                                                                                                                                                                                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [product/](file:///d:/pro/Rolevia/docs/product/)           | Product vision, personas, flows, non-goals                         | [PRODUCT_VISION.md](file:///d:/pro/Rolevia/docs/product/PRODUCT_VISION.md), [PERSONAS.md](file:///d:/pro/Rolevia/docs/product/PERSONAS.md), [USER_FLOWS.md](file:///d:/pro/Rolevia/docs/product/USER_FLOWS.md)                            |
| [architecture/](file:///d:/pro/Rolevia/docs/architecture/) | System design, bounded contexts, tenancy, workflows                | [SYSTEM_OVERVIEW.md](file:///d:/pro/Rolevia/docs/architecture/SYSTEM_OVERVIEW.md), [BOUNDED_CONTEXTS.md](file:///d:/pro/Rolevia/docs/architecture/BOUNDED_CONTEXTS.md), [TENANCY.md](file:///d:/pro/Rolevia/docs/architecture/TENANCY.md) |
| [adr/](file:///d:/pro/Rolevia/docs/adr/)                   | Architecture Decision Records                                      | [README.md](file:///d:/pro/Rolevia/docs/adr/README.md), [0001-monorepo.md](file:///d:/pro/Rolevia/docs/adr/0001-monorepo.md) to [0010-job-source-adapter.md](file:///d:/pro/Rolevia/docs/adr/0010-job-source-adapter.md)                  |
| [phases/](file:///d:/pro/Rolevia/docs/phases/)             | Phased implementation roadmaps (Phase 00 to Phase 15)              | [PHASE-00-FOUNDATION.md](file:///d:/pro/Rolevia/docs/phases/PHASE-00-FOUNDATION.md) to [PHASE-15-SCALE.md](file:///d:/pro/Rolevia/docs/phases/PHASE-15-SCALE.md)                                                                          |
| [engineering/](file:///d:/pro/Rolevia/docs/engineering/)   | Coding standards, error handling, logging, git workflow            | [CODING_STANDARDS.md](file:///d:/pro/Rolevia/docs/engineering/CODING_STANDARDS.md), [ERROR_HANDLING.md](file:///d:/pro/Rolevia/docs/engineering/ERROR_HANDLING.md)                                                                        |
| [api/](file:///d:/pro/Rolevia/docs/api/)                   | REST API conventions, versioning, error format                     | [API_STANDARDS.md](file:///d:/pro/Rolevia/docs/api/API_STANDARDS.md), [ERROR_FORMAT.md](file:///d:/pro/Rolevia/docs/api/ERROR_FORMAT.md)                                                                                                  |
| [database/](file:///d:/pro/Rolevia/docs/database/)         | Schema design, migrations, indexing, pgvector                      | [SCHEMA_STRATEGY.md](file:///d:/pro/Rolevia/docs/database/SCHEMA_STRATEGY.md), [MULTITENANCY.md](file:///d:/pro/Rolevia/docs/database/MULTITENANCY.md)                                                                                    |
| [ai/](file:///d:/pro/Rolevia/docs/ai/)                     | AI architecture, model routing, prompts, RAG                       | [AI_ARCHITECTURE.md](file:///d:/pro/Rolevia/docs/ai/AI_ARCHITECTURE.md), [RAG.md](file:///d:/pro/Rolevia/docs/ai/RAG.md), [PROMPT_INJECTION.md](file:///d:/pro/Rolevia/docs/ai/PROMPT_INJECTION.md)                                       |
| [security/](file:///d:/pro/Rolevia/docs/security/)         | Threat model, tenant isolation, secrets, file uploads              | [THREAT_MODEL.md](file:///d:/pro/Rolevia/docs/security/THREAT_MODEL.md), [TENANT_ISOLATION.md](file:///d:/pro/Rolevia/docs/security/TENANT_ISOLATION.md)                                                                                  |
| [design/](file:///d:/pro/Rolevia/docs/design/)             | Design principles, tokens, typography, components, UX quality gate | [UX_DEFINITION_OF_DONE.md](file:///d:/pro/Rolevia/docs/design/UX_DEFINITION_OF_DONE.md), [DESIGN_PRINCIPLES.md](file:///d:/pro/Rolevia/docs/design/DESIGN_PRINCIPLES.md), [TOKENS.md](file:///d:/pro/Rolevia/docs/design/TOKENS.md)       |
| [../prompts/](file:///d:/pro/Rolevia/prompts/)             | Master prompts for humans and AI agents                            | [BUILD_PROMPT.md](file:///d:/pro/Rolevia/prompts/BUILD_PROMPT.md) (active), [starter_prompt.md](file:///d:/pro/Rolevia/prompts/starter_prompt.md) (historical)                                                                            |

---

## 2. Canonical Rule of Documentation Ownership

Every architectural concept and business rule has exactly **ONE** canonical documentation home.
Other documents reference the canonical file via markdown link rather than copying explanations. This prevents documentation drift.

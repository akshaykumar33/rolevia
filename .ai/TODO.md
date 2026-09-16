# Project TODO & Engineering Backlog

Disciplined backlog tracking for Rolevia.

---

## NOW (Phase 0 Completion)
* **TODO-001**: Execute Phase 0 bootstrap validation (`pnpm build`, `pnpm test`).
  * Phase: Phase 00
  * Dependencies: None
  * Acceptance Criteria: Monorepo compiles cleanly with zero TypeScript or lint errors.
* **TODO-002**: Initialize sequential Git history and publish to private GitHub repository.
  * Phase: Phase 00
  * Dependencies: TODO-001
  * Acceptance Criteria: 9 sequential Conventional Commits pushed to GitHub; collaborators invited.

---

## NEXT (Phase 1 — Identity & Tenancy)
* **TODO-003**: Implement PostgreSQL multi-tenancy schema migrations and Row-Level Security policies.
  * Phase: Phase 01
  * Dependencies: TODO-002, PostgreSQL instance
  * Acceptance Criteria: Tables `tenants`, `workspaces`, `users`, `workspace_memberships` created with RLS.
* **TODO-004**: Implement NestJS authentication modules (Argon2id, JWT, session cookie handler).
  * Phase: Phase 01
  * Dependencies: TODO-003, Redis instance
  * Acceptance Criteria: User can register, login, switch workspaces, and logout with invalidation.
* **TODO-005**: Build automated cross-tenant isolation regression test harness.
  * Phase: Phase 01
  * Dependencies: TODO-004
  * Acceptance Criteria: Automated test suite validates zero cross-workspace data leakage.

---

## LATER (Phase 2 & Phase 3)
* **TODO-006**: Build Document Vault S3 upload and structured PDF parser.
  * Phase: Phase 02
  * Dependencies: Phase 01 complete
* **TODO-007**: Implement pgvector HNSW indexing and hybrid semantic retrieval.
  * Phase: Phase 03
  * Dependencies: Phase 02 complete

---

## BLOCKED
* None currently.

---

## TECH DEBT
* None currently (greenfield foundation).

---

## SECURITY
* **TODO-SEC-01**: Configure automated GitHub Secret Scanning and Dependabot alerts.
  * Phase: Phase 00
  * Acceptance Criteria: `.github/dependabot.yml` deployed.

---

## RESEARCH
* **TODO-RES-01**: Evaluate open-weights vs proprietary embedding models for domain career terminology.
  * Phase: Phase 03

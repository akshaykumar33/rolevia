# Project TODO & Engineering Backlog

Disciplined backlog tracking for Rolevia.

---

## NOW (Phase 0 Completion)

- **TODO-001**: Execute Phase 0 bootstrap validation (`pnpm build`, `pnpm test`).
  - Phase: Phase 00
  - Dependencies: None
  - Acceptance Criteria: Monorepo compiles cleanly with zero TypeScript or lint errors.
- **TODO-002**: Initialize sequential Git history and publish to private GitHub repository.
  - Phase: Phase 00
  - Dependencies: TODO-001
  - Acceptance Criteria: Sequential Conventional Commits pushed to GitHub; collaborators invited.
- **TODO-008**: Configure GitHub branch protection on `main` per [GIT_WORKFLOW.md §6](../docs/engineering/GIT_WORKFLOW.md).
  - Phase: Phase 00
  - Dependencies: TODO-002 (remote must exist)
  - Owner: repository owner — requires GitHub admin rights, cannot be done from the CLI
  - Acceptance Criteria: PR required with 1 approval; required checks `Lint, Typecheck, and Build`,
    `Secret Scan`, `Dependency Audit`, `PR Validation`; linear history; force-push and deletion blocked;
    squash-merge only; auto-delete head branches; admins included.
- **TODO-009**: Replace placeholder owners in `CODEOWNERS` with real GitHub usernames or teams.
  - Phase: Phase 00
  - Dependencies: TODO-002
  - Acceptance Criteria: Code-owner review actually triggers on auth, tenancy, billing, migration,
    connector, security, and infra paths.

---

## NEXT (Phase 1 — Identity & Tenancy)

- **TODO-003**: Implement PostgreSQL multi-tenancy schema migrations and Row-Level Security policies.
  - Phase: Phase 01
  - Dependencies: TODO-002, PostgreSQL instance
  - Acceptance Criteria: Tables `tenants`, `workspaces`, `users`, `workspace_memberships` created with RLS.
- **TODO-004**: Implement NestJS authentication modules (Argon2id, JWT, session cookie handler).
  - Phase: Phase 01
  - Dependencies: TODO-003, Redis instance
  - Acceptance Criteria: User can register, login, switch workspaces, and logout with invalidation.
- **TODO-005**: Build automated cross-tenant isolation regression test harness.
  - Phase: Phase 01
  - Dependencies: TODO-004
  - Acceptance Criteria: Automated test suite validates zero cross-workspace data leakage.

---

## LATER (Phase 2 & Phase 3)

- **TODO-006**: Build Document Vault S3 upload and structured PDF parser.
  - Phase: Phase 02
  - Dependencies: Phase 01 complete
- **TODO-007**: Implement pgvector HNSW indexing and hybrid semantic retrieval.
  - Phase: Phase 03
  - Dependencies: Phase 02 complete

---

## BLOCKED

- None currently.

---

## TECH DEBT

- **TD-001**: `apps/web` has no test runner — `pnpm test` is an `echo` placeholder.
  - Phase: Phase 01
  - Acceptance Criteria: Vitest + Testing Library configured; `pnpm test` runs real assertions.
- **TD-002**: ESLint covers only `apps/web`; `packages/*` are unlinted.
  - Phase: Phase 01
  - Dependencies: None
  - Status: `apps/web/eslint.config.mjs` exists (flat config, `next/core-web-vitals` +
    `next/typescript`, `no-console` and `no-explicit-any` as errors) and runs in the commit gate.
  - Acceptance Criteria: `packages/eslint-config` extracted and consumed by `contracts`, `config`,
    and `ui`; `.lintstagedrc.json` glob widened beyond `apps/web/**`; the "Coverage limit" note
    removed from [GIT_WORKFLOW.md §3.1](../docs/engineering/GIT_WORKFLOW.md).
- **TD-003**: `make docs-check` is a stub that always passes — it validates nothing.
  - Phase: Phase 01
  - Acceptance Criteria: Real markdown link checker over `docs/`, `.ai/`, and root docs; fails CI on a
    broken internal link.

---

## SECURITY

- **TODO-SEC-01**: Enable GitHub native Secret Scanning **with push protection**, plus Dependabot alerts.
  - Phase: Phase 00
  - Owner: repository owner — requires GitHub admin rights
  - Dependencies: TODO-002
  - Acceptance Criteria: Push protection blocks a secret server-side, independent of local hooks.
    `.github/dependabot.yml` is already deployed.
- **TODO-SEC-02**: Verify the gitleaks CI job on a live pull request.
  - Phase: Phase 00
  - Dependencies: TODO-002
  - Rationale: The local gate (`scripts/pre-commit-guard.mjs` + secretlint) is tested and working, but
    `gitleaks/gitleaks-action@v2` has only ever run locally as configuration — it has not executed
    against a real PR. Confirm it scans full history and fails on a planted test secret.
  - Acceptance Criteria: A throwaway PR containing a fake credential is blocked by the `Secret Scan` check.

---

## RESEARCH

- **TODO-RES-01**: Evaluate open-weights vs proprietary embedding models for domain career terminology.
  - Phase: Phase 03

<!--
  Title must follow Conventional Commits — it becomes the squash-merge message.
  Example: feat(jobs): add match explanation panel
  Rules: docs/engineering/GIT_WORKFLOW.md
-->

## Summary

<!-- What this PR does, in one paragraph, from the user's point of view. -->

## Why

<!-- The problem being solved or the value delivered. Link the issue or phase doc. -->

## Changes

<!-- Concise bullets of what actually changed. -->

-

## Known Gaps

<!-- REQUIRED. What is incomplete, deferred, or feature-flagged, and where it is tracked.
     Write "None — feature is complete." only if that is literally true. -->

## Technical Decisions

<!-- Libraries chosen and why (one line each). Link any ADR written for a layer-level change. -->

- [ ] No new dependencies, or each is justified above (maintained, licensed, no critical CVEs, bundle cost acceptable)
- [ ] ADR authored/referenced if an architectural precedent changed: <!-- link -->

## Functional Completeness

- [ ] Real data end to end — no mocks, stubs, or hardcoded responses outside tests
- [ ] Every rendered control does what it appears to do
- [ ] Input validated at the boundary with a shared Zod schema
- [ ] Errors typed against the taxonomy and surfaced usefully
- [ ] Idempotent where the operation can be retried

## Security & Tenancy

- [ ] Every query, cache key, vector search, storage path, and job carries **verified** tenant + workspace context
- [ ] Authorization enforced server-side; no trust in client-supplied `tenantId`
- [ ] No credentials, tokens, or PII in code, logs, or fixtures
- [ ] Truthfulness invariant preserved — no fabricated candidate claims
- [ ] Untrusted external content (JDs, emails, scraped pages) cannot reach a system-instruction position

## Data & Migration Impact

- [ ] No schema change, **or** Expand–Migrate–Contract followed
- [ ] Rollback path documented and verified
- [ ] Retention and PII handling considered

## UX Definition of Done

<!-- Required for any user-facing change. Full criteria: docs/design/UX_DEFINITION_OF_DONE.md -->

- [ ] All applicable states: loading (skeleton) / empty-first-run / empty-filtered / partial / error+retry / denied / success
- [ ] Keyboard-only pass: reachable, visible focus, no traps, focus restored
- [ ] axe DevTools reports zero violations; screen-reader pass on new interactive surfaces
- [ ] Contrast AA verified in **both** light and dark
- [ ] Verified at 360 / 768 / 1024 / 1440 / 1920; touch targets ≥ 44px
- [ ] LCP / INP / CLS within budget; feedback within 100ms on every action
- [ ] Motion purposeful; `prefers-reduced-motion` honoured
- [ ] Copy reviewed — errors actionable, no internals leaked
- [ ] Semantic design tokens only; no hardcoded colours or spacing

### Screenshots

<!-- REQUIRED for UI changes. Desktop AND mobile. Before/after for redesigns. -->

## Testing

- [ ] Unit tests added/updated — and they fail without this change
- [ ] Integration tests at the boundary
- [ ] Tenant-isolation test (required for anything tenant-scoped)
- [ ] E2E coverage for critical paths
- [ ] AI evaluation results attached (if prompts, tools, or retrieval changed)

## Observability

- [ ] Structured logs with `requestId` / `correlationId` / tenant context
- [ ] Metrics for meaningful operations; audit events for consequential actions
- [ ] AI token and cost metrics tracked (if applicable)

## Documentation

- [ ] Canonical doc in `docs/` updated (one source of truth — link, don't copy)
- [ ] `.ai/CURRENT_STATE.md` and `.ai/TODO.md` updated

## Pre-Merge Checklist

- [ ] `pnpm verify` passes locally (format, lint, typecheck, test, secret scan)
- [ ] Branch rebased on current `main`
- [ ] Self-reviewed the full diff line by line
- [ ] No `--no-verify` used at any point
- [ ] Code-owner review requested if this touches auth, tenancy, billing, migrations, connectors, security, or infra

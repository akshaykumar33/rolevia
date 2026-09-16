## Summary
Brief description of the changes introduced by this pull request.

## Why
What problem does this PR solve, or what business value does it deliver?

## Changes
- Concise bullet points of code modifications.

## Architecture Impact
- [ ] No cross-context boundary violations.
- [ ] ADR referenced or authored if architectural precedent changed: (link)

## Security Impact
- [ ] Verified strict tenant and workspace isolation.
- [ ] No unmasked credentials, tokens, or PII in logs.
- [ ] Truthfulness invariant preserved (no fabricated claims).

## Data/Migration Impact
- [ ] Zero-downtime migration pattern (Expand-Migrate-Contract) followed.
- [ ] Rollback script verified.

## Screenshots (if UI change)
<!-- Attach desktop and mobile screenshots demonstrating design token usage -->

## Testing
- [ ] Unit tests added / updated.
- [ ] Integration / multi-tenancy tests pass.

## Observability
- [ ] Structured logging with correlation IDs included.
- [ ] AI token and cost metrics tracked (if applicable).

## Documentation
- [ ] Canonical docs in `docs/` updated.
- [ ] `.ai/CURRENT_STATE.md` and `.ai/TODO.md` updated.

## Checklist
- [ ] Code follows Conventional Commits standard.
- [ ] `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass with zero errors.

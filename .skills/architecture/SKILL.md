# Skill: Architecture Change

## Purpose

Guide the evaluation, proposal, and execution of significant architectural modifications or cross-boundary contract changes.

## When to use

- Introducing a new bounded context, service, or external integration.
- Modifying contracts in `packages/contracts`.
- Introducing or deprecating major technology dependencies.

## Inputs

- Business driver, problem statement, evaluated alternatives, risk assessment.

## Procedure

1. Inspect existing bounded contexts in `docs/architecture/BOUNDED_CONTEXTS.md`.
2. Draft an ADR in `docs/adr/` using the standard template (`0000-template.md`).
3. Define or modify shared interface contracts in `packages/contracts`.
4. Validate that no circular imports or prohibited dependencies are introduced.
5. Update `docs/architecture/` documents reflecting new topology.

## Validation

- Run `pnpm typecheck` and `pnpm build` across all workspaces.
- Verify dependency graph using `pnpm turbo build --graph`.

## Common mistakes

- Direct database coupling between bounded contexts.
- Introducing complex distributed systems before simple monolith modularity is exhausted.

## Security considerations

- Ensure new architecture preserves multi-tenant boundaries and does not expose internal endpoints.

## Output expectations

- Committed ADR, updated contract types, and clean workspace build.

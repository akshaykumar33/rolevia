# ADR-0001: Monorepo Tooling with pnpm and Turborepo

## Status

ACCEPTED

## Date

2026-09-16

## Context

Rolevia requires coordinated development across web clients, core NestJS APIs, AI background workers, shared contracts, and design systems. Polyrepo separation creates severe friction with synchronized cross-package types and atomic versioning.

## Decision

Adopt a TypeScript monorepo managed with `pnpm` workspaces and `Turborepo` build orchestration.

## Alternatives Evaluated

- **Polyrepo**: Rejected due to high overhead maintaining contract npm packages during rapid early evolution.
- **Nx**: High feature set but larger configuration footprint than Turborepo for our modular TypeScript architecture.

## Consequences

- **Positive**: Fast local linking, unified CI pipeline, atomic PRs touching contracts and applications simultaneously.
- **Negative**: Monorepo root configurations require careful governance to prevent dependency leakage.

## Security Impact

Enables centralized dependency auditing and unified lockfile verification.

## Operational Impact

Turborepo provides remote caching capability and parallel task execution across apps and packages.

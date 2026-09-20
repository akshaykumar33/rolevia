# ADR-0006: Hybrid RBAC and ABAC Authorization

## Status

ACCEPTED

## Date

2026-09-16

## Context

Rolevia permissions must handle coarse platform roles (admin, mentor, candidate) and granular ownership attributes (e.g. mentor can review resume but cannot approve submission without explicit candidate consent).

## Decision

Adopt a hybrid model: Role-Based Access Control (RBAC) for primary API capabilities and Attribute-Based Access Control (ABAC) for resource-level actions and consent verification.

## Alternatives Evaluated

- **Pure RBAC**: Too coarse; fails to address dynamic candidate consent and resource ownership without creating role explosion.
- **Pure ABAC**: High policy evaluation complexity for standard CRUD actions.

## Consequences

- **Positive**: Clean separation of platform duties with fine-grained candidate consent policies.
- **Negative**: Requires policy evaluation guards on both API routes and domain handlers.

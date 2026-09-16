# ADR-0005: Logical Multi-Tenancy Partitioning Model

## Status
ACCEPTED

## Date
2026-09-16

## Context
Rolevia serves individual job seekers as well as university career centers and corporate placement organizations. We require strong isolation without the prohibitive operational cost of database-per-tenant.

## Decision
Implement a shared database with logical multi-tenancy enforced through mandatory `tenant_id` and `workspace_id` columns, application-level scoping, and PostgreSQL Row-Level Security (RLS).

## Alternatives Evaluated
* **Database-per-Tenant**: Maximum isolation, but creates severe operational burdens for connection pooling, migrations, and cost for hundreds of thousands of individual candidates.
* **Schema-per-Tenant**: PostgreSQL schema exhaustion occurs around several thousand schemas.

## Consequences
* **Positive**: Cost-effective, simple database migrations, flexible resource scaling.
* **Negative**: Absolute vigilance required in query construction and unit test coverage to prevent data leaks.

# ADR-0002: Primary Database Selection (PostgreSQL)

## Status

ACCEPTED

## Date

2026-09-16

## Context

Rolevia handles relational career records, strict multi-tenancy constraints, transactional state transitions, and audit trails. We require a robust, ACID-compliant relational database with broad ecosystem maturity.

## Decision

Adopt PostgreSQL 16+ as the single authoritative operational data store.

## Alternatives Evaluated

- **MongoDB / NoSQL**: Rejected due to lack of native ACID guarantees across complex relational entities (candidates, experiences, organizations) and weaker Row-Level Security capabilities.
- **MySQL**: Mature, but lacks native pgvector extension and has less expressive JSONB indexing.

## Consequences

- **Positive**: Strict foreign keys, transactional integrity, Row-Level Security, JSONB support, and mature backup/restore tooling.
- **Negative**: Schema migrations must be disciplined and planned through expand/contract phases.

## Security Impact

PostgreSQL Row-Level Security (RLS) offers defense-in-depth enforcement of tenant boundaries.

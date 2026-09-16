# Skill: Database Migration

## Purpose
Execute safe, reversible, zero-downtime PostgreSQL schema migrations following Expand-Migrate-Contract.

## When to use
* Modifying database tables, columns, constraints, or pgvector indexes.

## Inputs
* Schema change requirements, table volume estimates, locking considerations.

## Procedure
1. Create timestamped migration file.
2. Set explicit lock timeout (`SET lock_timeout = '3s';`).
3. If creating indexes on live tables, use `CREATE INDEX CONCURRENTLY`.
4. Ensure all new tenant tables include non-nullable `tenant_id` and `workspace_id`.
5. Enable Row-Level Security (RLS) and author isolation policy.
6. Write accompanying rollback down-migration script.

## Validation
* Apply migration forward, roll back, and re-apply cleanly in local test database.

## Common mistakes
* Adding non-null columns without default values to high-volume tables.
* Missing indexes on foreign key columns.

## Security considerations
* Verify RLS policy enforces session tenant context.

## Output expectations
* Validated migration script and tested rollback.

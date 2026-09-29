# Database Indexing Standards

Indexes must be intentional and validated through query execution plans.

---

## 1. Indexing Guidelines

- **Compound Tenant Indexes**: Most lookups filter on tenant/workspace. Composite indexes lead with `(tenant_id, workspace_id, ...)`.
- **Foreign Keys**: Every foreign key column must be indexed to avoid table locks during parent record deletions.
- **Partial Indexes**: Use `WHERE deleted_at IS NULL` on soft-deleted tables to minimize index footprint.

---

## 2. Forbidden Practices

- Never add unvalidated indexes to production without inspecting `pg_stat_user_indexes` and write overhead.
- Never create unbounded wildcard text indexes without evaluating full-text search `tsvector` or pgvector.

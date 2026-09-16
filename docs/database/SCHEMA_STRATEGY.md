# Database Schema Strategy

Rolevia uses PostgreSQL 16+ with strict relational constraints, UUID primary keys, and tenant boundaries.

---

## 1. Primary Conventions
* **Primary Keys**: UUID v7 (time-ordered, highly index-friendly) or UUID v4.
* **Timestamps**: `created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL`, `updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL`.
* **Foreign Keys**: Explicit foreign keys with appropriate `ON DELETE RESTRICT` or `ON DELETE CASCADE` policies.
* **Soft Deletes**: Entities with audit requirements include `deleted_at TIMESTAMPTZ NULL`.

---

## 2. Table Column Standards
All tenant-scoped tables must include:
* `tenant_id UUID NOT NULL REFERENCES tenants(id)`
* `workspace_id UUID NOT NULL REFERENCES workspaces(id)`

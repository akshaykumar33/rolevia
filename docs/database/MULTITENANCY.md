# Database Multi-Tenancy & Row-Level Security

PostgreSQL Row-Level Security (RLS) provides kernel-level defense-in-depth preventing accidental cross-tenant data leaks.

---

## 1. RLS Policy Implementation
```sql
-- Enable RLS on candidate experiences
ALTER TABLE candidate_experiences ENABLE ROW LEVEL SECURITY;

-- Force RLS even for table owners
ALTER TABLE candidate_experiences FORCE ROW LEVEL SECURITY;

-- Policy checking current session tenant context
CREATE POLICY tenant_isolation_policy ON candidate_experiences
    FOR ALL
    USING (
        tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
        AND
        workspace_id = NULLIF(current_setting('app.current_workspace_id', true), '')::uuid
    );
```

---

## 2. Connection Initialization
Database connection pools set the session variables inside the transactional scope:
```sql
SET LOCAL app.current_tenant_id = '...';
SET LOCAL app.current_workspace_id = '...';
```

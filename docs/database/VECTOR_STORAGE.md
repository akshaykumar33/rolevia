# Vector Storage with pgvector

Vector embeddings in Rolevia power the Context Engine and semantic career matching.

---

## 1. Schema & Index Structure
```sql
CREATE TABLE context_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    workspace_id UUID NOT NULL REFERENCES workspaces(id),
    entity_type VARCHAR(64) NOT NULL, -- e.g. 'candidate_achievement', 'job_requirement'
    entity_id UUID NOT NULL,
    chunk_index INT NOT NULL DEFAULT 0,
    content_text TEXT NOT NULL,
    embedding vector(1536) NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- HNSW Cosine Similarity Index
CREATE INDEX context_embeddings_hnsw_idx ON context_embeddings 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Composite Tenant Index
CREATE INDEX context_embeddings_tenant_idx ON context_embeddings(tenant_id, workspace_id, entity_type);
```

---

## 2. Invariants
Every vector search query must enforce `tenant_id = :tenantId AND workspace_id = :workspaceId`.
Global vector scans across tenants are prohibited.

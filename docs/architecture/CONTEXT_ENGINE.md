# Context Engine Architecture

The Context Engine manages candidate career intelligence retrieval and prompt context assembly using hybrid search and the Career Knowledge Graph.

---

## Retrieval Pipeline

```mermaid
graph LR
    Query["Job Description Query"] --> Split["Query Preprocessing"]
    Split --> Dense["Dense Vector Search (pgvector HNSW)"]
    Split --> Sparse["Sparse Full-Text Search (tsvector)"]

    Dense --> Merge["Reciprocal Rank Fusion (RRF)"]
    Sparse --> Merge

    Merge --> Graph["Graph Relationship Expansion"]
    Graph --> Filter["Tenant & Scope Hard Filter"]
    Filter --> Compression["Context Deduplication & Compression"]
    Compression --> Prompt["Final Injection-Safe Prompt Context"]
```

---

## Core Tenets

1. **Tenant-Filtered Retrieval**: Vector index queries must enforce an immutable metadata filter (`tenant_id = :tenantId AND workspace_id = :workspaceId`). No embedding similarity calculation crosses workspace boundaries.
2. **Provenance Tracking**: Every retrieved chunk retains its source document ID, section, and user confirmation status.
3. **Context Compression**: High-value quantified bullet points take priority over boilerplate narratives to maximize prompt token efficiency.

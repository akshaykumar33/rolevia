# ADR-0003: Vector Embeddings Storage (pgvector)

## Status

ACCEPTED

## Date

2026-09-16

## Context

Semantic search over candidate experience items, achievements, and job descriptions requires high-dimensional vector embeddings. Introducing a separate standalone vector database (e.g. Pinecone, Milvus, Qdrant) adds operational complexity, cross-database consistency issues, and distributed failure modes.

## Decision

Adopt `pgvector` inside the primary PostgreSQL database for embedding storage and similarity indexing (HNSW).

## Alternatives Evaluated

- **Pinecone**: Cloud-managed but introduces significant multi-tenant data sync overhead and extra cloud spend.
- **Qdrant / Milvus**: Strong vector performance, but requires deploying, securing, and backing up an entirely separate cluster before scale justifies it.

## Consequences

- **Positive**: Vector embeddings live alongside relational entities in the same ACID transactions, simplifying tenant-scoped filtering (`WHERE tenant_id = ... AND workspace_id = ...`).
- **Negative**: High index memory usage requires careful sizing of PostgreSQL RAM.

# Phase 03 — Context Engine

## 1. Objective
Build the tenant-isolated semantic retrieval engine utilizing `pgvector` and hybrid search (sparse + dense) over candidate career intelligence.

## 2. User Value
Enables sub-second semantic retrieval of the most relevant candidate experiences, achievements, and metrics against complex job descriptions.

## 3. Scope
* Text chunking strategies optimized for resume bullet points and achievement narratives.
* Vector embedding generation and storage in PostgreSQL with `pgvector` HNSW indexes.
* Hybrid search combining vector similarity and PostgreSQL full-text search (`tsvector`).
* Strict tenant-filtered retrieval query builder.
* Context ranking and token compression pipelines.

## 4. Out of Scope
* Direct generation of tailored resumes (Phase 5).
* External job connector scraping (Phase 7).

## 5. Dependencies
* Phase 01 (Identity & Tenancy)
* Phase 02 (Career Intelligence)
* Embedding model provider (e.g. OpenAI text-embedding-3 or open weights)

## 6. Architecture Impact
Establishes the retrieval-augmented generation (RAG) infrastructure for all AI reasoning contexts.

## 7. Database Changes
* Enable `vector` extension in PostgreSQL.
* Table: `context_embeddings` with HNSW index on `embedding` vector and btree on `(tenant_id, workspace_id)`.

## 8. API Changes
* `POST /context/retrieve`, `POST /context/reindex`

## 9. UI Changes
* Semantic relevance preview in developer tools / candidate evidence browser.

## 10. Security Considerations
* Guaranteed tenant filtering in every vector query.
* Protection against prompt injection embedded within vector chunks.

## 11. Observability
* Retrieval latency, Reciprocal Rank Fusion (RRF) scores, embedding token costs.

## 12. Testing
* Cross-tenant vector retrieval test: verify zero documents returned from foreign tenants even with identical queries.

## 13. Migration Considerations
* Reindexing strategy when updating embedding model dimensions.

## 14. Tasks
* [ ] Configure pgvector extension and schema.
* [ ] Implement chunking and embedding pipeline.
* [ ] Build hybrid search query executor.
* [ ] Write cross-tenant isolation regression tests.

## 15. Acceptance Criteria
* Hybrid query returns top-k relevant achievements within < 150ms.
* Tenant isolation is 100% verified under adversarial query params.

## 16. Exit Criteria
* Vector retrieval benchmarked and verified against test corpus.

## 17. Risks
* High memory utilization for HNSW indexes (mitigated by bounded vector dimensions and indexing memory limits).

## 18. Rollback Considerations
* Ability to fall back to plain keyword full-text search.

## 19. Documentation Updates
* Update `docs/architecture/CONTEXT_ENGINE.md` and `docs/ai/RAG.md`.

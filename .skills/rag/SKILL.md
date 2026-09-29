# Skill: Career Context Engine & Tenant-Safe RAG

## Purpose

Extract, chunk, embed, and retrieve candidate achievements and job specifications with cryptographic provenance, strict tenant isolation, and zero cross-tenant contamination.

## When to Use

- Designing or modifying document parsing, pgvector semantic search, chunking algorithms, or grounding validation.

## Inputs

- Candidate documents (resumes, transcripts, portfolios), search queries, tenant and candidate scopes.

## Procedure

1. **Chunking & Hashing**:
   - Split documents into logical sections (Experience, Education, Skills, Projects).
   - Generate a SHA-256 hash for every chunk for cryptographic attribution.
   - Tag each chunk with candidate, workspace, and tenant IDs.
2. **Hybrid Search Execution**:
   - Combine dense vector similarity (`pgvector` HNSW `<=>` cosine distance) with sparse keyword search (`tsvector` BM25 / `ts_rank_cd`).
   - Merge results using Reciprocal Rank Fusion (RRF).
3. **Tenant-Level Isolation**:
   - Always include `WHERE tenant_id = :tenantId AND workspace_id = :workspaceId AND candidate_id = :candidateId` on every vector search query.
4. **Grounding Verification**:
   - Verify that generated career statements directly map to source chunk IDs and confirmed facts.

## Validation

- Test vector search with mismatched tenant credentials to ensure 0 rows returned.
- Benchmark search recall and latency ($< 150\text{ ms}$).

## Security Considerations

- Never perform vector search without tenant and workspace scoping.
- Prevent indirect prompt injection embedded in candidate uploaded documents.

# Skill: RAG & Semantic Retrieval

## Purpose

Design, execute, and evaluate tenant-safe vector retrieval and hybrid search pipelines.

## When to use

- Updating context retrieval for resume tailoring or match evaluation.

## Inputs

- Query text, candidate workspace context, target chunk size, k results.

## Procedure

1. Verify query executes inside authenticated tenant session.
2. Build hybrid query combining `pgvector` cosine similarity and `tsvector` full-text search.
3. Apply immutable `WHERE tenant_id = :tenantId AND workspace_id = :workspaceId` filter.
4. Merge scores using Reciprocal Rank Fusion (RRF).
5. Compress and deduplicate retrieved chunks into final prompt context.

## Validation

- Run automated cross-tenant vector isolation test.

## Common mistakes

- Executing vector distance calculations across the entire table without tenant pre-filtering.
- Stuffing unranked duplicate chunks into prompt context.

## Security considerations

- Vector chunks must not cross workspace boundaries under any circumstance.

## Output expectations

- Sub-150ms ranked chunks with source document provenance citations.

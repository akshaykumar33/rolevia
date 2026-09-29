---
name: rolevia-rag
description: >-
  Tenant-scoped pgvector retrieval, hybrid search, document chunking with cryptographic source attribution, grounding validation, and hallucination prevention for candidate career data. Use whenever implementing vector search, RAG pipelines, or resume/job matching logic.
---

# Skill: Rolevia Context Engine & Tenant-Safe RAG

## 1. Purpose & Standards

The Rolevia Context Engine powers career intelligence retrieval: extracting verified achievements, skills, and project evidence from a candidate's Document Vault to match with job descriptions and tailor applications.

Cross-tenant data contamination in vector embeddings is fatal. Every retrieval query must be cryptographically and logically scoped to the candidate's active workspace.

---

## 2. Document Chunking & Source Attribution

Raw documents (resumes, transcripts, portfolios) are processed into deterministic chunks. Every chunk carries a cryptographic SHA-256 hash of its source content and explicit candidate attribution metadata.

```typescript
export interface DocumentChunk {
  id: string; // UUID v4
  tenantId: string;
  workspaceId: string;
  candidateId: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  tokenCount: number;
  contentHash: string; // SHA-256 of normalized text
  sectionType: "EXPERIENCE" | "EDUCATION" | "SKILL" | "PROJECT" | "PUBLICATION";
  embedding: number[]; // 1536-dimensional vector
  metadata: {
    company?: string;
    roleTitle?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    userConfirmed: boolean;
  };
}
```

---

## 3. Hybrid Semantic & Keyword Search with pgvector

Pure vector search alone misses exact acronyms (e.g., `AWS`, `NestJS`, `K8s`, `HIPAA`), while pure keyword search misses conceptual matches. Rolevia enforces **Hybrid Search** using PostgreSQL `tsvector` and `pgvector` HNSW indexes combined with **Reciprocal Rank Fusion (RRF)**.

### Tenant-Scoped Query Pattern

```sql
WITH semantic_search AS (
    SELECT
        id,
        content,
        metadata,
        ROW_NUMBER() OVER (ORDER BY embedding <=> $1) as rank
    FROM document_chunks
    WHERE
        tenant_id = $2
        AND workspace_id = $3
        AND candidate_id = $4
    ORDER BY embedding <=> $1
    LIMIT 20
),
keyword_search AS (
    SELECT
        id,
        content,
        metadata,
        ROW_NUMBER() OVER (ORDER BY ts_rank_cd(to_tsvector('english', content), plainto_tsquery('english', $5)) DESC) as rank
    FROM document_chunks
    WHERE
        tenant_id = $2
        AND workspace_id = $3
        AND candidate_id = $4
        AND to_tsvector('english', content) @@ plainto_tsquery('english', $5)
    ORDER BY rank
    LIMIT 20
)
SELECT
    COALESCE(s.id, k.id) as chunk_id,
    COALESCE(s.content, k.content) as content,
    COALESCE(s.metadata, k.metadata) as metadata,
    (COALESCE(1.0 / (60 + s.rank), 0.0) + COALESCE(1.0 / (60 + k.rank), 0.0)) as rrf_score
FROM semantic_search s
FULL OUTER JOIN keyword_search k ON s.id = k.id
ORDER BY rrf_score DESC
LIMIT 10;
```

---

## 4. Grounding & Anti-Hallucination Verification

Before presenting generated career content to a candidate:

1. **Fact Mapping**: The generator must return an array of `citedChunkIds` alongside the generated text.
2. **Grounding Validator**: A lightweight verification function inspects each cited statement to verify semantic entailment against the source chunk text.
3. If an ungrounded claim is discovered, the generation is rejected and flagged for human review.

```typescript
export function verifyGrounding(
  generatedBullet: string,
  sourceChunks: DocumentChunk[],
): { isGrounded: boolean; matchingChunkId?: string } {
  // Verifies that quantified metrics and key assertions exist in source chunks
  const numbersInGenerated =
    generatedBullet.match(/\b\d+(?:[\.,]\d+)?%?\b/g) || [];

  for (const chunk of sourceChunks) {
    const hasAllMetrics = numbersInGenerated.every((num) =>
      chunk.content.includes(num),
    );
    if (hasAllMetrics) {
      return { isGrounded: true, matchingChunkId: chunk.id };
    }
  }

  return { isGrounded: false };
}
```

---

## 5. Pre-Flight Verification Checklist

Before deploying any RAG pipeline changes:

- [ ] Chunking logic preserves source attribution and content hashes.
- [ ] Every vector query enforces `tenant_id`, `workspace_id`, and `candidate_id` filters in the `WHERE` clause.
- [ ] pgvector HNSW index is built with `m = 16, ef_construction = 64` for optimal recall/latency.
- [ ] Hybrid search combines semantic similarity with BM25/keyword ranking.
- [ ] Grounding verification blocks any ungrounded metric or hallucinated experience.

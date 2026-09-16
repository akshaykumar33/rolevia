# System Constraints — Rolevia

1. **Relational Authority**: PostgreSQL is the single source of truth. Redis holds only ephemeral state with TTLs.
2. **Deterministic Workflows**: Temporal workflows must be deterministic. All I/O occurs in activities.
3. **TypeScript Strictness**: No `any` types allowed in production code. Use Zod schemas for all external boundaries.
4. **Bandwidth & File Size**: Uploaded candidate resumes capped at 10MB; supported formats PDF and DOCX only.
5. **No Hallucinated Qualifications**: Factual claims in generated resumes must map to verified Career Vault items.

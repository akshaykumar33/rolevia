# Phase 02 — Career Intelligence

## 1. Objective

Build the Document Vault and Career Intelligence Graph, enabling candidate document upload, extraction, schema mapping, and factual verification.

## 2. User Value

Allows candidates to upload resumes, transcripts, and portfolios, converting unstructured documents into a structured, verified career profile.

## 3. Scope

- Encrypted file upload to S3-compatible storage with MIME-type and antivirus validation.
- Resume parsing into structured entities (experiences, education, skills, projects, achievements).
- Career Knowledge Graph schema in PostgreSQL.
- Candidate verification UI with source-highlighting provenance.
- Precedence rule enforcement: `User-confirmed > Extracted > Inferred`.

## 4. Out of Scope

- Vector embedding similarity search (Phase 3).
- Automated resume tailoring for specific jobs (Phase 5).

## 5. Dependencies

- Phase 01 (Identity & Tenancy)
- S3-compatible object store
- Document extraction parser

## 6. Architecture Impact

Populates the foundational career ground truth used by all downstream AI matching and tailoring features.

## 7. Database Changes

- Tables: `documents`, `candidate_profiles`, `experiences`, `projects`, `skills`, `achievements`, `skill_evidences`.

## 8. API Changes

- `POST /documents/upload`, `GET /documents/:id`
- `POST /career/extract`, `GET /career/graph`, `PATCH /career/nodes/:id`

## 9. UI Changes

- Document upload dropzone, extraction progress modal, interactive Career Graph review interface.

## 10. Security Considerations

- Uploaded files scanned for malicious payloads.
- Resumes encrypted at rest using tenant-specific KMS envelopes.
- Raw document text treated as `UNTRUSTED_EXTERNAL_DATA`.

## 11. Observability

- Extraction duration, token usage, confidence scores per extracted entity.

## 12. Testing

- Unit tests for schema parsers with diverse resume formats.
- Invariant tests preventing unconfirmed claims from being marked verified.

## 13. Migration Considerations

- Versioning schema for candidate graph entities.

## 14. Tasks

- [ ] Implement secure S3 document upload handler.
- [ ] Build structured document extraction service.
- [ ] Create Career Graph entity persistence layer.
- [ ] Build candidate fact confirmation UI.

## 15. Acceptance Criteria

- PDF resume uploads successfully and extracts structured timeline.
- Candidate can edit or confirm facts with visual provenance citation.

## 16. Exit Criteria

- Truthfulness invariant verified: no fabricated skills in graph.

## 17. Risks

- Complex PDF layouts failing parsing (mitigated by fallback plain-text extraction and user edit tools).

## 18. Rollback Considerations

- Document deletion and soft-delete capabilities.

## 19. Documentation Updates

- Update `docs/architecture/CAREER_GRAPH.md`.

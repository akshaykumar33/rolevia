# Phase 04 — Job Engine

## 1. Objective
Implement job ingestion, deduplication, structured requirement extraction, and transparent fit evaluation.

## 2. User Value
Allows candidates to analyze job postings, identify exact skill alignments and missing criteria, and prioritize high-fit opportunities.

## 3. Scope
* `JobSourceAdapter` interface and mock connector implementation.
* Job description parsing into structured requirements (must-have, nice-to-have, experience level, tech stack).
* Deduplication across sources based on title, company, and location heuristics.
* Multi-dimensional match scoring with explainable evidence breakdowns.

## 4. Out of Scope
* Automatic resume generation (Phase 5).
* External automated browser submission (Phase 8).

## 5. Dependencies
* Phase 02 (Career Intelligence)
* Phase 03 (Context Engine)

## 6. Architecture Impact
Connects candidate intelligence with external market opportunities.

## 7. Database Changes
* Tables: `jobs`, `job_requirements`, `job_matches`, `job_sources`.

## 8. API Changes
* `POST /jobs/ingest`, `GET /jobs`, `GET /jobs/:id`, `GET /jobs/:id/match`

## 9. UI Changes
* Job discovery dashboard, Job detail view, Match breakdown modal with requirement checklist.

## 10. Security Considerations
* Scraped JD text treated as untrusted external content.
* Rate limiting on ingestion endpoints.

## 11. Observability
* Match calculation latency, score distribution telemetry.

## 12. Testing
* Benchmark matching accuracy against standardized job description / resume evaluation pairs.

## 13. Migration Considerations
* Recomputing match scores when candidate profile is updated.

## 14. Tasks
* [ ] Build JobSourceAdapter baseline and mock provider.
* [ ] Implement JD structured requirement extractor.
* [ ] Create match scoring algorithm with explainability breakdown.
* [ ] Build candidate-facing match breakdown interface.

## 15. Acceptance Criteria
* Job description parses into structured requirements.
* Match explanation displays clear evidence and identified skill gaps.

## 16. Exit Criteria
* Matching pipeline tested against benchmark dataset.

## 17. Risks
* Ambiguous JD language leading to false negatives in requirements.

## 18. Rollback Considerations
* Versioned matching scoring algorithms.

## 19. Documentation Updates
* Update `docs/architecture/BOUNDED_CONTEXTS.md`.

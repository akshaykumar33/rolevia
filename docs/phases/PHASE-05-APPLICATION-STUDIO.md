# Phase 05 — Application Studio

## 1. Objective

Build the Application Studio for generating truthful tailored resume versions, cover letters, and application packages with strict factual grounding.

## 2. User Value

Provides candidates with tailored, ATS-friendly application materials customized to specific roles while guaranteeing zero hallucinated credentials.

## 3. Scope

- Targeted resume tailoring engine synthesizing relevant candidate achievements for specific JD requirements.
- Strict factual verification: every generated statement mapped to verified Career Vault evidence.
- Immutable resume versioning (`ResumeVersion` snapshots).
- Tailored cover letter and custom application questionnaire assistant.
- Application Package assembly and PDF/Markdown export.

## 4. Out of Scope

- Direct submission to external ATS portals (Phase 7 & 8).
- Interview prep generation (Phase 10).

## 5. Dependencies

- Phase 02 (Career Intelligence)
- Phase 03 (Context Engine)
- Phase 04 (Job Engine)

## 6. Architecture Impact

Delivers the core generative product experience of Rolevia.

## 7. Database Changes

- Tables: `applications`, `application_packages`, `resume_versions`, `cover_letters`, `factual_verifications`.

## 8. API Changes

- `POST /applications/prepare`, `GET /applications/:id`, `PATCH /applications/:id/tailor`, `POST /applications/:id/export`

## 9. UI Changes

- Application Studio workspace, split-pane tailored resume editor with inline factual provenance citations, export drawer.

## 10. Security Considerations

- Output guardrails checking for prompt injection in generated content.
- Human approval required before marking package finalized.

## 11. Observability

- Verification failure rate, tailoring model latency, token utilization.

## 12. Testing

- Automated regression tests verifying that zero unsubstantiated skills appear in tailored outputs.

## 13. Migration Considerations

- Immutable storage of generated resume versions ensures historical auditability.

## 14. Tasks

- [ ] Implement resume tailoring prompt chain.
- [ ] Build factual claim verification engine.
- [ ] Implement immutable resume versioning.
- [ ] Build Application Studio editor UI.

## 15. Acceptance Criteria

- Tailored resume highlights relevant skills matching the target JD.
- All bullet points cite verifiable Career Vault items.
- Candidate can export valid PDF.

## 16. Exit Criteria

- Verification engine achieves 100% detection of inserted fictional credentials in test suite.

## 17. Risks

- LLM stylistic deviations (mitigated by strict JSON schemas and structured rendering).

## 18. Rollback Considerations

- Revert to original candidate base resume.

## 19. Documentation Updates

- Update `docs/architecture/BOUNDED_CONTEXTS.md`.

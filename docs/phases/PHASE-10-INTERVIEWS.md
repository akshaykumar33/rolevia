# Phase 10 — Interview Intelligence

## 1. Objective

Build the Interview Intelligence platform providing tailored technical/behavioral preparation, company research synthesis, and interactive mock interviews.

## 2. User Value

Prepares candidates for specific interview stages using their actual verified project experiences mapped to the company's real engineering challenges and cultural values.

## 3. Scope

- Company research briefing generation (products, tech stack, leadership, recent news).
- Behavioral STAR story mapper matching candidate career evidence to anticipated questions.
- Role-specific technical question generator and rubric evaluation.
- Interactive text/voice mock interview session with constructive feedback.

## 4. Out of Scope

- Video facial expression / biometric analysis.
- Automated real-time interview co-pilots during actual interviews.

## 5. Dependencies

- Phase 02 (Career Intelligence)
- Phase 04 (Job Engine)
- Phase 05 (Application Studio)

## 6. Architecture Impact

Adds interactive preparation capabilities into the core candidate application loop.

## 7. Database Changes

- Tables: `interview_sessions`, `interview_questions`, `mock_evaluations`, `company_briefs`.

## 8. API Changes

- `POST /interviews/prep`, `POST /interviews/mock/start`, `POST /interviews/mock/:id/respond`

## 9. UI Changes

- Interview Prep hub, Interactive mock interview simulator, STAR story bank review.

## 10. Security Considerations

- Mock interview transcripts encrypted and candidate-private.
- No candidate mock transcripts shared with third parties or used for public foundation model training.

## 11. Observability

- Mock session completion rate, AI feedback latency.

## 12. Testing

- Quality evaluations ensuring mock feedback provides actionable, constructive recommendations.

## 13. Migration Considerations

- Archiving historical mock sessions.

## 14. Tasks

- [ ] Implement company intelligence aggregator.
- [ ] Build STAR framework question/answer synthesizer.
- [ ] Implement mock interview turn-based state machine.
- [ ] Create interactive candidate prep UI.

## 15. Acceptance Criteria

- Candidate receives tailored questions directly referencing their previous projects.
- Actionable rubric feedback generated within 3 seconds of answer submission.

## 16. Exit Criteria

- Preparation pipeline evaluated against senior engineering interview rubrics.

## 17. Risks

- LLM giving generic advice (mitigated by strict conditioning on candidate Career Vault facts).

## 18. Rollback Considerations

- Feature flag toggling mock interview capabilities.

## 19. Documentation Updates

- Update `docs/architecture/BOUNDED_CONTEXTS.md`.

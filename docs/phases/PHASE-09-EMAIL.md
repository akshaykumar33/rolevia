# Phase 09 — Email

## 1. Objective

Implement provider-agnostic email ingestion and status classification (application acknowledgments, recruiter inquiries, interview invites, rejections).

## 2. User Value

Automatically keeps application timelines current by reading recruiter responses and interview requests without requiring manual status updates.

## 3. Scope

- Email provider abstraction (`EmailProvider`) supporting OAuth Gmail integration (Outlook later).
- Inbound message parsing and sanitization.
- ML/LLM-based email classification (ACK, INTERVIEW_REQUEST, REJECTION, OFFER, GENERAL).
- Automated application timeline association based on company and candidate email headers.

## 4. Out of Scope

- Sending mass marketing or unsolicited cold emails.
- Storing full unencrypted personal email archives.

## 5. Dependencies

- Phase 05 (Application Studio)
- Google Workspace OAuth credentials

## 6. Architecture Impact

Connects external employer communications directly into candidate timeline state machines.

## 7. Database Changes

- Tables: `email_integrations`, `email_events`, `application_communications`.

## 8. API Changes

- `POST /integrations/email/connect`, `POST /integrations/email/sync`, `GET /applications/:id/timeline`

## 9. UI Changes

- Email integration settings modal, Application timeline communication card.

## 10. Security Considerations

- Minimal OAuth scopes (`gmail.readonly` restricted to job-related queries where feasible).
- Strip all executable scripts or external trackers from email bodies.
- Encrypted storage of communication summaries.

## 11. Observability

- Email classification accuracy metrics, sync latency, token costs.

## 12. Testing

- Benchmark classification across a synthetic test suite of 500 recruiter email patterns.

## 13. Migration Considerations

- Re-syncing historical email bounds upon candidate request.

## 14. Tasks

- [ ] Implement EmailProvider abstraction and Gmail OAuth connector.
- [ ] Build email body HTML sanitizer.
- [ ] Implement LLM classifier for recruiter responses.
- [ ] Connect classified events to Application Timeline.

## 15. Acceptance Criteria

- Inbound interview request email automatically shifts application state to `INTERVIEW_SCHEDULED`.
- Non-job emails are completely ignored and not persisted.

## 16. Exit Criteria

- Zero personal non-job emails stored in application databases.

## 17. Risks

- False positive classification (mitigated by candidate confirmation prompts for ambiguous messages).

## 18. Rollback Considerations

- Candidate can disconnect email integration and purge synchronized records with one click.

## 19. Documentation Updates

- Update `docs/architecture/BOUNDED_CONTEXTS.md`.

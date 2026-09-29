# Phase 12 — Organizations

## 1. Objective

Build multi-tenant organizational accounts, cohort management, mentor review workflows, and privacy-preserving administrative oversight.

## 2. User Value

Enables universities, bootcamps, and career transition agencies to sponsor candidate cohorts, assign mentors, and review application materials with candidate consent.

## 3. Scope

- Organization tenant type with sub-workspaces and cohort grouping.
- Mentor invitation, assignment, and review comment workflows.
- Candidate privacy boundaries: candidate must consent to mentor visibility over specific application packages.
- Institutional placement administration dashboard.

## 4. Out of Scope

- Direct corporate hiring / employer applicant tracking.
- Public marketplace for unvetted third-party mentors.

## 5. Dependencies

- Phase 01 (Identity & Tenancy)
- Phase 05 (Application Studio)
- Phase 11 (Analytics)

## 6. Architecture Impact

Extends single-user workspace semantics to hierarchical organizational boundaries.

## 7. Database Changes

- Tables: `organizations`, `cohorts`, `cohort_memberships`, `mentor_assignments`, `review_comments`.

## 8. API Changes

- `POST /orgs/cohorts`, `POST /orgs/mentors/assign`, `POST /applications/:id/reviews`

## 9. UI Changes

- Organization admin portal, Mentor candidate list, Application review interface with commenting pins.

## 10. Security Considerations

- Candidate remains the primary owner of their career data; candidate departure from an organization retains their personal workspace while revoking org access.

## 11. Observability

- Mentor response times, review completion rates, organizational active user metrics.

## 12. Testing

- Verify that mentors can only view candidates explicitly assigned to their cohorts.

## 13. Migration Considerations

- Allowing individual candidate accounts to link to an organization without losing historical data.

## 14. Tasks

- [ ] Implement organization and cohort data models.
- [ ] Build mentor invitation and assignment workflow.
- [ ] Implement granular candidate review consent controls.
- [ ] Create institutional cohort reporting interface.

## 15. Acceptance Criteria

- Mentor can review and leave inline feedback on candidate tailored resume.
- Candidate can revoke mentor access at any time.

## 16. Exit Criteria

- Strict candidate privacy verified across organization boundaries.

## 17. Risks

- Inadvertent sharing of private candidate notes with organizational admins.

## 18. Rollback Considerations

- Unlink candidate account from organization back to standalone status.

## 19. Documentation Updates

- Update `docs/architecture/TENANCY.md`.

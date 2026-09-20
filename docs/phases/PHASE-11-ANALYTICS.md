# Phase 11 — Analytics

## 1. Objective

Implement funnel analytics, application response tracking, role fit metrics, and AI cost telemetry.

## 2. User Value

Gives candidates and organizations clear visibility into which resume versions, roles, and connectors yield the highest interview response rates.

## 3. Scope

- Application funnel tracking (Submitted → Screen → Technical → Onsite → Offer).
- Correlation metrics: response rates by skill tags, company tier, and resume version.
- Aggregate privacy-preserving metrics for institutional cohorts.
- Internal operational telemetry (token expenditure per application, cost per candidate).

## 4. Out of Scope

- Making ungrounded causal claims ("This resume caused a 40% salary bump").
- Cross-tenant data sharing without explicit k-anonymity protections.

## 5. Dependencies

- Phase 05 (Application Studio)
- Phase 09 (Email)

## 6. Architecture Impact

Aggregates asynchronous domain events into analytical projections.

## 7. Database Changes

- Analytical read models and materialized views: `candidate_funnel_stats`, `resume_performance_metrics`.

## 8. API Changes

- `GET /analytics/funnel`, `GET /analytics/insights`, `GET /analytics/costs`

## 9. UI Changes

- Analytics dashboard, Funnel visualization, Performance comparison charts.

## 10. Security Considerations

- Strict tenant isolation on analytical queries.
- Minimum cohort size (e.g. n >= 10) before displaying aggregate organization metrics to prevent de-anonymization.

## 11. Observability

- Query latency for analytical aggregations, materialized view refresh duration.

## 12. Testing

- Verify data correctness across state transitions and boundary filtering.

## 13. Migration Considerations

- Background asynchronous backfilling of historical analytical events.

## 14. Tasks

- [ ] Implement domain event consumer for analytical projections.
- [ ] Create materialized views for funnel calculations.
- [ ] Implement k-anonymity privacy safeguards for cohort analytics.
- [ ] Build analytics UI charts.

## 15. Acceptance Criteria

- Candidate can view response rate by resume version and application month.
- Organization view enforces cohort thresholding.

## 16. Exit Criteria

- Zero personal identifiable candidate data exposed in aggregate reporting.

## 17. Risks

- Slow complex aggregations on large event tables (mitigated by pre-aggregated rollups).

## 18. Rollback Considerations

- Drop materialized views without impacting primary transactional tables.

## 19. Documentation Updates

- Update `docs/architecture/BOUNDED_CONTEXTS.md`.

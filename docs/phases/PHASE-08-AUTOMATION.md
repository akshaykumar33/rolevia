# Phase 08 — Automation

## 1. Objective

Build the policy-controlled automation engine with strict execution limits, candidate consent guardrails, and emergency stop controls.

## 2. User Value

Permits candidates to automate routine job matching, notification alerts, and pre-authorized application draft preparation within strict safety bounds.

## 3. Scope

- Scheduled automation triggers (daily job sync, automated match evaluation).
- Candidate-configured safety limits (max applications per week, target salary floors).
- Global and per-tenant Emergency Stop switch immediately aborting active automation runs.
- Full audit trail of all automated decisions.

## 4. Out of Scope

- Unsupervised mass application submission without human-configured policy.
- Bypassing employer security challenges.

## 5. Dependencies

- Phase 06 (Workflow Engine)
- Phase 07 (Connectors)

## 6. Architecture Impact

Introduces background automated actor capabilities governed by policy contracts.

## 7. Database Changes

- Tables: `automation_policies`, `automation_runs`, `automation_limits`, `emergency_stops`.

## 8. API Changes

- `POST /automation/policies`, `POST /automation/emergency-stop`, `GET /automation/audit`

## 9. UI Changes

- Automation control panel, Safety limits sliders, Prominent Emergency Stop button.

## 10. Security Considerations

- Emergency stop signal bypasses standard queues for immediate worker eviction.
- Strict rate caps prevent accidental quota exhaustion.

## 11. Observability

- Executed actions per hour, policy trigger count, aborted job counters.

## 12. Testing

- Chaos test: verify that triggering Emergency Stop terminates running workflows within 2 seconds.

## 13. Migration Considerations

- Automation disabled by default for all tenants until explicitly opted in.

## 14. Tasks

- [ ] Implement automation policy evaluator.
- [ ] Create quota and rate limiter for automated actions.
- [ ] Implement immediate Emergency Stop kill-switch.
- [ ] Build automation audit dashboard.

## 15. Acceptance Criteria

- Candidate can configure rules (e.g. "Draft application if match > 85%").
- Emergency stop instantly halts pending automated submissions.

## 16. Exit Criteria

- Verified zero automated submissions occur when emergency stop is active.

## 17. Risks

- Candidate unintended automation configuration (mitigated by strict default caps).

## 18. Rollback Considerations

- Automatic disabling of automation features via platform kill-switch.

## 19. Documentation Updates

- Update `docs/architecture/BOUNDED_CONTEXTS.md`.

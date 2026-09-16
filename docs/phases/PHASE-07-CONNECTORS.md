# Phase 07 — Connectors

## 1. Objective
Implement the first production-grade job source connector (e.g. Greenhouse or Lever API integration) proving the `JobSourceAdapter` architecture.

## 2. User Value
Enables candidates to ingest authentic real-time job listings directly from corporate career boards and prepare verified applications.

## 3. Scope
* Concrete implementation of `JobSourceAdapter` for a major ATS platform.
* Declared capabilities: `DISCOVERY`, `DETAILS`, `ASSIST`.
* Authentication, rate-limit management, circuit breaking, and error classification.
* Health check telemetry for external connector endpoints.

## 4. Out of Scope
* Autonomous bulk job applications (Phase 8).
* Unofficial browser scraping or anti-bot circumvention.

## 5. Dependencies
* Phase 04 (Job Engine)
* Phase 06 (Workflow Engine)

## 6. Architecture Impact
Validates the external integration boundary and resilience patterns.

## 7. Database Changes
* Tables: `connector_configs`, `connector_health_logs`, `external_job_mappings`.

## 8. API Changes
* `POST /connectors/:id/sync`, `GET /connectors/status`

## 9. UI Changes
* Connector settings, connection status indicators, external job sync controls.

## 10. Security Considerations
* External API keys stored in AWS Secrets Manager / KMS envelope encryption.
* Strict respect for platform Terms of Service.

## 11. Observability
* HTTP response code metrics, external latency, circuit breaker state changes.

## 12. Testing
* Mock external HTTP server verifying rate-limit backoff and error classification.

## 13. Migration Considerations
* Backward-compatible mapping of external schema changes.

## 14. Tasks
* [ ] Implement first concrete JobSourceAdapter.
* [ ] Build rate limiting and exponential backoff retry handler.
* [ ] Implement circuit breaker pattern for external downtime.
* [ ] Add connector status monitoring.

## 15. Acceptance Criteria
* Connector successfully fetches live job descriptions.
* Rate limit 429 triggers graceful backoff and retry.

## 16. Exit Criteria
* Integration tests verify resilient handling of external HTTP 500/503/429.

## 17. Risks
* External API deprecation or schema drift.

## 18. Rollback Considerations
* Disable connector via feature flag without impacting rest of platform.

## 19. Documentation Updates
* Update `docs/architecture/CONNECTORS.md`.

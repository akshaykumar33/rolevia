# Phase 06 — Workflow Engine

## 1. Objective
Deploy the Temporal durable workflow orchestration cluster and implement core asynchronous state machines, human approval gates, and compensation activities.

## 2. User Value
Guarantees reliable execution of multi-step application preparation and submission workflows without dropped tasks or corrupted state across service restarts.

## 3. Scope
* Temporal cluster integration and worker architecture.
* Deterministic workflow definitions for document processing and application submission.
* Human approval signaling mechanism.
* Exponential backoff, activity retries, and compensation/rollback logic.

## 4. Out of Scope
* Browser automation scripts (Phase 8).
* Third-party email inbox polling (Phase 9).

## 5. Dependencies
* Phase 01 (Identity & Tenancy)
* Phase 05 (Application Studio)
* Temporal Server instance

## 6. Architecture Impact
Replaces ephemeral queues with durable, stateful workflow orchestration.

## 7. Database Changes
* Workflow state tracking references in PostgreSQL (`temporal_workflow_id`, `execution_status`).

## 8. API Changes
* `POST /workflows/application-prep/start`, `POST /workflows/:id/signal/approve`

## 9. UI Changes
* Workflow status badges (Pending Approval, Running, Completed, Failed), Signal confirmation buttons.

## 10. Security Considerations
* Workflow payloads scrubbed of cleartext credentials.
* Signal authorization verified against authenticated user session.

## 11. Observability
* Temporal Web UI integration, workflow duration metrics, activity failure rates.

## 12. Testing
* Temporal SDK test environment simulating worker restarts and signal timeouts.

## 13. Migration Considerations
* Workflow versioning strategies using Temporal patch APIs.

## 14. Tasks
* [ ] Setup Temporal worker infrastructure.
* [ ] Implement ApplicationSubmissionWorkflow with human approval signal.
* [ ] Configure retry policies and activity compensation.
* [ ] Integrate workflow status into API and UI.

## 15. Acceptance Criteria
* Workflow pauses at human approval step and resumes upon receiving user signal.
* Worker restarts do not lose workflow execution state.

## 16. Exit Criteria
* Failure injection tests pass with zero lost state.

## 17. Risks
* Nondeterministic workflow code (mitigated by automated linting with Temporal eslint rules).

## 18. Rollback Considerations
* Workflow cancellation and compensation execution.

## 19. Documentation Updates
* Update `docs/architecture/WORKFLOWS.md`.

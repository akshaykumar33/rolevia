# Error Handling Architecture

Rolevia enforces a uniform error taxonomy across all application layers, APIs, and background workers.

---

## 1. Error Taxonomy

All application errors inherit from `RoleviaError` and map to canonical error categories:
* `VALIDATION_ERROR`: Malformed input, schema mismatch, missing required fields.
* `AUTHENTICATION_ERROR`: Missing or invalid session credentials, expired JWT.
* `AUTHORIZATION_ERROR`: Insufficient role or absent candidate consent.
* `NOT_FOUND_ERROR`: Requested entity does not exist within the tenant workspace.
* `CONFLICT_ERROR`: State collision, unique key violation, concurrency conflict.
* `RATE_LIMIT_ERROR`: Quota or external API rate limits exceeded.
* `INTEGRATION_ERROR`: Third-party ATS or external service failure.
* `WORKFLOW_ERROR`: Temporal activity or signal failure.
* `AI_ERROR`: LLM hallucination detected, prompt safety filter triggered, model downtime.
* `INTERNAL_ERROR`: Unhandled unexpected runtime exceptions.

---

## 2. Error Masking & Security Invariants
* **Zero Stack Traces in Production**: Internal stack traces and raw SQL errors must NEVER be returned in API HTTP responses.
* **Correlation ID**: Every error carries a `requestId` and `correlationId` allowing engineering support to inspect full server-side logs without leaking details to clients.

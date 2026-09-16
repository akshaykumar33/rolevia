# API Idempotency Specification

Clients submitting mutating actions should provide the `Idempotency-Key` HTTP header.

---

## Behavior Specification
1. Header: `Idempotency-Key: <uuid-v4>`
2. Scope: Scoped strictly to the authenticated `tenantId + userId`.
3. Lifetime: Cached responses expire after 24 hours.
4. Concurrent Requests: If a second request arrives while the first is executing, the server responds with `409 Conflict` and `Retry-After: 2`.

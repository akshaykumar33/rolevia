# Idempotency Standards

All state-mutating POST operations (e.g. application submission, resume export, subscription purchase) must support the `Idempotency-Key` HTTP header.

---

## Idempotency Mechanism
1. Client sends a unique UUID v4 in the `Idempotency-Key` header.
2. Server checks Redis for `idempotency:{tenantId}:{key}`.
3. If processing, return `409 Conflict` (Operation in progress).
4. If completed, return cached response directly without re-executing business logic.
5. If new, set state to `IN_PROGRESS`, execute, store response in Redis with 24-hour TTL, and return.

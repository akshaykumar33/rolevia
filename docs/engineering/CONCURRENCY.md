# Concurrency Standards

Rolevia uses optimistic locking for domain entities and distributed locks in Redis for critical section execution.

---

## 1. Optimistic Locking
Entities subject to concurrent user updates (e.g. `ApplicationPackage`, `CandidateProfile`) include an integer `version` column. Updates verify `WHERE id = :id AND version = :expectedVersion`, incrementing `version` on success. Version mismatch throws `CONFLICT_ERROR` (HTTP 409).

---

## 2. Distributed Locks (Redlock)
Long-running background tasks touching non-atomic external resources (e.g. syncing connector jobs or renewing external tokens) acquire short-lived distributed Redis locks with automatic TTL release.

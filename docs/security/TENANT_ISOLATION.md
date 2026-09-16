# Tenant Isolation Standards

Security rules governing multi-tenant boundaries.

---

## Non-Negotiable Rules
1. Never trust client-supplied tenant identifiers.
2. Every database query, cache key, and vector search must be tenant-scoped.
3. Automated regression test suite must verify isolation under adversarial parameter tampering.

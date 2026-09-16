# Caching Architecture

Redis holds ephemeral cross-instance state such as rate limits, distributed locks, and short-lived workflow metadata. PostgreSQL remains authoritative; business records must not exist exclusively in Redis.

---

## Caching Guardrails
1. **Tenant-Scoped Keys**: All Redis keys must include the tenant and workspace prefix:
   `tenant:{tenantId}:workspace:{workspaceId}:{resource}:{id}`
2. **Mandatory TTL**: Every cache key must define an explicit Time-To-Live (TTL). Permanent unbounded cache keys are strictly prohibited.
3. **Invalidation Strategy**: Entity mutation events invalidate associated cache keys explicitly, avoiding stale reads.

# Security Threat Model

STRIDE-based threat modeling for the Rolevia career platform.

---

## Threat Matrix

| Threat | Vulnerability Vector | Mitigation |
| ------ | -------------------- | ---------- |
| **Spoofing** | Forged JWT or session tokens | Cryptographically signed tokens, Argon2id passwords, Redis token revocation |
| **Tampering** | Modifying `tenantId` parameter | Server-side membership verification + PostgreSQL Row-Level Security |
| **Repudiation** | Denying automated application action | Cryptographic audit logs with correlation IDs and timestamping |
| **Information Disclosure** | Cross-tenant data leakage in vector search | Tenant-scoped metadata filters in pgvector queries |
| **Denial of Service** | Resource exhaustion via huge resume uploads | File size limits (10MB), rate limiting, background async workers |
| **Elevation of Privilege** | Candidate accessing organization admin endpoints | Strict RBAC/ABAC guards on every API route |

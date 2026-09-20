# Phase 01 — Identity & Tenancy

## 1. Objective

Implement multi-tenant identity, authentication, workspace management, and hybrid RBAC/ABAC authorization guards.

## 2. User Value

Enables candidates and organizations to securely register, sign in, manage workspaces, and collaborate with guaranteed tenant isolation.

## 3. Scope

- User registration, password hashing (Argon2id), and OAuth 2.0 / OIDC integrations.
- Tenant and Workspace aggregates with membership models.
- Session management with Redis token revocation.
- Role-based permissions and Row-Level Security (RLS) policies in PostgreSQL.
- Multi-tenancy test harness verifying zero cross-tenant leakage.

## 4. Out of Scope

- Resume parsing or AI embeddings (Phase 2 & 3).
- Payment processing or billing subscriptions (Phase 13).

## 5. Dependencies

- Phase 00 (Foundation & Contracts)
- PostgreSQL 16+ instance
- Redis 7+ instance

## 6. Architecture Impact

Establishes the core security boundary for all downstream API endpoints and database operations.

## 7. Database Changes

- Tables: `tenants`, `workspaces`, `users`, `workspace_memberships`, `roles`, `permissions`, `sessions`, `audit_logs`.
- RLS policies enforcing `tenant_id` and `workspace_id` isolation.

## 8. API Changes

- `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
- `GET /workspaces`, `POST /workspaces`, `GET /workspaces/:id/members`

## 9. UI Changes

- Authentication flows: Sign up, Sign in, Forgot Password, Workspace Switcher.

## 10. Security Considerations

- Protection against timing attacks in password verification.
- HTTP-only, Secure, SameSite=Lax session cookies.
- Cryptographic tenant context validation on every incoming request.

## 11. Observability

- Structured audit events for all authentication attempts, privilege elevations, and membership modifications.

## 12. Testing

- Automated integration test suite verifying that Tenant A cannot read or mutate Tenant B resources under any parameter tampering.

## 13. Migration Considerations

- Initial database migration with baseline roles and permissions seed.

## 14. Tasks

- [ ] Implement PostgreSQL tenancy schema migrations.
- [ ] Implement NestJS authentication modules and JWT/session guards.
- [ ] Build tenant context middleware.
- [ ] Implement RBAC/ABAC permission evaluator.
- [ ] Create isolation regression test suite.

## 15. Acceptance Criteria

- User can register, authenticate, and receive a secure session.
- Workspace switching properly scopes subsequent queries.
- Cross-tenant query tampering returns 403/404.

## 16. Exit Criteria

- Automated security isolation tests pass 100%.

## 17. Risks

- Leaking tenant context in asynchronous background jobs (mitigated by mandatory job metadata payload).

## 18. Rollback Considerations

- Schema rollback scripts prepared for all migrations.

## 19. Documentation Updates

- Update `docs/architecture/TENANCY.md` and `docs/architecture/AUTHORIZATION.md` with implementation details.

# Skill: Multi-Tenant Security, Safety & Tenant Isolation

## Purpose

Systematically audit, enforce, and test tenant isolation, Row-Level Security (RLS), secret prevention, PII redaction, and human-in-the-loop authorization gates across all services.

## When to Use

- Mandatory prior to merging any changes affecting authentication, tenancy, file vaults, database migrations, or third-party connectors.
- When performing security code reviews.

## Inputs

- Service code diff, database queries, API endpoints, data classification tags.

## Procedure

1. **Verify Tenant Scoping & RLS**:
   - Confirm every database interaction executes within an RLS transaction context (`SET LOCAL app.current_tenant_id = :tenantId`).
   - Confirm Redis keys are prefixed with `tenant:{tenantId}:workspace:{workspaceId}`.
   - Confirm vector searches include mandatory `tenant_id` and `workspace_id` filters.
   - Never trust tenant or workspace IDs provided in HTTP query parameters or request bodies.
2. **Audit Human-in-the-Loop (HITL) Gates**:
   - Ensure consequential actions (submitting external job applications, sending emails, deleting data) require authenticated user approval tokens.
3. **Secret & Credential Leak Prevention**:
   - Ensure `.env*` files, private keys, and API tokens are ignored in `.gitignore`.
   - Run local secret scans (`pnpm verify:secrets`).
4. **PII Redaction**:
   - Verify that loggers automatically mask PII (email, phone number, address, passwords, tokens).
5. **SSRF & Injection Defense**:
   - Validate connector URLs against domain allowlists; block loopback (`127.0.0.1`, `localhost`) and private subnet ranges.

## Validation

- Run automated cross-tenant isolation regression tests (attempting cross-tenant data access).
- Verify secret scanner passes with zero detected credentials.

## Security Considerations

- Security regressions are blocking gates. Any potential cross-tenant leakage must halt deployment immediately.

## Output Expectations

- Audited endpoints with RLS enforcement and automated regression test coverage.

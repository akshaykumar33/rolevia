# Skill: Security Review & Tenant Isolation

## Purpose
Execute systematic security reviews on pull requests and proposed architectural changes.

## When to use
* Mandatory review before merging changes to auth, tenancy, file uploads, billing, or external connectors.

## Inputs
* Pull request diff, data classification tags, affected API endpoints.

## Procedure
1. Check tenant scoping: verify every database query and cache operation uses verified session context.
2. Check authorization: verify `@RequirePermissions` or consent checks on mutating actions.
3. Check input validation: verify Zod schemas on all incoming parameters.
4. Check logging: verify no passwords, tokens, or plaintext PII are logged.
5. Check external data: ensure all third-party inputs are treated as untrusted.

## Validation
* Run automated tenant isolation test suite and dependency vulnerability audit.

## Common mistakes
* Trusting `workspaceId` from route parameters without validating membership.
* Logging full exception objects containing sensitive query parameters.

## Security considerations
* Security regressions are blockers; do not merge code with unresolved security findings.

## Output expectations
* Categorized findings report (`BLOCKER`, `HIGH`, `MEDIUM`, `LOW`, `NIT`) with remediation instructions.

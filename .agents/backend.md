# Backend Engineer Agent

## Mission
Implement robust, tenant-isolated REST endpoints, domain services, and background workers adhering to strict engineering standards.

## Responsibilities
* Implement controllers, guards, and services in NestJS.
* Ensure all SQL queries filter on `tenant_id` and `workspace_id`.
* Handle distributed transactions and idempotent event handlers.

## Inputs
* API contracts, feature plans, database schemas.

## Outputs
* TypeScript code, unit tests, integration tests.

## Required Context
* `docs/engineering/`, `docs/api/`, `docs/security/TENANT_ISOLATION.md`.

## Forbidden Behavior
* Never return unmasked raw stack traces or database errors in API responses.
* Never trust client-supplied tenant identifiers without verifying session membership.

## Definition of Done
* Code passes lint and typecheck, tests pass with > 85% coverage, endpoints documented with OpenAPI/Zod.

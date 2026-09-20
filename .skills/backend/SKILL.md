# Skill: Backend Development

## Purpose

Standardized procedure for implementing backend endpoints, business domain services, and database queries in NestJS.

## When to use

- Adding or updating API controllers, service handlers, or domain aggregates.

## Inputs

- API specification, DTO schemas, domain models.

## Procedure

1. Define request and response Zod schemas matching contracts.
2. Implement controller with `@UseGuards(TenantContextGuard, PermissionsGuard)`.
3. Implement service logic ensuring all repository queries pass `tenantId` and `workspaceId`.
4. Wrap domain errors in standard `RoleviaError` exceptions.
5. Write unit and integration tests.

## Validation

- `pnpm lint` and `pnpm test`. Verify zero raw SQL error leaks.

## Common mistakes

- Forgetting tenant isolation filter in nested relation joins.
- Returning raw database entities instead of sanitized DTOs.

## Security considerations

- Validate all request inputs with strict Zod parsers; strip unexpected parameters.

## Output expectations

- Tested endpoint adhering to API standards and error format specifications.

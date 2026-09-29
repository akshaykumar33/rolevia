# Skill: Quality Assurance, Test Strategy & UX Definition of Done Verification

## Purpose

Enforce testing discipline across the monorepo, verifying functional completeness, component state coverage, accessibility compliance, and cross-tenant security.

## When to Use

- Writing tests for UI components, service logic, database interactions, or APIs.
- Pre-merge delivery gate verification on pull requests.

## Inputs

- Component or service code, UX Definition of Done checklist, tenant isolation requirements.

## Procedure

1. **Component & UI Testing**:
   - Write tests using Vitest and React Testing Library.
   - Test all 10 applicable states: Initial Loading, Refetch Loading, Empty First-Run, Empty Filtered, Partial Failure, Error with Retry, Permission Denied, Offline, Success, Optimistic with Rollback.
   - Run `axe-core` on rendered components to ensure zero WCAG 2.1 AA violations.
2. **Tenant Isolation Testing**:
   - Implement adversarial tests: have Tenant B attempt to query Tenant A's documents, profile, or applications.
   - Assert zero data leaked across tenant boundaries.
3. **Contract & Schema Verification**:
   - Test that domain payloads strictly conform to Zod schemas in `@rolevia/contracts`.
4. **Pre-Commit / Pre-Merge Gates**:
   - Run `pnpm build`, `pnpm test`, and `pnpm verify:secrets`.
   - Ensure commit messages adhere to Conventional Commits.

## Validation

- 100% passing test suites with zero skipped critical security or accessibility checks.

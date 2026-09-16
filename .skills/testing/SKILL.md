# Skill: Automated Testing & Verification

## Purpose
Author and maintain reliable, deterministic test suites across all levels of the testing pyramid.

## When to use
* Implementing new features, fixing bugs (regression tests), or updating contracts.

## Inputs
* Business requirements, edge cases, failure scenarios.

## Procedure
1. Write unit tests for pure domain functions and validation schemas.
2. Write integration tests for API endpoints with transactional database rollbacks.
3. Author explicit multi-tenancy tests asserting 403/404 on cross-workspace queries.
4. Author prompt regression tests asserting that fictional skills are rejected by tailoring verifiers.

## Validation
* Run test suite: `pnpm test`. All tests must pass deterministically without network flakiness.

## Common mistakes
* Testing implementation details rather than observable behavior.
* Using shared mutable test fixtures that cause race conditions in parallel runs.

## Security considerations
* Never use real candidate PII or live credentials in test fixtures.

## Output expectations
* High-confidence, fast-executing test suites integrated into CI.

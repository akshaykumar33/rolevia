# Skill: Code Review & Quality Assurance

## Purpose
Execute systematic peer reviews on proposed pull requests, evaluating correctness, security, tenant isolation, and architectural compliance.

## When to use
* Reviewing pull requests prior to merge.

## Inputs
* PR diff, PR template checklist, automated CI test run status.

## Procedure
1. Verify CI status: do not conduct detailed review if CI checks fail.
2. Inspect tenant isolation: check that all database queries and vector lookups include tenant and workspace filters.
3. Check error handling: ensure no unmasked internal exceptions or SQL errors are leaked.
4. Check test coverage: verify unit and regression tests accompany the code change.
5. Check documentation: verify that relevant docs and `.ai/CURRENT_STATE.md` were updated.
6. Categorize all issues by severity:
   * `BLOCKER`: Security flaw, tenant leak, broken build, data loss risk.
   * `HIGH`: Missing error handling, missing authorization guard, architectural deviation.
   * `MEDIUM`: Suboptimal performance, missing test edge cases.
   * `LOW`: Naming inconsistency, minor style deviation.
   * `NIT`: Optional polish or typo correction.

## Validation
* Provide explicit file and line citations with actionable remediation guidance.

## Common mistakes
* Approving PRs with TODO comments indicating missing security checks.
* Focusing on trivial formatting while missing subtle tenant isolation leaks.

## Security considerations
* Block any PR introducing potential cross-tenant visibility or unvalidated user input.

## Output expectations
* Objective, structured review output with clear merge recommendations.

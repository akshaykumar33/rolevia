# Skill: Documentation Maintenance

## Purpose
Prevent documentation drift, audit cross-references, and ensure architectural decisions are accurately captured.

## When to use
* Completing features, modifying APIs, or refactoring subsystem boundaries.

## Inputs
* Changed source files, ADRs, updated domain models.

## Procedure
1. Identify the single canonical documentation owner for the changed concept.
2. Update the canonical document; update references in other documents using markdown links.
3. Update `.ai/CURRENT_STATE.md` and check off tasks in `.ai/TODO.md`.
4. Validate that all internal markdown links resolve correctly.

## Validation
* Run markdown link validation check.

## Common mistakes
* Copying duplicate explanations into multiple files.
* Claiming a feature is complete when it is only partially scaffolded.

## Security considerations
* Ensure confidential internal URLs or unredacted keys are not committed to documentation.

## Output expectations
* Synchronized documentation reflecting exact codebase state.

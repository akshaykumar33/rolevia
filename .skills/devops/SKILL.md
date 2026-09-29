# Skill: DevOps & CI/CD Management

## Purpose

Manage GitHub Actions workflows, container builds, and infrastructure configurations.

## When to use

- Adding CI validation jobs, updating Docker builds, or modifying cloud infrastructure templates.

## Inputs

- Build targets, environment requirements, secret injection policies.

## Procedure

1. Define deterministic workflow steps with explicit toolchain versions.
2. Enable caching for pnpm stores and Turborepo caches to ensure fast feedback (< 5 mins).
3. Author multi-stage Dockerfiles optimizing runtime size and stripping dev dependencies.
4. Validate Terraform files with `terraform validate` and `tflint`.

## Validation

- Test workflows locally using `act` or verify against GitHub Actions run logs.

## Common mistakes

- Allowing CI runs to depend on external unpinned network resources.
- Leaving secrets or cleartext credentials in workflow files.

## Security considerations

- Restrict workflow permissions (`permissions: contents: read`) to minimum necessary.

## Output expectations

- Green CI build and repeatable deployment artifacts.

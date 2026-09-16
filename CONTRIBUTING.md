# Contributing to Rolevia

Thank you for contributing to Rolevia. We maintain high standards for architecture, security, multi-tenancy, and code quality.

---

## 1. Development Principles

1. **Architecture Integrity**: Check [docs/architecture/BOUNDED_CONTEXTS.md](file:///d:/pro/Rolevia/docs/architecture/BOUNDED_CONTEXTS.md) before introducing dependencies or cross-domain queries.
2. **Strict Tenant Scoping**: Every database query, cache key, vector search, and background job must carry verified tenant context.
3. **Truthfulness Invariant**: AI features must never fabricate candidate qualifications.
4. **No Premature Complexity**: Implement the simplest architecture that preserves required bounded context isolation.

---

## 2. Branch & Git Strategy

We follow a trunk-oriented Git workflow.

### Branch Naming
* `feature/<short-description>`
* `fix/<issue-description>`
* `refactor/<target-area>`
* `docs/<topic>`
* `chore/<maintenance-task>`

### Commit Conventions
We strictly adhere to Conventional Commits:
```text
type(scope): concise imperative description

[optional body explaining WHY]
```

Allowed types:
* `feat`: New user or system capability
* `fix`: Bug fix
* `refactor`: Code change that neither fixes a bug nor adds a feature
* `perf`: Performance improvement
* `test`: Adding or correcting tests
* `docs`: Documentation updates
* `build`: Build system or dependency updates
* `ci`: GitHub workflows and CI/CD pipelines
* `chore`: Maintenance tasks
* `security`: Security patches or hardening

---

## 3. Pull Request Requirements

Before opening a pull request:
1. Ensure all formatting checks pass: `pnpm format`
2. Ensure linter passes with zero warnings: `pnpm lint`
3. Ensure TypeScript type checking passes: `pnpm typecheck`
4. Ensure all automated tests pass: `pnpm test`
5. Ensure documentation is updated if domain boundaries, APIs, or schemas changed.

Every PR must use the [PULL_REQUEST_TEMPLATE.md](file:///d:/pro/Rolevia/.github/PULL_REQUEST_TEMPLATE.md).

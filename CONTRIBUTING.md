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

We follow a trunk-oriented Git workflow. **Canonical rules: [docs/engineering/GIT_WORKFLOW.md](./docs/engineering/GIT_WORKFLOW.md)** — this section is a summary.

Three rules govern everything:

1. **Never commit to `main`.** Work happens on a branch.
2. **Never commit a secret.** The pre-commit gate enforces it; rotate anything that slips.
3. **Never merge without a pull request.** Including solo work and one-line fixes.

### Branch Naming

```
<type>/<scope>-<short-slug>
```

Lowercase, hyphen-separated, ≤ 60 characters. Validated by the pre-commit hook and by CI.

| Type                     | Example                                   |
| ------------------------ | ----------------------------------------- |
| `feat`                   | `feat/jobs-match-explanation`             |
| `fix`                    | `fix/auth-session-rotation`               |
| `refactor`               | `refactor/applications-submission-policy` |
| `perf`                   | `perf/jobs-batch-requirement-lookup`      |
| `test`                   | `test/tenancy-cross-workspace-isolation`  |
| `docs`                   | `docs/architecture-workflow-boundaries`   |
| `build` · `ci` · `chore` | `ci/security-gitleaks-scan`               |
| `security`               | `security/rag-tenant-filter`              |
| `hotfix`                 | `hotfix/billing-webhook-retry`            |

### Commit Conventions

We strictly adhere to Conventional Commits:

```text
type(scope): concise imperative description

[optional body explaining WHY]
```

Allowed types:

- `feat`: New user or system capability
- `fix`: Bug fix
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or correcting tests
- `docs`: Documentation updates
- `build`: Build system or dependency updates
- `ci`: GitHub workflows and CI/CD pipelines
- `chore`: Maintenance tasks
- `security`: Security patches or hardening

---

---

## 3. Codebase Protection

`pnpm install` activates Git hooks (husky). On every commit they block:

- committing directly to `main`, or from a non-conforming branch name
- sensitive files — `.env*`, `*.pem`, `*.key`, SSH keys, service-account JSON, DB dumps
- secret **content** — API keys, tokens, JWTs, private keys, connection strings (secretlint)
- files over 2 MB, and `console.log` / `debugger` / `.only(` in source
- commit messages that are not Conventional Commits

CI re-scans **full repository history** with gitleaks, so a local bypass is caught on the PR.

**`git commit --no-verify` is prohibited.** If a gate is wrong, fix the rule in `.gitleaks.toml` or
`.secretlintrc.json` in its own reviewed PR — never route around it.

**If a secret ever reaches a commit: rotate it immediately.** Deleting it in a later commit does not
remove it from history. Then follow [docs/engineering/GIT_WORKFLOW.md §3.4](./docs/engineering/GIT_WORKFLOW.md).

Audit at any time:

```bash
pnpm verify:secrets   # scan for secrets and sensitive files
pnpm verify           # format + lint + typecheck + test + secret scan
```

---

## 4. Pull Request Requirements

**Every change reaches `main` through a pull request** — no direct pushes, no exceptions, including
hotfixes, docs, and solo work. The PR is the audit trail.

Before opening one:

1. `pnpm verify` passes locally
2. Branch rebased on current `main`
3. You have self-reviewed the full diff line by line
4. `.ai/CURRENT_STATE.md` and `.ai/TODO.md` are updated
5. Canonical docs updated; ADR written if an architectural precedent changed

The PR title must follow Conventional Commits — it becomes the squash-merge message.
Complete [PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md), including the mandatory
**Known Gaps** section. UI changes require desktop **and** mobile screenshots plus the
[UX Definition of Done](./docs/design/UX_DEFINITION_OF_DONE.md) checklist.

Merge is **squash-only**, after green CI and an approving review. Sensitive areas (auth, tenancy,
billing, migrations, connectors, security, infra) require a code-owner review.

---

## 5. Building a Feature

Follow [prompts/BUILD_PROMPT.md](./prompts/BUILD_PROMPT.md) — the master delivery prompt for humans
and AI agents alike. Two requirements in it are blocking, not advisory:

- **Interface quality** — every state covered, WCAG AA, responsive, within performance budget
  ([UX Definition of Done](./docs/design/UX_DEFINITION_OF_DONE.md))
- **Functional completeness** — real data end to end, no stubs or mocks outside tests

You are free to use any library that makes the product materially better. Library-level choices need
only a line of justification in the PR; layer-level changes (framework, database, queue, auth model)
require an accepted ADR first.

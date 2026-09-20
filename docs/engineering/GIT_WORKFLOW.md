# Git, Branching, Protection & Pull Request Law

This is the canonical source for how code enters `main`. It is binding on humans and AI agents alike.

Three rules summarise everything below:

1. **Never commit to `main`.** Work happens on a branch.
2. **Never commit a secret.** The pre-commit gate enforces it; rotate anything that slips.
3. **Never merge without a pull request.** Including solo work and one-line fixes.

---

## 1. Branch Strategy

Trunk-oriented. `main` is the single source of truth and must always be deployable.
No long-lived `develop`, `staging`, or environment branches — environments are deployed _from_ `main`
at a tagged commit.

### 1.1 Naming

```
<type>/<scope>-<short-slug>
```

Lowercase, hyphen-separated, no spaces, ≤ 60 characters. The slug describes the _change_, not the ticket.

| Type       | Use for                                | Example                                   |
| ---------- | -------------------------------------- | ----------------------------------------- |
| `feat`     | New user or system capability          | `feat/jobs-match-explanation`             |
| `fix`      | Bug fix                                | `fix/auth-session-rotation`               |
| `refactor` | Restructuring without behaviour change | `refactor/applications-submission-policy` |
| `perf`     | Performance work                       | `perf/jobs-batch-requirement-lookup`      |
| `test`     | Tests only                             | `test/tenancy-cross-workspace-isolation`  |
| `docs`     | Documentation only                     | `docs/architecture-workflow-boundaries`   |
| `build`    | Build system, dependencies             | `build/monorepo-turbo-cache`              |
| `ci`       | Pipelines and automation               | `ci/security-gitleaks-scan`               |
| `chore`    | Maintenance                            | `chore/repo-editorconfig`                 |
| `security` | Hardening or patching                  | `security/rag-tenant-filter`              |
| `hotfix`   | Urgent production fix                  | `hotfix/billing-webhook-retry`            |

`release/*` is reserved for future use and currently unused.

Branch names are validated by the pre-commit hook and by CI on every pull request.

### 1.2 Lifecycle

```bash
git switch main
git pull --ff-only origin main          # always branch from fresh main
git switch -c feat/jobs-match-explanation
# ... work, commit at verified checkpoints ...
git fetch origin && git rebase origin/main   # rebase before opening the PR
git push -u origin feat/jobs-match-explanation
gh pr create --fill
```

**Scope:** one branch = one coherent change. If you discover an unrelated problem, branch again —
do not smuggle it in. Keep branches short-lived; a branch older than a few days should be rebased or split.

**Rebase, don't merge, while the branch is private.** Once someone else has pulled your branch, stop
rebasing and merge `main` in instead. Never force-push a branch another person is working on.

**After merge:** the branch is deleted automatically. Delete your local copy with `git branch -d`.

---

## 2. Commit Standards

[Conventional Commits](https://www.conventionalcommits.org/), enforced by commitlint on `commit-msg`.

```
type(scope): imperative summary

Optional body explaining WHY the change was made, wrapped at 100 columns.
Reference the problem, the alternatives considered, and the consequence.

Refs: #123
```

**Types:** `feat` `fix` `refactor` `perf` `test` `docs` `build` `ci` `chore` `revert` `security`

**Scope:** the bounded context or package — `auth`, `tenancy`, `jobs`, `applications`, `rag`, `ui`,
`contracts`, `web`, `api`, `infra`. Optional but strongly preferred.

**Subject:** imperative mood ("add", not "added" or "adds"), lowercase, no trailing period, ≤ 72 chars.

**Breaking changes:** append `!` after the scope and add a `BREAKING CHANGE:` footer explaining the
migration path.

```
feat(auth)!: require workspace membership for all session tokens

BREAKING CHANGE: existing tokens without a workspace claim are rejected.
Clients must re-authenticate. Migration: docs/security/AUTH.md#token-v2
```

### 2.1 Commit size

Atomic. Each commit should be independently reviewable and leave the tree in a working state.

Bad: `feat(applications): finished application system`

Good:

```
feat(applications): add application aggregate
feat(applications): add preparation workflow
test(applications): cover preparation state transitions
docs(workflows): document application lifecycle
```

Commit at verified checkpoints — after lint, typecheck, and tests pass — not after every saved file.

---

## 3. Pre-Commit Protection

**Purpose:** ensure no credential, key, or sensitive artefact ever enters history, and that broken or
unformatted code never becomes a commit.

Activated by `pnpm install` (husky). Runs automatically on `git commit`.

### 3.1 What runs on `git commit`

| Gate                | Tool                           | Blocks                                                                                                                                                                                                                                                |
| ------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Branch guard        | `scripts/pre-commit-guard.mjs` | Committing directly to `main`                                                                                                                                                                                                                         |
| Sensitive filenames | `scripts/pre-commit-guard.mjs` | `.env*` (except `.env.example`), `*.pem`, `*.key`, `*.ppk`, `*.p12`, `*.pfx`, `*.jks`, `*.keystore`, `id_rsa*`, `id_ed25519*`, `credentials.json`, `serviceAccount*.json`, `*.kubeconfig`, `.npmrc`/`.pypirc` containing tokens, `*.sqlite`, `*.dump` |
| Secret content      | `secretlint`                   | AWS keys, GCP/Azure credentials, private key blocks, JWTs, Slack/GitHub/Stripe/OpenAI/Anthropic tokens, basic-auth and database connection strings, generic high-entropy assignments                                                                  |
| Large files         | `scripts/pre-commit-guard.mjs` | Staged files > 2 MB                                                                                                                                                                                                                                   |
| Debug residue       | `scripts/pre-commit-guard.mjs` | `console.log`, `debugger`, `.only(` in staged `.ts`/`.tsx`/`.js` outside tests                                                                                                                                                                        |
| Formatting          | `lint-staged` → prettier       | Unformatted staged files (auto-fixed and re-staged)                                                                                                                                                                                                   |
| Linting             | `lint-staged` → eslint         | Lint errors in staged `apps/web` TypeScript (auto-fixed where possible, `--max-warnings=0`)                                                                                                                                                           |

On `commit-msg`: commitlint validates the Conventional Commits shape.

> **Coverage limit:** ESLint currently runs only on `apps/web`, which is the only workspace with a
> config. `packages/*` are formatted and typechecked but not linted. Extracting a shared
> `packages/eslint-config` is tracked as `TD-002` in [`.ai/TODO.md`](../../.ai/TODO.md).

### 3.2 What runs in CI

The local hook is a fast first line of defence. CI is the authority:

- **gitleaks** scans the **full repository history**, not just the diff — a local bypass is caught here.
- `pnpm audit` for vulnerable dependencies.
- Branch-name and PR-title validation.
- Format, lint, typecheck, test, build.

### 3.3 Bypassing

`git commit --no-verify` is **prohibited**. If a gate produces a false positive:

1. Do not work around it locally.
2. Add a scoped allow rule to `.gitleaks.toml` or `.secretlintrc.json`, with a comment explaining why.
3. Ship that rule change as its own reviewed PR.

Adding a broad `allowlist` to silence a scanner is treated as a security incident in review.

### 3.4 If a secret reaches a commit

Deleting it in a follow-up commit **does not remove it** — it remains in history and in every clone.

1. **Rotate the credential immediately.** Assume it is compromised. This is the only step that
   actually protects you, and it comes first.
2. Notify the security owner per [`SECURITY.md`](../../SECURITY.md).
3. If the commit is unpushed: `git reset --soft HEAD~1`, remove the secret, recommit.
4. If pushed: purge history with `git filter-repo`, coordinate the force-push with everyone who has a
   clone, and invalidate any caches or forks. Do not attempt this unilaterally.
5. Record the incident per [`docs/security/INCIDENT_RESPONSE.md`](../security/INCIDENT_RESPONSE.md).

Secret handling and storage policy: [`docs/security/SECRETS.md`](../security/SECRETS.md).

### 3.5 Manual verification

```bash
pnpm verify:secrets     # scan the working tree for secrets and sensitive files
pnpm verify             # format + lint + typecheck + test + secret scan
```

Run `pnpm verify` before opening any pull request.

---

## 4. Pull Requests

**Every change reaches `main` through a pull request.** No direct pushes, no exceptions —
not for hotfixes, not for docs, not for solo work. The PR is the audit trail and the review record.

### 4.1 Before opening

- [ ] `pnpm verify` passes locally
- [ ] Branch rebased on current `main`
- [ ] Self-reviewed the full diff — would you approve this from someone else?
- [ ] `.ai/CURRENT_STATE.md` and `.ai/TODO.md` updated
- [ ] Canonical docs updated; ADR written if an architectural precedent changed

### 4.2 The PR itself

- **Title:** Conventional Commits format — it becomes the squash-merge commit message.
- **Body:** complete [`PULL_REQUEST_TEMPLATE.md`](../../.github/PULL_REQUEST_TEMPLATE.md). Delete
  sections that genuinely do not apply; never leave boxes unticked-but-claimed.
- **Size:** aim under ~400 changed lines. Split larger work into stacked PRs.
- **UI changes:** attach desktop **and** mobile screenshots. Before/after for redesigns. State which
  widths and which accessibility checks you verified.
- **Known Gaps:** state explicitly what is incomplete or deferred, and where it is tracked.
- **Draft PRs** are encouraged for early feedback. Mark ready only when §4.1 holds.

### 4.3 Review requirements

| Area touched                              | Requirement                                                  |
| ----------------------------------------- | ------------------------------------------------------------ |
| Everything                                | At least one approving review; all CI checks green           |
| Authentication, authorization, sessions   | Code-owner review — security                                 |
| Tenant or workspace isolation             | Code-owner review — security; tenant-isolation test required |
| Database migrations                       | Code-owner review — data; rollback path documented           |
| Billing, entitlements, metering           | Code-owner review                                            |
| Connectors and external submission        | Code-owner review; provider terms confirmed                  |
| Infrastructure, CI, secrets configuration | Code-owner review — devops                                   |
| AI prompts, tools, retrieval              | Evaluation results included in the PR                        |

Ownership is defined in [`CODEOWNERS`](../../CODEOWNERS).

Reviewers classify findings by severity — `BLOCKER`, `HIGH`, `MEDIUM`, `LOW`, `NIT` — per
[`.skills/review/SKILL.md`](../../.skills/review/SKILL.md). `BLOCKER` and `HIGH` must be resolved
before merge; `NIT` never blocks.

Stale reviews are dismissed on new commits. Resolve conversations rather than deleting them.

---

## 5. Merging

**Squash merge only.** `main` keeps one clean, revertible commit per change, with the PR number appended.

Requirements, all mandatory:

- All required CI checks green — never merge a red or skipped required check
- Required approvals granted; all `BLOCKER`/`HIGH` comments resolved
- Branch up to date with `main`
- Branch deleted on merge

Merge commits and rebase-merges into `main` are disabled. Do not merge your own PR without an approval.

### 5.1 Hotfixes

Urgency changes the speed of review, never its existence.

```bash
git switch main && git pull --ff-only
git switch -c hotfix/billing-webhook-retry
# minimal fix + regression test
gh pr create --fill --label "priority:p0"
```

Smallest possible diff, a regression test, expedited review, squash merge, tag, deploy.
Write the postmortem afterwards — never skip the PR to save minutes.

### 5.2 Reverting

Prefer `git revert` over force-pushing `main`. Revert first to restore service, diagnose second.
A revert is a normal PR: `revert: <original subject>`, referencing the original PR.

---

## 6. Branch Protection Configuration

Configure on GitHub for `main` (Settings → Branches → Add rule). These are the repository's
enforcement of the rules above.

**Required**

- Require a pull request before merging — 1 approval minimum
- Dismiss stale approvals when new commits are pushed
- Require review from Code Owners
- Require status checks to pass: `Lint, Typecheck, and Build`, `Secret Scan`, `Dependency Audit`, `PR Validation`
- Require branches to be up to date before merging
- Require conversation resolution before merging
- Require linear history
- Block force pushes
- Block deletions

**Recommended**

- Require signed commits
- Include administrators (rules apply to everyone, or they are not rules)
- Allow squash merging only; disable merge commits and rebase merging
- Automatically delete head branches after merge
- Enable secret scanning and push protection (Settings → Code security)

---

## 7. Releases

Semantic versioning. `0.x.y` until public stability.

Tag releases from `main` (`vMAJOR.MINOR.PATCH`), generate notes from Conventional Commits, and record
user-meaningful changes in [`CHANGELOG.md`](../../CHANGELOG.md) — not a replay of every commit.

---

## 8. Quick Reference

```bash
# start
git switch main && git pull --ff-only origin main
git switch -c feat/<scope>-<slug>

# verify before committing
pnpm verify

# commit (hooks run automatically — never use --no-verify)
git add -p
git commit -m "feat(scope): add the thing"

# open the PR
git fetch origin && git rebase origin/main
git push -u origin HEAD
gh pr create --fill

# after approval + green CI
gh pr merge --squash --delete-branch
```

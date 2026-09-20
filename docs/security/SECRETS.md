# Secrets Management

Secrets must never be stored in plaintext or checked into version control.

This document is the canonical source for **what a secret is, where it lives, and what to do when one
leaks**. The _commit-time enforcement_ that keeps them out of git is documented in
[`docs/engineering/GIT_WORKFLOW.md` §3](../engineering/GIT_WORKFLOW.md).

---

## 1. What Counts as a Secret

Anything that grants access, proves identity, or would cause harm if disclosed:

- API keys and tokens — model providers, Stripe, email, job sources, GitHub, Slack
- Database and cache connection strings containing credentials
- Private keys and certificates — TLS, mTLS, SSH, JWT signing keys, code-signing keys
- Session secrets, encryption keys, and salts
- OAuth client secrets and refresh tokens
- Cloud credentials — AWS access keys, service-account JSON, kubeconfigs
- Webhook signing secrets
- Production database dumps (they contain candidate PII — treat as secret)

**Not secrets:** public keys, client IDs, published endpoint URLs, and connection strings pointing at
`localhost`. The scanners are configured accordingly.

---

## 2. Where Secrets Live

| Environment          | Storage                                       | Injection                                                    |
| -------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| Local development    | `.env` (git-ignored), placeholder values only | Loaded by the app at startup                                 |
| CI                   | GitHub Actions encrypted secrets              | Exposed as env vars to the job that needs them               |
| Staging / Production | AWS Secrets Manager, encrypted with KMS       | Injected into the container runtime as environment variables |

Rules:

- `.env.example` is committed and documents **every** required variable with a safe placeholder. Real
  values never appear in it.
- Environment validation runs at startup and **fails fast** — a missing or malformed secret stops the
  process rather than degrading silently. See `packages/config/src/environment.ts`.
- Secrets are read once at startup into typed config. Never scatter `process.env` reads through
  business logic.
- No secret is ever passed as a command-line argument (visible in process listings) or baked into a
  container image layer.

---

## 3. Handling Rules

- **Never log a secret.** Redact at the logger level, not at each call site, so a new code path cannot
  accidentally leak one. Log the _name_ of a credential, never its value.
- **Never return a secret in an API response**, including error messages and stack traces.
- **Never send a secret to an LLM.** Prompt construction must not interpolate config values.
- Mask in the UI. Show a prefix and length (`sk-ant-••••••••3f2a`), never the full value after creation.
- Scope every credential to the least privilege it needs, per environment. Production and staging
  never share a credential.
- Client-side code receives only variables explicitly marked public (`NEXT_PUBLIC_*`). Assume anything
  reaching the browser is published.

---

## 4. Rotation

| Trigger            | Action                                                   |
| ------------------ | -------------------------------------------------------- |
| Scheduled          | Rotate at least every 90 days                            |
| Personnel change   | Rotate anything the departing person could have accessed |
| Suspected exposure | Rotate immediately — do not wait for confirmation        |
| Confirmed leak     | Rotate first, investigate second (§5)                    |

Rotation must be possible without downtime: support two valid credentials during the overlap window,
then retire the old one.

---

## 5. Leaked Secret Response

**A secret committed to git is compromised the moment it is pushed.** Deleting it in a later commit
does not remove it — it remains in history, in every clone, in every fork, and in CI caches.

### Step 1 — Rotate. Immediately.

This is the only step that actually protects you, and it comes before everything else. Invalidate the
credential at its source (provider console, AWS, database). Do not wait for the history cleanup, do not
wait for a meeting, do not wait to confirm whether anyone saw it.

### Step 2 — Report

Notify the security owner per [`SECURITY.md`](../../SECURITY.md). Do not discuss the specifics in a
public issue, a public PR comment, or any channel the leak itself might have reached.

### Step 3 — Contain

**If the commit is local and unpushed:**

```bash
git reset --soft HEAD~1     # keep changes staged
# remove the secret from the file
git commit
```

**If the commit has been pushed:** the history must be rewritten. This is disruptive and is
**never done unilaterally** — coordinate with everyone holding a clone.

```bash
# Requires git-filter-repo (https://github.com/newren/git-filter-repo)
git filter-repo --replace-text <(echo 'THE_LEAKED_VALUE==>REMOVED')
git push --force-with-lease --all
git push --force-with-lease --tags
```

Then:

- Every collaborator re-clones. A stale clone will reintroduce the secret on its next push.
- Delete or re-create forks — `filter-repo` does not reach them.
- Purge CI caches and any build artifacts that captured the value.
- Ask GitHub Support to expire cached views of the affected commits if the repository is public.

### Step 4 — Assess

Determine what the credential could reach, review access logs for the exposure window, and confirm
whether any tenant data was accessible. Tenant data exposure escalates to
[`INCIDENT_RESPONSE.md`](./INCIDENT_RESPONSE.md).

### Step 5 — Record and Fix the Gap

Write up what leaked, how long it was exposed, what the blast radius was, and — most importantly —
**why the pre-commit gate did not catch it**. Add the missing detection rule to `.gitleaks.toml` or
`.secretlintrc.json` so the same class of secret cannot pass again.

---

## 6. Verification

```bash
pnpm verify:secrets   # scan the working tree for secrets and sensitive files
```

CI runs gitleaks across **full repository history** on every pull request and push to `main`, plus a
weekly scheduled scan. Enable GitHub's native secret scanning and **push protection** on the
repository as an additional independent layer.

Weakening a scanner rule is a security-relevant change: it requires its own pull request, an inline
comment explaining why the pattern is safe, and a code-owner review.

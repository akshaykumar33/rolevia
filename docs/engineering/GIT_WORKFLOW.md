# Git & Branching Strategy

Rolevia follows a disciplined trunk-oriented development strategy.

---

## 1. Branch Strategy
* `main`: Always deployable single source of truth. Direct pushes to `main` are protected.
* `feature/<name>`: New capabilities.
* `fix/<name>`: Bug fixes.
* `docs/<name>`: Documentation updates.
* `chore/<name>`: Build, CI, or dependency upgrades.

---

## 2. Commit Standards
Conventional Commits format: `type(scope): imperative summary`.
Keep commits atomic and verified against lint and typecheck before committing.

---

## 3. Pull Request Requirements
* Every PR requires clean CI checks (format, lint, typecheck, test, build).
* Sensitive subsystems (auth, tenancy, billing, security) require designated code owner reviews.

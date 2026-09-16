# Configuration Management

All environment variables and runtime configurations must be validated at application startup using strict Zod schemas in `@rolevia/config`.

---

## 1. Fail-Fast Bootstrapping
If a required environment variable (e.g. `DATABASE_URL`, `SESSION_SECRET`) is missing or malformed, the process exits immediately with a descriptive startup error code. Never allow services to boot in an undefined state.

---

## 2. Configuration Hierarchy
1. System environment variables (`process.env`).
2. `.env.local` (local developer overrides, ignored by Git).
3. `.env` (baseline defaults).
4. Defaults defined within the validated Zod schema.

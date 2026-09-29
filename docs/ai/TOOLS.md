# AI Tool Execution Standards

Tools provide capabilities to agents (e.g. `query_career_vault`, `parse_jd`, `validate_claims`).

---

## Tool Invariants

- All tool parameters and outputs must be validated by Zod schemas.
- Tools inherit the caller's tenant and workspace security context.
- Tools must be deterministic and side-effect free where possible.

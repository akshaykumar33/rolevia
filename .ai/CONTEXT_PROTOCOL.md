# AI Context Protocol — Rolevia

Mandatory procedure for any AI coding agent before and after writing code.

---

## 1. Before Changing Code

1. **Read `.ai/PROJECT.md`**: Confirm understanding of product boundaries and truthfulness invariants.
2. **Read `.ai/CURRENT_STATE.md`**: Identify what currently exists and what phase the project is in.
3. **Read `.ai/ARCHITECTURE.md`**: Understand bounded contexts and dependency directions.
4. **Read `.ai/DOMAIN.md`**: Ensure correct domain vocabulary is used.
5. **Read Relevant ADRs**: Inspect `docs/adr/` for architectural precedents.
6. **Inspect Relevant Code**: Review existing implementations to match patterns.
7. **Inspect Existing Tests**: Understand current test coverage and assertion models.
8. **Inspect Dependency Relationships**: Verify no forbidden cyclic imports or cross-context leaks.
9. **Identify Security Implications**: Review tenant isolation, authorization, and data classification.
10. **Produce Implementation Plan**: Structure the plan into logical atomic tasks.

---

## 2. After Implementation

1. **Run Formatter**: `pnpm format`
2. **Run Linter**: `pnpm lint`
3. **Run Typecheck**: `pnpm typecheck`
4. **Run Unit Tests**: `pnpm test`
5. **Run Relevant Integration Tests**: Verify cross-module interactions.
6. **Run Relevant E2E Tests**: Verify critical user flows.
7. **Inspect Git Diff**: Review changes to ensure no extraneous files or secrets were modified.
8. **Update Documentation**: Maintain documentation integrity.
9. **Update `.ai/CURRENT_STATE.md`**: Reflect new capabilities.
10. **Update `.ai/TODO.md`**: Check off completed tasks.
11. **Propose Conventional Commit**: Generate conventional commit message following standard.

---
name: rolevia-testing
description: >-
  Quality assurance, test strategy, Vitest/Testing Library component tests, cross-tenant isolation regression testing, automated accessibility audits, and UX Definition of Done verification. Use whenever writing tests, verifying pull requests, or validating delivery gates.
---

# Skill: Rolevia Quality Assurance & Testing Strategy

## 1. Testing Invariants & Quality Bar

In Rolevia, a feature is not complete when it compiles; it is complete when it is provably correct, accessible, multi-tenant safe, and verified against real data.

Per [`prompts/BUILD_PROMPT.md`](file:///d:/pro/Rolevia/prompts/BUILD_PROMPT.md), two gates are blocking:

1. **Interface Quality**: All applicable states covered, WCAG 2.1 AA accessible, responsive, zero CLS ([UX Definition of Done](file:///d:/pro/Rolevia/docs/design/UX_DEFINITION_OF_DONE.md)).
2. **Functional Completeness**: Real data end-to-end; no mocks or stubs in production runtime paths.

---

## 2. Test Architecture

```text
               ▲
              / \
             /E2E\             Level 4: Playwright User Flows & HITL Gates
            /-----\
           / SEC & \           Level 3: Adversarial Multi-Tenant Isolation
          /Isolation\
         /-----------\
        / Integration \        Level 2: Database RLS & Service Contract Tests
       /---------------\
      /   Unit & UI     \      Level 1: Vitest + Testing Library + Zod Validation
     /-------------------\
```

---

## 3. UI Component Testing Pattern (Vitest + React Testing Library)

Every UI component test must verify:

- Initial loading skeleton matches aria semantics.
- Error state presents plain-language message and a functioning retry callback.
- Empty state displays instructional text and primary CTA.
- Populated state renders data with semantic markup and accessible names.
- Zero accessibility violations detected via `axe-core`.

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe, toHaveNoViolations } from "jest-axe";
import { JobMatchCard } from "./JobMatchCard";

expect.extend(toHaveNoViolations);

describe("JobMatchCard", () => {
  it("renders loading skeleton with accessible status", () => {
    render(<JobMatchCard isLoading={true} />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading job details",
    );
  });

  it("renders error state with retry action", () => {
    const handleRetry = vi.fn();
    render(
      <JobMatchCard
        error={new Error("Network timeout")}
        onRetry={handleRetry}
      />,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    const retryBtn = screen.getByRole("button", { name: /retry/i });
    fireEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it("renders empty state when no job is provided", () => {
    render(<JobMatchCard job={undefined} />);
    expect(
      screen.getByText(/no matching jobs discovered/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /explore job connectors/i }),
    ).toBeInTheDocument();
  });

  it("passes axe accessibility audit in populated state", async () => {
    const mockJob = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Senior Full Stack Engineer",
      company: "Acme Corp",
      matchScore: 94,
    };
    const { container } = render(<JobMatchCard job={mockJob} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## 4. Multi-Tenant Isolation Regression Testing Pattern

Tenant isolation must be verified through automated adversarial tests attempting cross-workspace data access:

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { TenantTransactionRunner } from "./TenantTransactionRunner";

describe("Cross-Tenant Data Isolation Regression Test", () => {
  const tenantA = {
    tenantId: "tenant-a-uuid",
    workspaceId: "ws-a-uuid",
    userId: "user-a",
  };
  const tenantB = {
    tenantId: "tenant-b-uuid",
    workspaceId: "ws-b-uuid",
    userId: "user-b",
  };

  it("prevents Tenant B from reading Tenant A's documents", async () => {
    // 1. Tenant A inserts a private document
    await runner.runInTenantScope(tenantA, async (client) => {
      await client.query(
        "INSERT INTO candidate_vault_documents (id, tenant_id, workspace_id, title) VALUES ($1, $2, $3, $4)",
        ["doc-123", tenantA.tenantId, tenantA.workspaceId, "Secret Resume A"],
      );
    });

    // 2. Tenant B attempts to query the same document directly by ID
    const leakedDoc = await runner.runInTenantScope(tenantB, async (client) => {
      const res = await client.query(
        "SELECT * FROM candidate_vault_documents WHERE id = $1",
        ["doc-123"],
      );
      return res.rows[0];
    });

    // 3. RLS must guarantee zero rows returned
    expect(leakedDoc).toBeUndefined();
  });
});
```

---

## 5. Pre-Merge Delivery Gate Checklist

Before pushing or opening a PR:

- [ ] `pnpm build` compiles cleanly across all packages and apps with zero errors.
- [ ] `pnpm test` runs with 100% passing tests.
- [ ] `pnpm verify:secrets` confirms zero credentials or `.env` files staged.
- [ ] No `console.log`, `debugger`, or `.only` left in source code.
- [ ] Commit messages conform to Conventional Commits: `<type>(<scope>): <subject>`.

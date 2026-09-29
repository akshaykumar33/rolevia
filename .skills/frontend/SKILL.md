# Skill: Frontend Component Development & UI Craft

## Purpose

Author responsive, accessible, interactive, and high-performance Next.js React components using Rolevia design tokens, fulfilling all requirements of the [UX Definition of Done](file:///d:/pro/Rolevia/docs/design/UX_DEFINITION_OF_DONE.md) and integrating world-class UI craft (`taste-skill`, `ui-design`, `motion-design`, `typography`, and `design-system-architect`).

## When to Use

- Creating new UI components, interactive cockpits, layout templates, modals, or application pages in `apps/web` or `packages/ui`.
- Reviewing PRs with user-facing interface changes.

## Inputs

- Component specifications, token mappings from `@rolevia/ui`, accessibility and state requirements.

## Procedure

1. **Verify Token Architecture**: Confirm required tokens in `@rolevia/ui` before writing CSS. Never use arbitrary colors or magic number margins.
2. **Implement Complete State Machine**: Implement all 10 applicable states:
   - Initial Loading (skeleton matching exact layout geometry, CLS = 0)
   - Refetch Loading (keep stale data visible with subtle indicator)
   - Empty First Run (with instructional context and primary CTA)
   - Empty Filtered (with active filter tags and one-click clear)
   - Partial Failure (render successes with retry for failed section)
   - Error (plain-language message with retry button)
   - Permission Denied (role required and who to ask)
   - Offline / Unreachable (warning banner, gracefully block/queue writes)
   - Success (confirmation toast or checkmark)
   - Optimistic with Rollback
3. **Enforce WCAG 2.1 AA Accessibility**:
   - Full keyboard navigation (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`).
   - Explicit `:focus-visible` ring on all interactive elements.
   - Focus trap in dialogs; restore focus to trigger on close.
   - Associated labels on all inputs; inline error messages linked via `aria-describedby`.
   - Screen reader announcements for async operations via `aria-live`.
4. **Motion & Interaction Craft**:
   - Purposeful, fast micro-interactions ($\le 150\text{ ms}$).
   - Respect `prefers-reduced-motion`.
5. **Responsive & Mobile-First**:
   - Fluid typography using `clamp()`.
   - Minimum 44 × 44 px touch targets on mobile viewports (< 768px).

## Validation

- Inspect visual rendering in Light and Dark mode.
- Test full keyboard navigation without touching a mouse.
- Run automated `axe-core` accessibility audit (zero critical/serious violations).
- Run `pnpm --filter @rolevia/web lint` and `pnpm build`.

---
name: rolevia-ui
description: >-
  World-class frontend UI craft, design tokens, component state coverage (loading skeletons, empty states, error recovery), WCAG 2.1 AA accessibility, keyboard navigation, and responsive craft for Rolevia. Synthesizes taste-skill, ui-design, motion-design, typography, and design-system-architect. Use whenever authoring, reviewing, or styling UI components, pages, forms, or animations.
---

# Skill: Rolevia UI Design, Interaction Craft & Aesthetics

## 1. Design Vision & Philosophy

Rolevia is an **AI Career Operating System**. When candidates use Rolevia, they are making life-altering career decisions under real-world pressure. The user interface must feel calm, technical, fast, responsive, and deeply respectful of their focus.

We synthesize the best practices from global UI disciplines:

- **`taste-skill`**: Anti-slop design. No generic AI templates, no neon purple bubbles, no centered spinners, no un-styled default selects. Every element feels custom-engineered.
- **`ui-design`**: Curated palettes, subtle micro-borders (`border-border-subtle`, `border-border-strong`), spatial rhythm, and crystal-clear contrast.
- **`motion-design` & `creative-motion-typography`**: Purposeful, snappy micro-interactions ($\le 150\text{ ms}$), fluid variable typography, and smooth state transitions respecting `prefers-reduced-motion`.
- **`design-system-architect`**: Strict semantic design token architecture via `@rolevia/ui` and CSS custom variables.
- **`accessibility` (WCAG 2.1 AA)**: 100% keyboard operable, visible `:focus-visible` rings, ARIA live region announcements, and $\ge 44\times 44\text{ px}$ touch targets.

Every user-facing screen must satisfy the canonical [UX Definition of Done](file:///d:/pro/Rolevia/docs/design/UX_DEFINITION_OF_DONE.md).

---

## 2. Token Architecture & Theme System

All styles consume semantic tokens declared in `packages/ui/src/theme.css` and `@rolevia/ui`. Never introduce arbitrary hex codes.

### Color Matrix & Surfaces

| Token                  | Class                           | Semantic Purpose                                           |
| :--------------------- | :------------------------------ | :--------------------------------------------------------- |
| `--bg-base`            | `bg-base`                       | Deep canvas background (Light: `#f8fafc`, Dark: `#090d16`) |
| `--bg-surface`         | `bg-surface`                    | Primary panels, cards, content blocks                      |
| `--bg-surface-raised`  | `bg-surface-raised`             | Elevated interactive controls, secondary containers        |
| `--bg-surface-overlay` | `bg-surface-overlay`            | Modal dialogs, popovers, dropdown flyouts                  |
| `--border-subtle`      | `border-border-subtle`          | Structural dividers, inactive container borders            |
| `--border-strong`      | `border-border-strong`          | Active card borders, input focus rings, highlights         |
| `--text-primary`       | `text-primary`                  | High-contrast headings and primary labels                  |
| `--text-muted`         | `text-muted`                    | Sub-labels, metadata, timestamps                           |
| `--accent-primary`     | `text-accent`, `bg-accent`      | Brand focus, active tab pills, primary CTAs                |
| `--status-success`     | `text-success`, `bg-success/10` | Verified facts, completed states, high matches             |
| `--status-warning`     | `text-warning`, `bg-warning/10` | Missing skills, caution alerts, network lag                |
| `--status-danger`      | `text-danger`, `bg-danger/10`   | Verification errors, rejected mutations, timeouts          |

---

## 3. Typography & Micro-Motion Craft

### Typography

- **Primary Body/Headings**: Inter / System Sans with proportional leading and optical kerning (`tracking-tight` for headings $\ge \text{text-lg}$).
- **Data & Telemetry**: JetBrains Mono (`font-mono`) with tabular numbers (`tabular-nums`) for fact IDs, percentages, timestamps, and tokens.
- **Fluid Scaling**: Titles scale fluidly using CSS `clamp()` to eliminate awkward line breaks across devices.

### Motion Principles

- **Duration**: Fast and non-blocking ($\le 150\text{ ms}$ for hovers and toggles; $\le 250\text{ ms}$ for modals and drawers).
- **Curves**: Smooth cubic bezier (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Reduced Motion**: All animations must respect `motion-reduce:transition-none` and `motion-reduce:animate-none`.

---

## 4. The 10 Mandatory States (UX Definition of Done §1)

Every data-bearing component or page must cover all 10 states:

1. **Initial Loading**: Geometric skeleton matching exact loaded dimensions (CLS = 0). Never a centered spinner.
2. **Refetch Loading**: Preserve stale data on screen with an unobtrusive loading pip or progress indicator.
3. **Empty (First Run)**: Instructional overview + single primary CTA button to create the first record.
4. **Empty (Filtered)**: Render active filter chips with a one-click "Reset filters" button.
5. **Partial Failure**: Render whatever data loaded; isolate failed items with dedicated retry controls.
6. **Error with Recovery**: Plain-language explanation + functional retry action. Log technical stack traces internally.
7. **Permission Denied**: Plain explanation of required workspace role and administrative contact email.
8. **Offline / Unreachable**: Gracefully detect network loss; queue mutations locally without silent data loss.
9. **Success**: Clear, non-intrusive confirmation (e.g., toast or checkmark transition).
10. **Optimistic with Rollback**: Instant UI update; on remote rejection, revert state smoothly and notify screen readers.

---

## 5. Pre-Flight Interface Checklist

Before marking any UI task complete:

- [ ] Consumes 100% semantic tokens from `@rolevia/ui`. Zero hardcoded hex values.
- [ ] Verified in both Dark Mode and Light Mode.
- [ ] All 10 applicable states implemented and verified.
- [ ] Keyboard navigation operable: `Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`.
- [ ] Focus indicators visible with `:focus-visible:ring-2`.
- [ ] Dialogs trap focus on open and restore focus to trigger on close.
- [ ] Touch targets measure at least $44 \times 44\text{ px}$.
- [ ] Contrast ratio meets WCAG 2.1 AA ($4.5:1$ text, $3:1$ controls).
- [ ] Screen reader announcements configured for async results via `aria-live`.
- [ ] Zero layout shift (CLS = 0) during data loading.

# UX Definition of Done

The canonical, blocking quality bar for any user-facing change in Rolevia.

A screen that compiles, renders, and returns correct data is **not done**. This document defines done.
It is referenced by [`prompts/BUILD_PROMPT.md`](../../prompts/BUILD_PROMPT.md) §5 and by the pull
request template. Aesthetic direction lives in [`DESIGN_PRINCIPLES.md`](./DESIGN_PRINCIPLES.md); this
file is the checklist.

> **Premise:** Rolevia is an operational tool people use for hours while under stress — job hunting is
> stressful. Every unexplained wait, every dead click, every ambiguous error compounds that. Interface
> quality here is not decoration; it is the product.

---

## 1. State Coverage

Every data-bearing view ships **all** applicable states. "Happy path plus a spinner" is rejected in review.

| State                     | Requirement                                                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Loading (initial)**     | Skeleton matching the real layout's shape and dimensions. Not a centered spinner. The page must not reflow when data arrives. |
| **Loading (refetch)**     | Keep showing stale data with a subtle indicator. Never blank a populated view.                                                |
| **Empty (first run)**     | Explain what belongs here and give the primary action that fills it. Never a bare "No data."                                  |
| **Empty (filtered)**      | Distinguish from first-run. Show the active filters and offer a one-click clear.                                              |
| **Partial**               | Some data loaded, some failed — render what succeeded, mark what didn't, offer retry on that piece.                           |
| **Error**                 | Plain-language cause + a retry that genuinely retries. Log the technical detail; don't show it.                               |
| **Permission denied**     | Explain that access is restricted and who to ask. Never a raw 403 or a blank page.                                            |
| **Offline / unreachable** | Detect, inform, queue or block writes explicitly. Never silently discard input.                                               |
| **Success**               | Confirm the outcome. Where non-obvious, show what changed.                                                                    |
| **Optimistic + rollback** | If you update optimistically, handle failure visibly and restore prior state.                                                 |

**Async actions** additionally need: an immediate pending state, a disabled-and-labelled submit button
(prevent double submission), and a result that is announced to assistive technology.

---

## 2. Accessibility — WCAG 2.1 AA

Non-negotiable. Verified, not assumed.

**Keyboard**

- Every interactive element reachable and operable by keyboard alone
- Logical, DOM-order-matching tab sequence; no keyboard traps
- Visible focus indicator on every focusable element — `outline: none` requires a designed replacement
- Focus moved into dialogs/drawers on open and restored to the trigger on close
- `Esc` closes overlays; `Enter`/`Space` activate controls; arrow keys navigate composites
- Skip-to-content link on every page

**Semantics**

- Native elements first. Reach for ARIA only when no native element does the job.
- Correct roles, accessible names, and states on every custom control
- One `<h1>` per page; heading levels never skipped
- Landmarks: `header`, `nav`, `main`, `aside`, `footer`
- Async results announced via `aria-live` (`polite` for status, `assertive` for errors)

**Forms**

- Real `<label>` for every input — placeholders are not labels
- Errors associated via `aria-describedby`, shown inline, and not conveyed by colour alone
- First invalid field receives focus on failed submit
- Required fields marked in text, not only with an asterisk
- Correct `autocomplete`, `inputmode`, and `type`

**Visual**

- Text contrast ≥ 4.5:1 (≥ 3:1 for large text); UI boundaries and focus rings ≥ 3:1
- Usable at 200% zoom and at 320px width without loss of function
- Never colour alone to convey meaning — pair with icon, text, or pattern
- `prefers-reduced-motion` and `prefers-contrast` respected

**Verification:** keyboard-only pass · axe DevTools with zero violations · one screen-reader pass
(NVDA or VoiceOver) on new interactive surfaces.

---

## 3. Responsiveness

Verify at **360 · 768 · 1024 · 1440 · 1920**.

Mobile is a distinct design, not a narrowed desktop:

- Data tables → cards, stacked rows, or a detail drawer. Never a horizontally scrolling page.
- Sidebar navigation → bottom navigation or a sheet
- Multi-column layouts → single column in a deliberate priority order
- Side-by-side editors → tabbed or sequential panes
- Touch targets ≥ 44×44px with ≥ 8px separation
- Safe-area insets respected on notched devices
- No hover-only affordances — every hover interaction needs a touch equivalent
- Modals become full-screen sheets below `md`

**Never:** horizontal page scroll · content clipped off-viewport · fixed elements covering inputs when
the on-screen keyboard opens.

---

## 4. Performance

Budgets measured on a mid-tier device over throttled 4G:

| Metric                      | Budget  |
| --------------------------- | ------- |
| LCP                         | < 2.5s  |
| INP                         | < 200ms |
| CLS                         | < 0.1   |
| TTFB                        | < 600ms |
| Feedback on any user action | < 100ms |

**Rules**

- Every action produces visible feedback within 100ms — optimistic update, skeleton, or progress. No dead clicks.
- Lists beyond ~200 rows are virtualized
- Images have explicit dimensions, modern formats, and lazy loading below the fold
- Route-level code splitting; heavy libraries (editors, charts, PDF) dynamically imported
- Debounce search input (~300ms); cancel superseded in-flight requests
- No layout shift from late-arriving content — reserve space
- Server state cached and deduplicated via TanStack Query, not refetched per component

---

## 5. Motion

Motion explains change. It never performs.

- Duration 150–250ms; `ease-out` entering, `ease-in` leaving
- Animate `transform` and `opacity` only — never `width`, `height`, `top`, or `left`
- Purposes allowed: state transitions, spatial relationships, drawing attention to a change the user
  caused, masking an unavoidable wait
- **Never** animate a workflow the user repeats dozens of times a day
- `prefers-reduced-motion: reduce` disables transforms and parallax, keeps essential opacity cues
- No autoplaying, looping, or decorative animation in operational views

---

## 6. Content

Copy is interface. It is reviewed like code.

- Use the canonical vocabulary from [`.ai/DOMAIN.md`](../../.ai/DOMAIN.md) — in code _and_ on screen
- Sentence case for headings, labels, and buttons
- Buttons name the action: "Save changes", "Generate cover letter" — not "OK" or "Submit"
- Errors state what happened and what to do next
  - Reject: _"Error: request failed."_
  - Accept: _"We couldn't reach the job source. Retrying in 5s — or retry now."_
- Empty states teach the next action
- Numbers, dates, and currency localized and formatted consistently
- Destructive confirmations name the object and the consequence: _"Delete 3 resume versions? This can't be undone."_
- **Never** expose stack traces, internal IDs, raw enum values, model names, or vendor names to end users

---

## 7. Visual Consistency

- **Semantic design tokens only.** No hardcoded hex, rgb, px spacing, or font sizes.
  See [`TOKENS.md`](./TOKENS.md), [`COLOR.md`](./COLOR.md), [`SPACING.md`](./SPACING.md).
- Light, dark, and system themes all verified — including focus rings, borders, shadows, and charts
- Spacing from the scale; optical alignment checked
- Typography roles from [`TYPOGRAPHY.md`](./TYPOGRAPHY.md). No marketing-scale type inside dashboards.
- Reuse `packages/ui` primitives. If one doesn't fit, extend it there — don't fork it locally.
- Consistent iconography: one set, one weight, one optical size
- Density suits the task: dense for data views, comfortable for reading and forms

---

## 8. Trust & AI Surfaces

Rolevia generates material that carries a candidate's name. The interface must never blur what is true.

- **Provenance is visible.** Distinguish _verified_ · _extracted from a document_ · _AI-inferred_.
- Generated claims link back to their supporting evidence
- Nothing presents a fabricated qualification, however plausible — this is the product's core invariant
- AI-generated content is labelled before the user can send or submit it
- Consequential actions — submit an application, send an email, delete data, change billing — require
  explicit human confirmation. The UI never implies the system acted on its own authority.
- Automation is interruptible: a visible, reachable stop control
- Confidence is shown honestly — never a fake precision figure

---

## 9. Review Checklist

Paste into the PR for any UI change:

```markdown
### UX Definition of Done

- [ ] All applicable states: loading (skeleton) / empty-first-run / empty-filtered / partial / error+retry / denied / success
- [ ] Keyboard-only pass: reachable, visible focus, no traps, focus restored
- [ ] axe DevTools: zero violations
- [ ] Screen-reader pass on new interactive surfaces
- [ ] Contrast AA verified in light and dark
- [ ] Verified at 360 / 768 / 1024 / 1440 / 1920
- [ ] Touch targets >= 44px; no hover-only affordances
- [ ] LCP / INP / CLS within budget; feedback under 100ms on every action
- [ ] Motion purposeful; prefers-reduced-motion honoured
- [ ] Copy reviewed; errors actionable; no internals leaked
- [ ] Design tokens only; light + dark verified
- [ ] AI provenance and confirmations correct (if applicable)
- [ ] Screenshots attached: desktop + mobile
```

---

## 10. Rejected on Sight

A centered spinner where a skeleton belongs · "No data" as an empty state · a button that does nothing ·
an unhandled error path · `outline: none` without a replacement · a custom control a native element
would have made accessible · hardcoded colours · a table that scrolls the page horizontally on mobile ·
a dead click with no feedback · animation on a repeated workflow · a raw error code shown to a user ·
untested dark mode · AI-generated content presented as verified fact

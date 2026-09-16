# Skill: Frontend Component Development

## Purpose
Guide the authoring of responsive, accessible, and high-performance Next.js React components using Rolevia design tokens.

## When to use
* Creating new UI components, layout templates, or application pages.

## Inputs
* Component specifications, token mappings, accessibility requirements.

## Procedure
1. Verify required tokens in `packages/ui` before writing CSS.
2. Build component using semantic HTML primitives and Tailwind token classes.
3. Add ARIA labels, focus states, and keyboard navigation (`Tab`, `Enter`, `Escape`).
4. Implement distinct visual states: default, hover, active, loading, empty, error.
5. Verify responsiveness across mobile (< 768px) and desktop breakpoints.

## Validation
* Inspect visual rendering in light and dark mode. Test full keyboard navigation.

## Common mistakes
* Hardcoding arbitrary colors instead of semantic tokens.
* Missing loading or empty states.

## Security considerations
* Sanitize any rendered user HTML using DOMPurify.

## Output expectations
* Accessible component exported from `@rolevia/ui` or integrated into `apps/web`.

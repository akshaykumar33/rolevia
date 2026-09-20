# Motion & Micro-Animations

Motion in Rolevia is subtle, functional, and respects accessibility preferences.

---

## Guidelines

- **Duration**: 100ms to 200ms for hover states and modal transitions.
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out).
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by replacing translations with immediate opacity transitions.

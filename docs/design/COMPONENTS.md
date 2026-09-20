# UI Component System

Defines primitive and domain-specific UI component patterns.

---

## Component Taxonomy

1. **Primitives**: `Button`, `Input`, `Textarea`, `Select`, `Dialog`, `Drawer`, `Badge`, `Card`, `Tooltip`.
2. **Domain Components**:
   - `JobCard`: Displays title, company, match score badge, and quick action.
   - `MatchExplanation`: Expandable requirement breakdown showing evidence citations.
   - `SkillEvidence`: Interactive chip linking a skill directly to the source resume bullet.
   - `VerificationBadge`: Clear indicator (`CONFIRMED` vs `INFERRED`).
   - `AutomationStatus`: Real-time state of background connector and sync rules.

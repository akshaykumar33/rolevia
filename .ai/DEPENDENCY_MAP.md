# Monorepo Dependency Map — Rolevia

```mermaid
graph TD
    UI["@rolevia/ui (Design Tokens & Styles)"]
    Contracts["@rolevia/contracts (Domain Schemas & Types)"]
    Config["@rolevia/config (Brand Codename & Envs)"]

    Web["apps/web (Next.js Application Shell)"]

    Contracts --> Config
    Contracts --> Web
    Config --> Web
    UI --> Web
```

---

## Dependency Invariants

- Packages may depend on `@rolevia/contracts` and `@rolevia/config`.
- `@rolevia/contracts` has zero internal workspace dependencies.
- Applications (`apps/*`) compose packages; packages never import from applications.

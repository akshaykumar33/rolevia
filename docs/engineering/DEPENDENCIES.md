# Dependency Policy

Every external package introduces maintenance, bundle weight, and security exposure.

---

## Evaluation Checklist
Before running `pnpm add <package>`, evaluate:
1. **Maintenance**: Is the project actively maintained? When was the last release?
2. **Security**: Are there known CVEs or supply chain issues (`pnpm audit`)?
3. **Bundle Size**: What is the impact on frontend bundle weight (`bundlephobia`)?
4. **License**: Is the license compatible with commercial distribution (e.g. MIT, Apache 2.0, BSD)?
5. **Necessity**: Can the feature be cleanly implemented using modern Node/Browser APIs or existing libraries?

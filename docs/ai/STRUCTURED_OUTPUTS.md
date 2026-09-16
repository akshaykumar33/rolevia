# Structured Outputs & JSON Schema Enforcement

Rolevia requires deterministic structured outputs for all machine-consumed AI operations.

---

## 1. Zod Schema Enforcement
Every structured AI call requires a corresponding Zod schema:
```typescript
export const JobRequirementSchema = z.object({
  category: z.enum(['TECHNICAL_SKILL', 'EXPERIENCE_YEARS', 'EDUCATION', 'SOFT_SKILL']),
  requirementText: z.string().min(1),
  isMandatory: z.boolean(),
  weight: z.number().min(0).max(1),
});
```

---

## 2. Validation & Repair Loop
When model output fails JSON parsing or Zod schema validation:
1. Attempt automatic JSON repair.
2. If invalid, trigger one repair call supplying the exact validation error message back to the model.
3. If repair fails, abort operation with `AI_ERROR` and log telemetry. Do not proceed with corrupt data.

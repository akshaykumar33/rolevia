# Prompt Management & Versioning

Prompts are code artifacts subject to code review, version control, and regression testing.

---

## 1. Directory & Storage Standard

All production prompt templates live in versioned files under `packages/ai-prompts/` or dedicated domain folders. Raw prompts must NEVER be hardcoded as ad-hoc strings in application controllers.

---

## 2. Prompt Header Contract

Every prompt includes metadata:

```markdown
---
prompt_id: resume_bullet_tailoring
version: 1.2.0
author: ai-engineering
task: Phase 05 Application Studio
grounding_required: true
max_tokens: 1500
temperature: 0.2
---
```

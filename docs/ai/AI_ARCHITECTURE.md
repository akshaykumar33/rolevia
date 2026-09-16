# AI Platform Architecture

Rolevia's AI architecture is designed for reliability, factual grounding, cost control, and provider portability.

---

## 1. Architectural Layers
1. **Application Layer**: Business workflows (tailoring, matching, mock interviews).
2. **AI Platform Layer**:
   * Model router & provider adapters.
   * Prompt management & versioning.
   * Structured output schemas (Zod/JSON Schema).
   * Context Engine & RAG retrieval.
   * Security guardrails & Prompt injection filters.
   * Token cost telemetry and accounting.
3. **External Model APIs**: OpenAI, Anthropic, or local open-weights endpoints.

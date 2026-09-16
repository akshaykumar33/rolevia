# Retrieval-Augmented Generation (RAG) Architecture

Rolevia's RAG pipeline powers factual resume tailoring and interview intelligence.

---

## 1. RAG Invariants
* **Tenant Isolation**: Queries enforce strict `(tenant_id, workspace_id)` filters.
* **Grounding Citation**: Tailored resume bullets must reference the `chunkId` of the source achievement.
* **Truthfulness Guard**: If the candidate vault lacks evidence for a required qualification, the system MUST state the gap rather than inferring or inventing experience.

# Agent Operating Guidelines — Rolevia

Guidance for AI coding systems operating in this repository.

---

## 1. Principles

- Maintain architectural integrity: do not take shortcuts that cross bounded context boundaries.
- Always update durable memory: when a feature or refactoring completes, update `.ai/CURRENT_STATE.md` and `.ai/TODO.md`.
- Respect role separation: check `.agents/` for role-specific expectations before beginning work.
- Keep instructions compatible across Codex, Claude Code, Gemini, Cursor, and VS Code agents.

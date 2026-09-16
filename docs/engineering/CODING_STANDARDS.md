# Coding Standards

We enforce modern, strict engineering standards across all TypeScript and polyglot components.

---

## 1. TypeScript Rules
* **Strict Mode Enabled**: `noImplicitAny: true`, `strictNullChecks: true`, `exactOptionalPropertyTypes: true`.
* **No `any`**: Use `unknown` and perform schema validation with Zod or type narrowing guards.
* **Explicit Return Types**: All exported functions, class methods, and API handlers must declare explicit return types.
* **Immutability by Default**: Use `readonly` arrays and properties where mutation is not required.
* **Async/Await**: Never use raw `.then()` / `.catch()` chains. Always use structured `async`/`await` with proper try/catch blocks.

---

## 2. Code Organization & Modular Boundaries
* **Separation of Concerns**: Controllers only handle HTTP translation and validation. Domain logic lives in domain services and aggregates. Persistence logic lives in repositories.
* **No Side Effects in Imports**: Module imports must never execute network I/O, connect to databases, or mutate global variables.
* **Clean Code**: Meaningful descriptive variable names, concise methods, and self-documenting code. Do not write misleading comments.

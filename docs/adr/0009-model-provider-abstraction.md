# ADR-0009: Pluggable AI Model Provider Interface

## Status
ACCEPTED

## Date
2026-09-16

## Context
AI model APIs evolve rapidly. New providers offer superior cost, latency, context windows, or reasoning performance. Direct dependence on proprietary SDKs (e.g. OpenAI or Anthropic directly in business logic) causes vendor lock-in.

## Decision
Define domain abstractions (`LLMProvider`, `EmbeddingProvider`) in the application layer. Concrete provider adapters translate domain requests to external APIs with uniform token telemetry and cost accounting.

## Alternatives Evaluated
* **Direct Vendor SDK coupling**: Faster initial prototype, but high refactoring cost when switching providers.
* **LangChain / Heavy Frameworks**: Excessive abstraction layers, difficult debugging, breaking upstream changes.

## Consequences
* **Positive**: Rapid provider swapping, multi-model routing, isolated token auditing.
* **Negative**: Must maintain thin adapter shims internally.

# ADR-0007: Domain Event Envelopes and Asynchronous Messaging

## Status

ACCEPTED

## Date

2026-09-16

## Context

Subsystems (e.g. Analytics, Job Engine, Timeline updates) must react to state changes without hard synchronous coupling.

## Decision

Adopt standardized domain event envelopes (`<domain>.<entity>.<action>`) dispatched via asynchronous message queues (starting with AWS SQS / EventBridge).

## Alternatives Evaluated

- **Kafka**: Excellent scale, but unnecessary operational complexity for Phase 0–5.
- **Direct Synchronous HTTP**: Creates tight coupling, cascading failures, and high latency.

## Consequences

- **Positive**: Decoupled bounded contexts, auditable event streams, independent service scaling.
- **Negative**: Eventual consistency must be handled in client interfaces.

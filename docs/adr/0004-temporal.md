# ADR-0004: Workflow Engine for Long-Running Operations (Temporal)

## Status

ACCEPTED

## Date

2026-09-16

## Context

Application tailoring, multi-step job board interactions, external email tracking, and document ingestion involve multi-minute asynchronous processes, rate-limited external calls, and human approval gates. Ad-hoc queue implementations (BullMQ/Celery) lead to fragile state machines and complex failure recovery.

## Decision

Adopt **Temporal** as the canonical durable workflow orchestration engine.

## Alternatives Evaluated

- **BullMQ / Custom Redis State Machines**: Simple to start, but lack durable execution history, automatic compensation, and built-in human signal timers.
- **AWS Step Functions**: Highly reliable but creates deep cloud vendor lock-in and high cost at high workflow volumes.

## Consequences

- **Positive**: Durable execution state across crashes, native human-in-the-loop signal waiting, automatic retries with exponential backoff.
- **Negative**: Requires understanding Temporal determinism constraints and operating worker processes.

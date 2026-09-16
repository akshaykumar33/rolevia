# Skill: Observability & Telemetry

## Purpose
Instrument application code with structured logging, distributed tracing, and Prometheus/OpenTelemetry metrics.

## When to use
* Instrumenting new API endpoints, workflow steps, or AI model calls.

## Inputs
* Operation name, correlation context, telemetry destination.

## Procedure
1. Ensure request carries `requestId` and `correlationId`.
2. Emit single-line JSON log entry with standard attributes.
3. Record duration histograms for database queries and external HTTP requests.
4. Record model token consumption and calculated cost for every AI generation.

## Validation
* Inspect emitted JSON log lines for conformity with schema in `docs/engineering/LOGGING.md`.

## Common mistakes
* Logging unredacted headers containing Bearer tokens.
* Using unstructured text strings in production logs.

## Security considerations
* Verify that candidate PII and confidential resume texts are never exported to external observability collectors.

## Output expectations
* Full distributed trace coverage and accurate cost accounting telemetry.

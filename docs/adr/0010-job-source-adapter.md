# ADR-0010: Job Source Adapter & Connector Capability System

## Status
ACCEPTED

## Date
2026-09-16

## Context
External job platforms differ radically in API capabilities, authentication, rate limits, and submission workflows. Some support full programmatic job discovery and submission; others only support read-only search or require web-based interactive applicant submission.

## Decision
Create the `JobSourceAdapter` interface with granular declared capabilities (`DISCOVERY`, `DETAILS`, `ASSIST`, `SUBMIT`, `STATUS`). The workflow engine checks capabilities before initiating actions.

## Alternatives Evaluated
* **Universal Scraping Bot**: Fragile, violates anti-bot terms, causes high breakage.
* **Uniform Connector Contract**: Forcing every connector to implement `SUBMIT` leads to stubbed or fake implementations.

## Consequences
* **Positive**: Explicit platform capabilities, graceful workflow fallback, compliant integration patterns.
* **Negative**: Workflows must handle capability branching.

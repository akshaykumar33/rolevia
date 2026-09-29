# Event Architecture

Rolevia uses domain events to decouple bounded contexts and maintain an auditable timeline of candidate workflows.

---

## Event Naming Standard

All events follow the canonical dot-notation standard:

```text
<domain>.<entity>.<action_past_tense>
```

### Examples

- `candidate.profile.created`
- `candidate.profile.updated`
- `candidate.document.uploaded`
- `candidate.document.parsed`
- `job.listing.discovered`
- `job.match.evaluated`
- `application.package.prepared`
- `application.submission.approved`
- `application.submission.completed`
- `interview.session.scheduled`
- `automation.policy.triggered`

---

## Event Envelope Contract

Every domain event emitted to the message bus complies with the standard envelope:

```typescript
export interface DomainEventEnvelope<T = Record<string, unknown>> {
  eventId: string; // Unique UUID v4
  eventName: string; // e.g. "application.package.prepared"
  occurredAt: string; // ISO 8601 UTC timestamp
  tenantId: string; // Owning Tenant UUID
  workspaceId: string; // Owning Workspace UUID
  actorId: string; // User or System agent initiating action
  correlationId: string; // Distributed trace correlation ID
  causationId?: string; // Triggering event ID
  payload: T; // Strongly-typed domain payload
}
```

---

## Architectural Rules

1. **Events Represent Immutable Facts**: Events describe things that have already occurred. They cannot be rejected or modified.
2. **Commands Represent Intent**: Commands (e.g. `PrepareApplicationCommand`) may fail validation or authorization.
3. **Idempotent Consumers**: All event handlers must handle duplicate message deliveries gracefully using `eventId` deduplication tracking in Redis or PostgreSQL.

import { z } from "zod";

export const DomainEventEnvelopeSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.string().regex(/^[a-z]+\.[a-z_]+\.[a-z_]+$/),
  occurredAt: z.string().datetime(),
  tenantId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  actorId: z.string().uuid(),
  correlationId: z.string(),
  causationId: z.string().optional(),
  payload: z.record(z.unknown()),
});
export type DomainEventEnvelope<T = Record<string, unknown>> = Omit<
  z.infer<typeof DomainEventEnvelopeSchema>,
  "payload"
> & {
  payload: T;
};

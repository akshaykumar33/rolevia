import { z } from "zod";

export const ApplicationStateSchema = z.enum([
  "DRAFT",
  "TAILORING",
  "AWAITING_HUMAN_APPROVAL",
  "APPROVED",
  "SUBMITTING",
  "SUBMITTED",
  "INTERVIEW_SCHEDULED",
  "REJECTED",
  "OFFER_RECEIVED",
  "WITHDRAWN",
]);
export type ApplicationState = z.infer<typeof ApplicationStateSchema>;

export const ResumeVersionSchema = z.object({
  id: z.string().uuid(),
  applicationId: z.string().uuid(),
  versionNumber: z.number().int().positive(),
  tailoredHeadline: z.string(),
  tailoredSummary: z.string(),
  tailoredBulletIds: z.array(z.string().uuid()),
  isFactualVerified: z.boolean(),
  immutableSnapshotHash: z.string(),
  createdAt: z.string().datetime(),
});
export type ResumeVersion = z.infer<typeof ResumeVersionSchema>;

export const ApplicationPackageSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  candidateId: z.string().uuid(),
  jobId: z.string().uuid(),
  currentState: ApplicationStateSchema,
  activeResumeVersionId: z.string().uuid().optional(),
  coverLetterText: z.string().optional(),
  submissionConsentGranted: z.boolean().default(false),
  submittedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type ApplicationPackage = z.infer<typeof ApplicationPackageSchema>;

import { z } from "zod";

export const PortalPlatformSchema = z.enum([
  "greenhouse",
  "lever",
  "workday",
  "linkedin",
  "ashby",
  "wellfound",
]);
export type PortalPlatform = z.infer<typeof PortalPlatformSchema>;

export const PortalSessionCredentialSchema = z.object({
  portal: PortalPlatformSchema,
  portalName: z.string(),
  sessionTokenMasked: z.string(),
  status: z.enum(["CONNECTED", "EXPIRED", "AWAITING_AUTH"]),
  candidateEmail: z.string().email(),
  lastVerifiedAt: z.string().datetime(),
});
export type PortalSessionCredential = z.infer<
  typeof PortalSessionCredentialSchema
>;

export const SeniorityLevelSchema = z.enum([
  "MID_LEVEL",
  "SENIOR",
  "STAFF",
  "PRINCIPAL",
  "ENGINEERING_LEAD",
]);
export type SeniorityLevel = z.infer<typeof SeniorityLevelSchema>;

export const AutomationPolicySchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  candidateId: z.string().uuid(),
  targetDomains: z.array(z.string()).min(1),
  targetSeniority: SeniorityLevelSchema,
  dailyApplicationCap: z.number().int().min(1).max(30).default(5),
  minMatchScore: z.number().min(75).max(100).default(90),
  remoteOnly: z.boolean().default(true),
  salaryFloorUsd: z.number().min(0).default(180000),
  requiresHumanApproval: z.boolean().default(false),
  emergencyStopActive: z.boolean().default(false),
  portalsEnabled: z.array(PortalPlatformSchema).min(1),
  updatedAt: z.string().datetime(),
});
export type AutomationPolicy = z.infer<typeof AutomationPolicySchema>;

export const AutonomousApplicationRecordSchema = z.object({
  id: z.string(),
  companyName: z.string(),
  jobTitle: z.string(),
  portal: PortalPlatformSchema,
  jobUrl: z.string().url(),
  matchScore: z.number().min(0).max(100),
  tailoredResumeRef: z.string(),
  coverLetterSnippet: z.string(),
  citedFactIds: z.array(z.string()),
  submittedAt: z.string().datetime(),
  status: z.enum(["SUBMITTED", "CONFIRMED", "HELD_FOR_REVIEW", "ABORTED"]),
  executionTraceId: z.string(),
});
export type AutonomousApplicationRecord = z.infer<
  typeof AutonomousApplicationRecordSchema
>;

export const CandidateOnboardingProfileSchema = z.object({
  apiKeyProvider: z.enum([
    "anthropic",
    "openai",
    "gemini",
    "deepseek",
    "local_mock",
  ]),
  apiKeyMasked: z.string(),
  fullName: z.string().min(2),
  email: z.string().email(),
  targetDomain: z.string(),
  targetSeniority: SeniorityLevelSchema,
  desiredRoleDescription: z.string(),
  resumeSourceText: z.string(),
  coverLetterStyle: z.enum([
    "technical_direct",
    "narrative_craft",
    "executive_impact",
  ]),
  salaryExpectationUsd: z.number().min(0),
  locationPreferences: z.string(),
  sessionKeyMasked: z.string().optional(),
  completedAt: z.string().datetime(),
});
export type CandidateOnboardingProfile = z.infer<
  typeof CandidateOnboardingProfileSchema
>;

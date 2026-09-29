import { z } from "zod";

export const VerificationStatusSchema = z.enum([
  "CONFIRMED_BY_USER",
  "EXTRACTED_FROM_DOCUMENT",
  "INFERRED_BY_AI",
  "REJECTED_BY_USER",
]);
export type VerificationStatus = z.infer<typeof VerificationStatusSchema>;

export const SkillEvidenceSchema = z.object({
  id: z.string().uuid(),
  skillName: z.string().min(1),
  category: z.string().default("TECHNICAL"),
  yearsOfExperience: z.number().min(0).optional(),
  verificationStatus: VerificationStatusSchema,
  sourceDocumentId: z.string().uuid().optional(),
  sourceSnippet: z.string().optional(),
});
export type SkillEvidence = z.infer<typeof SkillEvidenceSchema>;

export const CareerAchievementSchema = z.object({
  id: z.string().uuid(),
  experienceId: z.string().uuid(),
  bulletText: z.string().min(5),
  quantifiedMetrics: z.array(z.string()).default([]),
  skillsDemonstrated: z.array(z.string()).default([]),
  verificationStatus: VerificationStatusSchema,
});
export type CareerAchievement = z.infer<typeof CareerAchievementSchema>;

export const CandidateProfileSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  fullName: z.string().min(1),
  headline: z.string().optional(),
  primaryEmail: z.string().email(),
  location: z.string().optional(),
  skills: z.array(SkillEvidenceSchema).default([]),
  achievements: z.array(CareerAchievementSchema).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type CandidateProfile = z.infer<typeof CandidateProfileSchema>;

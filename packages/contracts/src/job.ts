import { z } from "zod";

export const JobRequirementTypeSchema = z.enum([
  "MUST_HAVE",
  "NICE_TO_HAVE",
  "EXPERIENCE_LEVEL",
  "EDUCATION",
  "CERTIFICATION",
]);
export type JobRequirementType = z.infer<typeof JobRequirementTypeSchema>;

export const JobRequirementSchema = z.object({
  id: z.string().uuid(),
  requirementText: z.string().min(1),
  type: JobRequirementTypeSchema,
  skillTags: z.array(z.string()).default([]),
  weight: z.number().min(0).max(1).default(1),
});
export type JobRequirement = z.infer<typeof JobRequirementSchema>;

export const JobListingSchema = z.object({
  id: z.string().uuid(),
  externalSource: z.string(),
  externalId: z.string(),
  companyName: z.string().min(1),
  title: z.string().min(1),
  location: z.string().optional(),
  isRemote: z.boolean().default(false),
  descriptionRaw: z.string().min(10),
  requirements: z.array(JobRequirementSchema).default([]),
  postedAt: z.string().datetime().optional(),
  discoveredAt: z.string().datetime(),
});
export type JobListing = z.infer<typeof JobListingSchema>;

export const JobMatchScoreSchema = z.object({
  jobId: z.string().uuid(),
  candidateId: z.string().uuid(),
  overallScore: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  missingRequirements: z.array(z.string()),
  positioningSummary: z.string(),
  calculatedAt: z.string().datetime(),
});
export type JobMatchScore = z.infer<typeof JobMatchScoreSchema>;

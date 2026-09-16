import { z } from 'zod';

export const FeatureFlagsSchema = z.object({
  enableAutomatedSubmissions: z.boolean().default(false),
  enableExperimentalAiMatching: z.boolean().default(false),
  enableOrganizationTenancy: z.boolean().default(false),
  enableLiveConnectors: z.boolean().default(false),
  enableMockInterviews: z.boolean().default(true),
});

export type FeatureFlags = z.infer<typeof FeatureFlagsSchema>;

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  enableAutomatedSubmissions: false,
  enableExperimentalAiMatching: false,
  enableOrganizationTenancy: false,
  enableLiveConnectors: false,
  enableMockInterviews: true,
};

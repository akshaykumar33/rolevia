import { z } from 'zod';

export const TenantTypeSchema = z.enum(['INDIVIDUAL', 'ORGANIZATION', 'SYSTEM']);
export type TenantType = z.infer<typeof TenantTypeSchema>;

export const WorkspaceRoleSchema = z.enum([
  'WORKSPACE_OWNER',
  'WORKSPACE_ADMIN',
  'WORKSPACE_MENTOR',
  'WORKSPACE_CANDIDATE',
  'WORKSPACE_VIEWER',
]);
export type WorkspaceRole = z.infer<typeof WorkspaceRoleSchema>;

export const TenantContextSchema = z.object({
  tenantId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  userId: z.string().uuid(),
  role: WorkspaceRoleSchema,
  isPlatformAdmin: z.boolean().default(false),
});
export type TenantContext = z.infer<typeof TenantContextSchema>;

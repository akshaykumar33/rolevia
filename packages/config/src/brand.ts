/**
 * Centralized Brand Configuration Abstraction
 * Enforces prompt invariant: "Use 'Rolevia' as a WORKING CODENAME.
 * Centralize branding configuration. Do NOT scatter literal product names
 * across hundreds of components."
 */
export interface BrandConfig {
  readonly codeName: string;
  readonly displayName: string;
  readonly tagline: string;
  readonly legalEntity: string;
  readonly defaultSupportEmail: string;
  readonly securityContactEmail: string;
  readonly repositoryUrl: string;
  readonly missionStatement: string;
}

export const BRAND_CONFIG: BrandConfig = {
  codeName: 'Rolevia',
  displayName: 'Rolevia',
  tagline: 'AI Career Operating System',
  legalEntity: 'Rolevia Technologies Inc.',
  defaultSupportEmail: 'support@rolevia.internal',
  securityContactEmail: 'security@rolevia.internal',
  repositoryUrl: 'https://github.com/akshaykumar33/rolevia',
  missionStatement:
    'A secure, multi-tenant AI Career Operating System that understands a candidate, maintains persistent career intelligence, discovers relevant jobs, evaluates fit, generates truthful tailored application material, assists or automates permitted application workflows, tracks outcomes, prepares candidates for interviews, and continuously improves the user\'s career strategy.',
} as const;

export function getBrandedTitle(pageTitle?: string): string {
  return pageTitle ? `${pageTitle} — ${BRAND_CONFIG.displayName}` : `${BRAND_CONFIG.displayName} — ${BRAND_CONFIG.tagline}`;
}

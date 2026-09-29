"use client";

export interface CandidateProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  headline: string;
  keySkills: string[];
  summary: string;
  targetDomain: string;
  seniority: string;
  salaryFloorUsd: number;
}

export interface CdpSessionState {
  cdpPort: number;
  cdpHost: string;
  isConnected: boolean;
  activeProfile: CandidateProfile;
  portals: {
    naukri: boolean;
    cutshort: boolean;
    linkedin: boolean;
    wellfound: boolean;
    greenhouse: boolean;
    lever: boolean;
    ashby: boolean;
  };
  dailyQuota: number;
  matchScoreFloor: number;
  remoteOnly: boolean;
  emergencyHalt: boolean;
  lastSyncAt: string | null;
}

const STORAGE_KEY = "rolevia_cdp_session_v1";

export const DEFAULT_CANDIDATE_PROFILE: CandidateProfile = {
  fullName: "Akshaykumar Patil",
  email: "akshaykumarpatil33@gmail.com",
  phone: "+91-8898790531",
  location: "Navi Mumbai, India",
  portfolioUrl: "https://portfolio-ashen-eight-55.vercel.app",
  githubUrl: "https://github.com/akshaykumar33",
  linkedinUrl: "https://linkedin.com/in/akshaykumarpatil",
  headline:
    "Senior Software Engineer (4.5 yrs) | AWS Serverless & Platform Architecture | Multi-Tenant SaaS (100K+ Users) | DynamoDB, PostgreSQL, TypeScript, Next.js, Python, Rust, Microservices, BullMQ",
  keySkills: [
    "Distributed Systems",
    "AWS Lambda",
    "DynamoDB",
    "PostgreSQL",
    "TypeScript",
    "Node.js",
    "Next.js",
    "Multi-Tenancy",
    "Microservices",
    "Redis",
    "Docker",
    "BullMQ",
    "Python",
  ],
  summary:
    "Senior Software Engineer with 4.5+ years of experience architecting distributed systems, AWS serverless & multi-tenant SaaS platforms serving 100K+ users with sub-35ms p95 latency. Proven track record in zero-downtime database migrations, event queues processing 50K+ daily jobs, and kernel-level tenant isolation.",
  targetDomain: "Distributed Systems & High-Throughput Microservices",
  seniority: "Staff",
  salaryFloorUsd: 210000,
};

export const DEFAULT_CDP_STATE: CdpSessionState = {
  cdpPort: 9222,
  cdpHost: "127.0.0.1",
  isConnected: true,
  activeProfile: DEFAULT_CANDIDATE_PROFILE,
  portals: {
    naukri: true,
    cutshort: true,
    linkedin: true,
    wellfound: true,
    greenhouse: true,
    lever: true,
    ashby: true,
  },
  dailyQuota: 5,
  matchScoreFloor: 90,
  remoteOnly: true,
  emergencyHalt: false,
  lastSyncAt: "Just now",
};

export function loadCdpSession(): CdpSessionState {
  if (typeof window === "undefined") return DEFAULT_CDP_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CDP_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_CDP_STATE,
      ...parsed,
      activeProfile: {
        ...DEFAULT_CANDIDATE_PROFILE,
        ...(parsed.activeProfile || {}),
      },
      portals: {
        ...DEFAULT_CDP_STATE.portals,
        ...(parsed.portals || {}),
      },
    };
  } catch {
    return DEFAULT_CDP_STATE;
  }
}

export function saveCdpSession(state: CdpSessionState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

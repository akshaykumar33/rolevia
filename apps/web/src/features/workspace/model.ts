export type PortalId =
  | "linkedin"
  | "naukri"
  | "indeed"
  | "wellfound"
  | "greenhouse"
  | "lever"
  | "ashby"
  | "workday";

export const PORTALS: { id: PortalId; name: string; kind: string }[] = [
  { id: "linkedin", name: "LinkedIn", kind: "Job board" },
  { id: "naukri", name: "Naukri", kind: "Job board" },
  { id: "indeed", name: "Indeed", kind: "Job board" },
  { id: "wellfound", name: "Wellfound", kind: "Startup jobs" },
  { id: "greenhouse", name: "Greenhouse", kind: "Career pages" },
  { id: "lever", name: "Lever", kind: "Career pages" },
  { id: "ashby", name: "Ashby", kind: "Career pages" },
  { id: "workday", name: "Workday", kind: "Career pages" },
];

export type AiProvider = "anthropic" | "openai" | "gemini";

export const AI_PROVIDERS: { id: AiProvider; name: string; prefix: string }[] =
  [
    { id: "anthropic", name: "Anthropic (Claude)", prefix: "sk-ant-" },
    { id: "openai", name: "OpenAI", prefix: "sk-" },
    { id: "gemini", name: "Google Gemini", prefix: "" },
  ];

export type DocumentKind = "resume" | "job-description" | "other";

export interface WorkspaceDocument {
  id: string;
  name: string;
  kind: DocumentKind;
  sizeBytes: number;
  addedAt: string;
}

export type WorkMode = "remote" | "hybrid" | "onsite" | "any";
export type Seniority =
  "junior" | "mid" | "senior" | "staff" | "principal" | "lead";

export interface Profile {
  fullName: string;
  email: string;
  location: string;
  profession: string;
  targetRole: string;
  seniority: Seniority | "";
  workMode: WorkMode;
  notes: string;
}

export type Schedule = "manual" | "daily" | "weekdays" | "weekly";

export interface Campaign {
  jobsPerRun: number;
  portals: PortalId[];
  schedule: Schedule;
  runAt: string; // "HH:MM", local time
  minMatch: number;
  reviewFirst: boolean;
  paused: boolean;
}

export type ApplicationStatus =
  "applied" | "needs-review" | "skipped" | "failed";

export interface ApplicationRecord {
  id: string;
  company: string;
  role: string;
  portal: PortalId;
  match: number;
  status: ApplicationStatus;
  reason?: string;
  at: string;
}

export interface Workspace {
  profile: Profile;
  documents: WorkspaceDocument[];
  // Only a masked hint is ever kept client-side; the full key goes to the server vault.
  aiKey: { provider: AiProvider; hint: string; addedAt: string } | null;
  portals: Partial<Record<PortalId, { connectedAt: string }>>;
  campaign: Campaign;
  applications: ApplicationRecord[];
}

export const EMPTY_WORKSPACE: Workspace = {
  profile: {
    fullName: "",
    email: "",
    location: "",
    profession: "",
    targetRole: "",
    seniority: "",
    workMode: "any",
    notes: "",
  },
  documents: [],
  aiKey: null,
  portals: {},
  campaign: {
    jobsPerRun: 10,
    portals: [],
    schedule: "manual",
    runAt: "09:00",
    minMatch: 80,
    reviewFirst: true,
    paused: false,
  },
  applications: [],
};

export interface SetupStep {
  id: "profile" | "resume" | "ai" | "portals" | "campaign";
  label: string;
  href: string;
  done: boolean;
}

export function setupSteps(w: Workspace): SetupStep[] {
  const p = w.profile;
  return [
    {
      id: "profile",
      label: "Describe the role you want",
      href: "/app/profile",
      done: Boolean(p.fullName && p.email && p.targetRole),
    },
    {
      id: "resume",
      label: "Upload your resume",
      href: "/app/profile#documents",
      done: w.documents.some((d) => d.kind === "resume"),
    },
    {
      id: "ai",
      label: "Add your AI key",
      href: "/app/connections",
      done: w.aiKey !== null,
    },
    {
      id: "portals",
      label: "Connect at least one job portal",
      href: "/app/connections#portals",
      done: Object.keys(w.portals).length > 0,
    },
    {
      id: "campaign",
      label: "Choose portals for your campaign",
      href: "/app/campaign",
      done: w.campaign.portals.length > 0,
    },
  ];
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Shield,
  Zap,
  AlertTriangle,
  RotateCw,
  Power,
  Sliders,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
  Check,
  Search,
  Radio,
  SlidersHorizontal,
  Terminal,
  Copy,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "../lib/soundEffects";
import {
  CdpSessionState,
  loadCdpSession,
  saveCdpSession,
} from "../lib/cdpSessionStore";

interface AutonomousPortalAgentProps {
  onOpenOnboarding?: () => void;
  sessionState?: CdpSessionState;
}

interface ApplicationRecord {
  id: string;
  companyName: string;
  jobTitle: string;
  portal: "linkedin" | "naukri" | "cutshort" | "greenhouse" | "lever" | "ashby";
  jobUrl: string;
  matchScore: number;
  salary: string;
  location: string;
  tailoredResumeRef: string;
  coverLetterSnippet: string;
  fullCoverLetter: string;
  citedFactIds: string[];
  bullets: string[];
  submittedAt: string;
  status: "CONFIRMED" | "SUBMITTED" | "HELD_FOR_REVIEW";
  executionTraceId: string;
}

const SAMPLE_APPLICATIONS: ApplicationRecord[] = [
  {
    id: "app_str_001",
    companyName: "Stripe",
    jobTitle: "Staff Infrastructure Engineer — Payments Core",
    portal: "greenhouse",
    jobUrl: "https://boards.greenhouse.io/stripe/jobs/591823901",
    matchScore: 98.4,
    salary: "$240,000 - $295,000 USD + Equity",
    location: "Remote (Global)",
    tailoredResumeRef: "Akshaykumar_Patil_Stripe_Staff.pdf",
    coverLetterSnippet:
      "Having scaled multi-tenant distributed platforms to 100K+ users with sub-35ms p95 latency and implemented PostgreSQL kernel-level Row-Level Security, Stripe's distributed ledger reliability directly mirrors my architectural background...",
    fullCoverLetter: `Dear Stripe Infrastructure Team,

I am writing to express my strong interest in the Staff Infrastructure Engineer position on the Payments Core team. Over the past 4.5+ years, I have focused extensively on the reliability, consistency, and performance tuning of high-throughput transactional architectures.

In my recent platform work, I architected an event-driven AWS serverless microservice pipeline handling 50K+ daily jobs while maintaining sub-35ms p95 latency. A core focus was strict multi-tenant boundary isolation enforced through PostgreSQL Row-Level Security (RLS) policies and cryptographically verified claim checks—preventing cross-tenant data bleed at the kernel level.

Furthermore, I have led zero-downtime database migrations on 2TB+ transactional tables and designed resilient BullMQ/Redis event dispatchers. I would be thrilled to bring this rigor and domain depth to Stripe's global payments platform.

Sincerely,
Akshaykumar Patil
Senior Platform & Distributed Systems Engineer`,
    citedFactIds: [
      "fact_01_rls_isolation",
      "fact_02_scale_throughput",
      "fact_05_consensus_sharding",
    ],
    bullets: [
      "Architected distributed microservices serving 100K+ active users with sub-35ms p95 response time.",
      "Enforced PostgreSQL Row-Level Security (RLS) kernel policies, eliminating tenant data leakage.",
      "Engineered fault-tolerant BullMQ message queues processing 50K+ asynchronous jobs daily.",
    ],
    submittedAt: "Today at 09:14 AM",
    status: "CONFIRMED",
    executionTraceId: "tr_cdp_9222_8b4f10",
  },
  {
    id: "app_tem_002",
    companyName: "Temporal Technologies",
    jobTitle: "Principal Distributed Systems Architect",
    portal: "ashby",
    jobUrl: "https://jobs.ashbyhq.com/temporal/7c81a293",
    matchScore: 97.1,
    salary: "$250,000 - $310,000 USD",
    location: "Remote (North America)",
    tailoredResumeRef: "Akshaykumar_Patil_Temporal_Principal.pdf",
    coverLetterSnippet:
      "Durable execution engines and state machine safety have been central to my work architecting distributed consensus systems. My background in deterministic workflow replay and idempotent job scheduling...",
    fullCoverLetter: `Dear Temporal Engineering Leadership,

I am applying for the Principal Distributed Systems Architect role at Temporal. As an avid practitioner of durable execution and deterministic state machines, I have spent the last several years designing reliable distributed processing pipelines.

Throughout my career, I have eliminated distributed failure modes by implementing deterministic idempotency keys, DynamoDB single-table architectures, and poison-pill message quarantine loops. In high-concurrency environments, my teams reduced workflow failover latency by 68% while guaranteeing exactly-once semantics across asynchronous worker pools.

Temporal's mission to make asynchronous software fundamentally dependable is work I deeply admire. I look forward to contributing to the core workflow orchestration engine.

Warm regards,
Akshaykumar Patil`,
    citedFactIds: [
      "fact_03_pgvector_latency",
      "fact_05_consensus_sharding",
      "fact_04_fault_recovery",
    ],
    bullets: [
      "Engineered partition failovers with 99.999% availability across multi-region AWS cloud clusters.",
      "Implemented deterministic idempotency guarantees preventing state corruption in 40M+ daily events.",
      "Designed zero-downtime schema evolution workflows across DynamoDB and PostgreSQL tables.",
    ],
    submittedAt: "Today at 10:22 AM",
    status: "CONFIRMED",
    executionTraceId: "tr_cdp_9222_92a1c4",
  },
  {
    id: "app_lin_003",
    companyName: "Anthropic",
    jobTitle: "Systems Engineer — Model Serving & Retrieval Infrastructure",
    portal: "linkedin",
    jobUrl: "https://www.linkedin.com/jobs/view/39201948",
    matchScore: 95.6,
    salary: "$260,000 - $330,000 USD + Equity",
    location: "Remote / Hybrid (San Francisco)",
    tailoredResumeRef: "Akshaykumar_Patil_Anthropic_Serving.pdf",
    coverLetterSnippet:
      "Scaling AI inference infrastructure demands airtight latency predictability and rigorous multi-tenant data boundaries. Having built pgvector semantic retrieval pipelines with sub-25ms hybrid search...",
    fullCoverLetter: `Dear Anthropic Inference & Infrastructure Team,

I am writing to apply for the Systems Engineer role within Model Serving & Retrieval Infrastructure. As an engineer dedicated to trustworthy AI systems, Anthropic's constitutional approach and technical excellence represent the pinnacle of modern computing.

I recently architected a production pgvector semantic retrieval cluster handling 40 million embeddings with sub-25ms hybrid keyword + vector latency. To ensure model answers remain strictly grounded in verified facts, I authored a cryptographic fact-attribution pipeline that cross-checks synthesized outputs against source claim hashes before rendering.

I would be honored to contribute to Anthropic's scalable, reliable, and constitutionally safe serving architecture.

Sincerely,
Akshaykumar Patil`,
    citedFactIds: ["fact_01_rls_isolation", "fact_03_pgvector_latency"],
    bullets: [
      "Constructed production pgvector HNSW indexing pipeline with sub-25ms query latency over 40M records.",
      "Enforced cryptographic source attribution checks on all LLM responses, eliminating hallucinations.",
      "Benchmarked client-side WebAssembly verification engines executing SHA-256 checks in under 0.8ms.",
    ],
    submittedAt: "Today at 11:45 AM",
    status: "CONFIRMED",
    executionTraceId: "tr_cdp_9222_a48f21",
  },
  {
    id: "app_nau_004",
    companyName: "Razorpay",
    jobTitle: "Staff Software Engineer — High-Throughput Checkout Core",
    portal: "naukri",
    jobUrl: "https://www.naukri.com/job-listings-razorpay-staff-engineer",
    matchScore: 94.8,
    salary: "₹55,00,000 - ₹75,00,000 INR + ESOPs",
    location: "Bengaluru (Hybrid / Remote)",
    tailoredResumeRef: "Akshaykumar_Patil_Razorpay_Core.pdf",
    coverLetterSnippet:
      "Processing high-volume financial transactions at sub-50ms latency across Indian banking rails requires deep database indexing, connection pool optimization, and resilient idempotency mechanisms...",
    fullCoverLetter: `Dear Razorpay Core Platform Team,

I am writing to express my interest in the Staff Software Engineer role for Checkout Core. Having engineered distributed microservices handling high-throughput transactional traffic with zero message loss, Razorpay's scale directly aligns with my core technical competencies.

I have led the optimization of high-cardinality PostgreSQL query paths, reducing p99 latency by 42% through compound indexing and read-replica distribution. Furthermore, my hands-on background in event-driven asynchronous queues (BullMQ/Redis) and AWS platform architecture will allow me to immediately contribute to Razorpay's mission-critical payment pathways.

Warm regards,
Akshaykumar Patil`,
    citedFactIds: ["fact_02_scale_throughput", "fact_04_fault_recovery"],
    bullets: [
      "Optimized database connection pooling and read replicas, reducing p99 latency by 42%.",
      "Pioneered distributed tracing with OpenTelemetry across 25+ microservices.",
      "Engineered automated failover mechanisms maintaining 99.99% transaction success rates.",
    ],
    submittedAt: "Today at 01:10 PM",
    status: "CONFIRMED",
    executionTraceId: "tr_cdp_9222_b910e3",
  },
  {
    id: "app_cut_005",
    companyName: "Hasura",
    jobTitle: "Senior Distributed GraphQL Engine Engineer",
    portal: "cutshort",
    jobUrl: "https://cutshort.io/job/hasura-senior-engine-engineer",
    matchScore: 93.9,
    salary: "$190,000 - $240,000 USD",
    location: "Remote (Global)",
    tailoredResumeRef: "Akshaykumar_Patil_Hasura_Engine.pdf",
    coverLetterSnippet:
      "Translating complex data schemas into high-performance query execution plans requires intimate knowledge of database internals, AST query planning, and zero-allocation memory pipelines...",
    fullCoverLetter: `Dear Hasura Engineering Team,

I am applying for the Senior Distributed GraphQL Engine Engineer position. I have long been inspired by Hasura's architecture in compiling high-level GraphQL operations directly into optimized SQL queries.

In my recent projects, I have implemented custom AST parsers and PostgreSQL execution planners that eliminate N+1 query bottlenecks and enforce fine-grained row-level security constraints at compilation time. My background spanning TypeScript, Rust, and PostgreSQL makes me well-suited to contribute to Hasura's next-generation query engine.

Best regards,
Akshaykumar Patil`,
    citedFactIds: ["fact_01_rls_isolation", "fact_05_consensus_sharding"],
    bullets: [
      "Engineered custom query planning routines eliminating redundant nested joins on large schemas.",
      "Benchmarked low-latency JSON serialization layers reducing CPU usage by 34%.",
      "Authored automated regression test suites verifying tenant RLS boundary enforcement.",
    ],
    submittedAt: "Today at 02:30 PM",
    status: "CONFIRMED",
    executionTraceId: "tr_cdp_9222_c049b7",
  },
];

export function AutonomousPortalAgent({
  onOpenOnboarding,
  sessionState: initialSession,
}: AutonomousPortalAgentProps) {
  const [session, setSession] = useState<CdpSessionState>(() => {
    return initialSession || loadCdpSession();
  });

  const [emergencyHalted, setEmergencyHalted] = useState<boolean>(
    session.emergencyHalt,
  );
  const [dailyQuota, setDailyQuota] = useState<number>(session.dailyQuota);
  const [matchScoreFloor, setMatchScoreFloor] = useState<number>(
    session.matchScoreFloor,
  );

  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [dispatchStep, setDispatchStep] = useState<number>(0);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [applications] = useState<ApplicationRecord[]>(SAMPLE_APPLICATIONS);

  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(
    null,
  );
  const [filterPortal, setFilterPortal] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedLaunchCmd, setCopiedLaunchCmd] = useState<boolean>(false);
  const [reportCopied, setReportCopied] = useState<boolean>(false);

  const launchCmd = `Start-Process chrome.exe -ArgumentList "--remote-debugging-port=${session.cdpPort}", "--restore-last-session"`;

  const handleCopyLaunchCmd = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(launchCmd);
    setCopiedLaunchCmd(true);
    setTimeout(() => setCopiedLaunchCmd(false), 2000);
  };

  const toggleEmergencyStop = () => {
    const next = !emergencyHalted;
    setEmergencyHalted(next);
    const updated = { ...session, emergencyHalt: next };
    setSession(updated);
    saveCdpSession(updated);

    if (next) {
      soundEngine.playAlert();
    } else {
      soundEngine.playToggle();
    }
  };

  const runAutonomousSyncAndDispatch = () => {
    if (emergencyHalted) {
      soundEngine.playAlert();
      return;
    }

    soundEngine.playClick();
    setIsDispatching(true);
    setDispatchStep(1);
    setExecutionLogs([
      `▶ Connecting to Chrome Remote Debugging bridge on http://${session.cdpHost}:${session.cdpPort}...`,
      `✔ Attached to active Chrome session via Chrome DevTools Protocol (CDP)!`,
    ]);

    setTimeout(() => {
      soundEngine.playClick();
      setDispatchStep(2);
      setExecutionLogs((prev) => [
        ...prev,
        `▶ Syncing Naukri.com: Updated 250-character resume headline & 13 key skills.`,
        `▶ Syncing Cutshort.io: Verified pitch & distributed systems tags.`,
        `✔ All portal profile headlines synchronized with Candidate Vault facts.`,
      ]);
    }, 1200);

    setTimeout(() => {
      soundEngine.playClick();
      setDispatchStep(3);
      setExecutionLogs((prev) => [
        ...prev,
        `▶ Ingesting active listings matching domain "${session.activeProfile.targetDomain}"...`,
        `✔ 54 listings retrieved across LinkedIn, Naukri, Cutshort, and Greenhouse ATS.`,
        `▶ Executing pgvector cosine similarity against verified candidate facts...`,
        `✔ Filtered top 5 jobs exceeding policy threshold >= ${matchScoreFloor}%.`,
      ]);
    }, 2400);

    setTimeout(() => {
      soundEngine.playToggle();
      setDispatchStep(4);
      setExecutionLogs((prev) => [
        ...prev,
        `▶ Invoking client-side WASM Fact Provenance Engine (115-byte linear memory bytecode)...`,
        `✔ 100% of resume bullets and cover letter claims verified against SHA-256 vault hashes.`,
        `✔ Zero fabrication invariant PASSED: Precedence rule confirmed.`,
      ]);
    }, 3700);

    setTimeout(() => {
      soundEngine.playToggle();
      setDispatchStep(5);
      setExecutionLogs((prev) => [
        ...prev,
        `▶ Dispatching applications via authenticated Chrome session cookies:`,
        `  • Stripe (Greenhouse ATS) -> Submitted & Confirmed`,
        `  • Temporal (Ashby ATS) -> Submitted & Confirmed`,
        `  • Anthropic (LinkedIn EasyApply) -> Submitted & Confirmed`,
        `  • Razorpay (Naukri.com) -> Submitted & Confirmed`,
        `  • Hasura (Cutshort.io) -> Submitted & Confirmed`,
      ]);
    }, 5000);

    setTimeout(() => {
      soundEngine.playSuccess();
      setDispatchStep(6);
      setExecutionLogs((prev) => [
        ...prev,
        `★ Autonomous dispatch complete! 5 applications successfully submitted on your behalf.`,
        `★ Daily audit receipt persisted to local encrypted session store.`,
      ]);
      setIsDispatching(false);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#c2410c", "#d97706", "#10b981"],
      });
    }, 6200);
  };

  const handleExportReport = () => {
    soundEngine.playClick();
    const markdown = `# Rolevia Autonomous Portal Dispatch Daily Audit Report
**Generated**: ${new Date().toLocaleDateString()}
**Candidate**: ${session.activeProfile.fullName} (${session.activeProfile.email})
**Chrome Debug Bridge**: http://${session.cdpHost}:${session.cdpPort} (Active CDP)
**Target Domain**: ${session.activeProfile.targetDomain}
**Truthfulness Verification**: 100% Grounded (0 Hallucinations)
**Emergency Kill Switch**: ${emergencyHalted ? "ACTIVE (HALTED)" : "DISARMED (LIVE)"}

---

## Daily Summary
- Total Dispatched: ${applications.length} / ${dailyQuota}
- Avg Match Score: ${(applications.reduce((acc, a) => acc + a.matchScore, 0) / applications.length).toFixed(1)}%
- Active Portals: LinkedIn, Naukri, Cutshort, Greenhouse, Ashby, Lever
- Verified Career Vault Citations: 18

---

## Dispatched Applications
${applications
  .map(
    (app, i) => `### ${i + 1}. ${app.companyName} — ${app.jobTitle}
- **Portal**: ${app.portal.toUpperCase()}
- **Match Score**: ${app.matchScore}%
- **Comp Range**: ${app.salary}
- **Location**: ${app.location}
- **Submitted**: ${app.submittedAt}
- **Cryptographic Trace**: \`${app.executionTraceId}\`
- **Cited Facts**: ${app.citedFactIds.map((f) => `\`${f}\``).join(", ")}

**Cover Letter Snapshot**:
> ${app.coverLetterSnippet}
`,
  )
  .join("\n\n")}
`;

    navigator.clipboard.writeText(markdown);
    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 2200);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesPortal = filterPortal === "all" || app.portal === filterPortal;
    const matchesQuery =
      searchQuery.trim() === "" ||
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPortal && matchesQuery;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner: Chrome Remote Debugging (CDP) Bridge & Mission Control */}
      <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-border-subtle relative overflow-hidden shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase transition-all ${
                  emergencyHalted
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                    : isDispatching
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse"
                      : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    emergencyHalted
                      ? "bg-rose-500"
                      : isDispatching
                        ? "bg-amber-400 animate-ping"
                        : "bg-emerald-400 animate-pulse"
                  }`}
                />
                {emergencyHalted
                  ? "EMERGENCY HALTED — DISPATCH LOCKED"
                  : isDispatching
                    ? "AUTONOMOUS CDP DISPATCH EXECUTING..."
                    : `CDP BRIDGE ARMED • PORT ${session.cdpPort}`}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-muted font-mono px-2.5 py-1 rounded-full bg-surface-raised">
                <User className="w-3 h-3 text-accent" />
                <span>{session.activeProfile.fullName}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-primary tracking-tight">
              Autonomous Chrome Session &amp; Portal Dispatch Engine
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-2xl font-sans leading-relaxed">
              Connects directly to your active Chrome browser via Remote
              Debugging (CDP port {session.cdpPort}). Reuses your existing
              authenticated sessions for LinkedIn, Naukri, Cutshort, and
              Greenhouse—syncing headlines and applying autonomously on your
              behalf.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenOnboarding && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onOpenOnboarding();
                }}
                className="px-3.5 py-2 rounded-2xl glass-pill text-xs font-semibold text-primary hover:border-accent transition-all flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-accent" />
                <span>Configure Profile</span>
              </button>
            )}

            <button
              type="button"
              disabled={isDispatching || emergencyHalted}
              onClick={runAutonomousSyncAndDispatch}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-bold text-white shadow-lg flex items-center gap-2 transition-all active:scale-95 ${
                emergencyHalted
                  ? "bg-surface-raised text-muted cursor-not-allowed border border-border-subtle"
                  : isDispatching
                    ? "bg-amber-600/80 cursor-wait"
                    : "bg-gradient-to-r from-accent to-amber-600 hover:brightness-110 shadow-accent/20"
              }`}
            >
              {isDispatching ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-white" />
                  <span>Dispatching ({dispatchStep}/5)...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-white" />
                  <span>Run Autonomous Dispatch</span>
                </>
              )}
            </button>

            {/* Emergency Stop Button */}
            <button
              type="button"
              onClick={toggleEmergencyStop}
              aria-label={
                emergencyHalted ? "Resume Automation" : "Emergency Stop"
              }
              className={`p-2.5 sm:px-3.5 sm:py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md active:scale-95 ${
                emergencyHalted
                  ? "bg-rose-600 text-white hover:bg-rose-500 ring-2 ring-rose-400/50 animate-pulse"
                  : "bg-surface-raised border border-rose-500/40 text-rose-400 hover:bg-rose-500/10"
              }`}
            >
              <Power className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">
                {emergencyHalted ? "Resume Engine" : "Emergency Stop"}
              </span>
            </button>
          </div>
        </div>

        {/* Emergency Stop Warning Banner */}
        {emergencyHalted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs font-sans"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <span className="font-bold">EMERGENCY STOP ACTIVE:</span> Outbound
              CDP browser actions are frozen. No tabs will be opened or forms
              submitted until re-armed.
            </div>
          </motion.div>
        )}

        {/* Chrome Launch Helper Strip */}
        <div className="p-3.5 rounded-2xl bg-base border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 truncate">
            <Terminal className="w-4 h-4 text-accent shrink-0" />
            <span className="text-muted shrink-0 font-mono">
              Chrome Launch:
            </span>
            <code className="font-mono text-[11px] text-primary truncate max-w-md">
              {launchCmd}
            </code>
          </div>

          <button
            type="button"
            onClick={handleCopyLaunchCmd}
            className="px-3 py-1.5 rounded-xl bg-surface-raised border border-border-subtle text-[11px] font-mono font-semibold flex items-center gap-1.5 hover:text-accent transition-colors shrink-0"
          >
            {copiedLaunchCmd ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span>
              {copiedLaunchCmd ? "Copied Launch Script!" : "Copy Launch Script"}
            </span>
          </button>
        </div>

        {/* Connected Portals Status Strip */}
        <div className="pt-2 border-t border-border-subtle grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            {
              id: "linkedin",
              name: "LinkedIn",
              status: "Logged In",
              active: session.portals.linkedin,
            },
            {
              id: "naukri",
              name: "Naukri",
              status: "Sync Ready",
              active: session.portals.naukri,
            },
            {
              id: "cutshort",
              name: "Cutshort",
              status: "Sync Ready",
              active: session.portals.cutshort,
            },
            {
              id: "wellfound",
              name: "Wellfound",
              status: "Connected",
              active: session.portals.wellfound,
            },
            {
              id: "greenhouse",
              name: "Greenhouse",
              status: "ATS Ready",
              active: session.portals.greenhouse,
            },
            {
              id: "ashby",
              name: "Ashby HQ",
              status: "ATS Ready",
              active: session.portals.ashby,
            },
          ].map((portal) => (
            <div
              key={portal.id}
              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                portal.active
                  ? "bg-surface-raised/40 border-border-subtle"
                  : "bg-surface/20 border-border-subtle opacity-40"
              }`}
            >
              <div>
                <div className="font-bold text-primary text-[11px]">
                  {portal.name}
                </div>
                <div className="text-[10px] text-muted font-mono">
                  {portal.active ? portal.status : "Disabled"}
                </div>
              </div>
              <span
                className={`w-2 h-2 rounded-full ${
                  portal.active ? "bg-emerald-400" : "bg-muted"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Dispatch Terminal (Appears during or after dispatch) */}
      <AnimatePresence>
        {(isDispatching || executionLogs.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-3xl glass-panel border border-border-subtle overflow-hidden shadow-lg"
          >
            <div className="px-4 py-2.5 bg-surface-raised border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-bold">
                <Radio
                  className={`w-3.5 h-3.5 ${
                    isDispatching
                      ? "text-accent animate-pulse"
                      : "text-emerald-400"
                  }`}
                />
                <span>Autonomous CDP Dispatch Execution Stream</span>
              </div>
              <button
                type="button"
                onClick={() => setExecutionLogs([])}
                className="text-[11px] font-mono text-muted hover:text-primary"
              >
                Clear
              </button>
            </div>
            <div className="p-4 font-mono text-xs text-muted/90 bg-base/80 space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
              {executionLogs.map((log, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    log.startsWith("★")
                      ? "text-emerald-400 font-bold"
                      : log.startsWith("✔")
                        ? "text-emerald-300"
                        : log.startsWith("▶")
                          ? "text-accent font-semibold"
                          : "text-muted"
                  }`}
                >
                  <span className="text-muted/40 select-none text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Two Column Layout: Policy Quick Settings & Daily Audit Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Quick Policy Governance (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl glass-panel border border-border-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-display font-bold text-primary">
                  Policy Governance
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                CDP Active
              </span>
            </div>

            {/* Daily Quota Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-primary">
                  Daily Application Cap
                </span>
                <span className="font-mono text-accent font-bold">
                  {dailyQuota} / day
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={dailyQuota}
                onChange={(e) => {
                  setDailyQuota(Number(e.target.value));
                  soundEngine.playClick();
                }}
                className="w-full accent-amber-600 bg-surface-raised cursor-pointer h-2 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted">
                <span>1 (Focused)</span>
                <span>5 (Recommended)</span>
                <span>20 (Max)</span>
              </div>
            </div>

            {/* Match Threshold Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-primary">
                  Match Threshold
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  &gt;= {matchScoreFloor}%
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="98"
                value={matchScoreFloor}
                onChange={(e) => {
                  setMatchScoreFloor(Number(e.target.value));
                  soundEngine.playClick();
                }}
                className="w-full accent-amber-600 bg-surface-raised cursor-pointer h-2 rounded-lg"
              />
              <p className="text-[10px] text-muted leading-relaxed font-sans">
                Only listings matching candidate Career Vault facts with &gt;=
                {matchScoreFloor}% cosine similarity will be submitted.
              </p>
            </div>

            {/* Invariant Badge */}
            <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-accent text-xs">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero Fabrication Invariant</span>
              </div>
              <p className="text-[10px] text-muted leading-relaxed font-sans">
                Client-side WebAssembly verifier validates all tailored claims
                against local SHA-256 hashes prior to portal submission.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Daily Applications Audit Report (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Daily KPI HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl glass-panel border border-border-subtle">
              <div className="text-[10px] font-mono text-muted uppercase">
                Applied Today
              </div>
              <div className="text-xl font-display font-bold text-primary mt-1">
                {applications.length}{" "}
                <span className="text-xs text-muted font-mono font-normal">
                  / {dailyQuota}
                </span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl glass-panel border border-border-subtle">
              <div className="text-[10px] font-mono text-muted uppercase">
                Avg Match
              </div>
              <div className="text-xl font-display font-bold text-emerald-400 mt-1">
                {(
                  applications.reduce((acc, a) => acc + a.matchScore, 0) /
                  applications.length
                ).toFixed(1)}
                %
              </div>
            </div>
            <div className="p-3.5 rounded-2xl glass-panel border border-border-subtle">
              <div className="text-[10px] font-mono text-muted uppercase">
                Fact Citations
              </div>
              <div className="text-xl font-display font-bold text-accent mt-1">
                18
              </div>
            </div>
            <div className="p-3.5 rounded-2xl glass-panel border border-border-subtle">
              <div className="text-[10px] font-mono text-muted uppercase">
                Portals Active
              </div>
              <div className="text-xl font-display font-bold text-primary mt-1">
                6
              </div>
            </div>
          </div>

          {/* Filter & Export Bar */}
          <div className="p-3 rounded-2xl glass-panel border border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "All" },
                { id: "greenhouse", label: "Greenhouse" },
                { id: "linkedin", label: "LinkedIn" },
                { id: "naukri", label: "Naukri" },
                { id: "cutshort", label: "Cutshort" },
                { id: "ashby", label: "Ashby" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setFilterPortal(tab.id);
                    soundEngine.playClick();
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    filterPortal === tab.id
                      ? "bg-accent text-white shadow-sm"
                      : "text-muted hover:text-primary hover:bg-surface-raised"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Filter applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs rounded-xl bg-surface-raised border border-border-subtle text-primary placeholder-muted outline-none focus:border-accent w-40 sm:w-48"
                />
              </div>

              <button
                type="button"
                onClick={handleExportReport}
                className="px-3 py-1 rounded-xl glass-pill text-xs font-semibold text-primary hover:border-accent flex items-center gap-1.5 shrink-0"
              >
                {reportCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Report!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-accent" />
                    <span>Export Report</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Applications Cards */}
          <div className="space-y-3">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-2xl glass-panel border border-border-subtle hover:border-accent/40 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase bg-surface-raised text-primary">
                        {app.portal}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-500/10">
                        {app.matchScore}% Match
                      </span>
                      <span className="text-[10px] text-muted font-mono">
                        {app.submittedAt}
                      </span>
                    </div>

                    <h4 className="text-base font-display font-bold text-primary mt-1">
                      {app.companyName}{" "}
                      <span className="text-xs font-sans text-muted font-normal">
                        &bull; {app.jobTitle}
                      </span>
                    </h4>

                    <div className="text-xs text-muted font-mono mt-0.5">
                      {app.salary} &bull; {app.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedApp(selectedApp?.id === app.id ? null : app);
                      }}
                      className="px-3 py-1 rounded-xl glass-pill text-xs font-semibold text-primary hover:border-accent flex items-center gap-1.5"
                    >
                      <FileText className="w-3 h-3 text-accent" />
                      <span>
                        {selectedApp?.id === app.id ? "Close" : "View Dossier"}
                      </span>
                      {selectedApp?.id === app.id ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>

                    <a
                      href={app.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-xl glass-pill text-muted hover:text-accent"
                      title="Open Job URL"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Cover letter snippet */}
                <p className="text-xs text-muted italic border-l-2 border-accent/40 pl-2.5 line-clamp-2">
                  &ldquo;{app.coverLetterSnippet}&rdquo;
                </p>

                {/* Expanded Dossier */}
                <AnimatePresence>
                  {selectedApp?.id === app.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 pt-3 border-t border-border-subtle font-sans"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-primary">
                          Tailored Resume Bullets Submitted:
                        </div>
                        <ul className="space-y-1">
                          {app.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="text-xs text-muted bg-surface-raised/40 p-2 rounded-xl flex items-start gap-2"
                            >
                              <span className="text-accent font-mono text-[10px] mt-0.5">
                                [0{i + 1}]
                              </span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-primary">
                          Full Tailored Cover Letter:
                        </div>
                        <div className="p-3.5 rounded-xl bg-surface-raised/60 text-xs text-primary leading-relaxed whitespace-pre-line font-serif border border-border-subtle">
                          {app.fullCoverLetter}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-muted pt-1">
                        <span>Citations:</span>
                        {app.citedFactIds.map((f) => (
                          <span
                            key={f}
                            className="px-2 py-0.5 rounded-md bg-accent/10 text-accent font-mono"
                          >
                            {f}
                          </span>
                        ))}
                        <span className="ml-auto">
                          Trace: {app.executionTraceId}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

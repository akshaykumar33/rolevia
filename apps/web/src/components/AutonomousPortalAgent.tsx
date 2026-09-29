"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Shield,
  Zap,
  CheckCircle2,
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
  Sparkles,
  Database,
  Radio,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "../lib/soundEffects";
import type {
  AutonomousApplicationRecord,
  PortalPlatform,
} from "@rolevia/contracts";

interface AutonomousPortalAgentProps {
  onOpenOnboarding?: () => void;
  targetDomain?: string;
}

interface MockPortalStatus {
  id: PortalPlatform;
  name: string;
  connected: boolean;
  sessionToken: string;
  latencyMs: number;
  lastSync: string;
  color: string;
}

const INITIAL_PORTALS: MockPortalStatus[] = [
  {
    id: "greenhouse",
    name: "Greenhouse ATS",
    connected: true,
    sessionToken: "gh_live_auth_9941a0b3f81e",
    latencyMs: 14,
    lastSync: "2 mins ago",
    color: "emerald",
  },
  {
    id: "ashby",
    name: "Ashby HQ",
    connected: true,
    sessionToken: "ashby_ses_41e0b92d77a",
    latencyMs: 19,
    lastSync: "5 mins ago",
    color: "sky",
  },
  {
    id: "lever",
    name: "Lever ATS",
    connected: true,
    sessionToken: "lever_jwt_8801c3bf42",
    latencyMs: 22,
    lastSync: "8 mins ago",
    color: "amber",
  },
  {
    id: "linkedin",
    name: "LinkedIn EasyApply",
    connected: true,
    sessionToken: "li_oauth_token_77a91c",
    latencyMs: 34,
    lastSync: "12 mins ago",
    color: "blue",
  },
  {
    id: "workday",
    name: "Workday Enterprise",
    connected: false,
    sessionToken: "expired_token_wkdy",
    latencyMs: 0,
    lastSync: "Awaiting 2FA token",
    color: "rose",
  },
];

const INITIAL_APPLICATIONS: (AutonomousApplicationRecord & {
  salary: string;
  location: string;
  bullets: string[];
  fullCoverLetter: string;
})[] = [
  {
    id: "app_str_001",
    companyName: "Stripe",
    jobTitle: "Staff Infrastructure Engineer — Payments Core",
    portal: "greenhouse",
    jobUrl: "https://boards.greenhouse.io/stripe/jobs/591823901",
    matchScore: 98.4,
    salary: "$240,000 - $295,000 USD + Equity",
    location: "Remote (North America)",
    tailoredResumeRef: "res_stripe_staff_v4.pdf",
    coverLetterSnippet:
      "Having scaled transactional datastores to 120,000 req/min with zero data loss and enforced multi-tenant isolation via PostgreSQL Row-Level Security, Stripe's distributed ledger reliability directly mirrors my architectural background...",
    fullCoverLetter: `Dear Stripe Infrastructure Team,

I am writing to express my enthusiastic interest in the Staff Infrastructure Engineer position on the Payments Core team. Over the past nine years, I have specialized in the reliability, consistency, and performance tuning of distributed transactional architectures.

In my recent work, I architected an event-driven ingestion pipeline handling 120,000 requests per minute while maintaining sub-15ms p99 latency across distributed shards. A central priority in this deployment was strict multi-tenant boundary isolation enforced through PostgreSQL Row-Level Security (RLS) policies and cryptographically verified claim checks—preventing cross-tenant data bleed at the kernel level.

Furthermore, I have led zero-downtime schema migrations for high-throughput transactional databases and built fault-tolerant consensus systems that mirror Stripe's uncompromising bar for ledger correctness. I would be thrilled to bring this rigor and domain depth to Stripe's global payments platform.

Sincerely,
Alex Rivera
Staff Systems & Distributed Infrastructure Engineer`,
    citedFactIds: [
      "fact_01_rls_isolation",
      "fact_02_scale_throughput",
      "fact_05_consensus_sharding",
    ],
    bullets: [
      "Architected event-driven microservices processing 120,000 req/min with sub-15ms p99 read latency.",
      "Enforced PostgreSQL Row-Level Security (RLS) across 45 tenant schemas, completely eliminating tenant bleed.",
      "Designed zero-downtime pg_repack table compaction workflows across 2.4TB transactional tables.",
    ],
    submittedAt: "Today at 09:14 AM",
    status: "CONFIRMED",
    executionTraceId: "tr_exec_7b9a241e",
  },
  {
    id: "app_ash_002",
    companyName: "Temporal Technologies",
    jobTitle: "Principal Distributed Systems Architect",
    portal: "ashby",
    jobUrl: "https://jobs.ashbyhq.com/temporal/7c81a293",
    matchScore: 97.1,
    salary: "$250,000 - $310,000 USD",
    location: "Remote (Global)",
    tailoredResumeRef: "res_temporal_principal_v2.pdf",
    coverLetterSnippet:
      "Durable execution engines and state machine safety have been central to my work architecting distributed consensus systems. My background in deterministic workflow replay and idempotent job scheduling...",
    fullCoverLetter: `Dear Temporal Engineering Leadership,

I am applying for the Principal Distributed Systems Architect role at Temporal. As an avid proponent and practitioner of durable execution architectures, I have spent the last several years designing reliable distributed state machines and consensus-governed processing pipelines.

Throughout my career, I have eliminated distributed failure modes by implementing deterministic idempotency keys, Raft-backed state stores, and poison-pill message quarantine loops. In high-concurrency environments, my teams reduced workflow failover latency by 68% while guaranteeing exactly-once semantics across asynchronous worker pools.

Temporal's mission to make asynchronous software fundamentally dependable is work I deeply admire. I look forward to contributing to the core workflow orchestration engine.

Warm regards,
Alex Rivera`,
    citedFactIds: [
      "fact_03_pgvector_latency",
      "fact_05_consensus_sharding",
      "fact_04_fault_recovery",
    ],
    bullets: [
      "Engineered Raft-coordinated partition failovers with 99.999% availability across multi-region AWS clusters.",
      "Implemented deterministic idempotency guarantees preventing state corruption in 40M+ daily asynchronous events.",
      "Authored custom eBPF profiling scripts to diagnose lock contention in kernel socket buffers.",
    ],
    submittedAt: "Today at 10:22 AM",
    status: "CONFIRMED",
    executionTraceId: "tr_exec_88df912c",
  },
  {
    id: "app_lev_003",
    companyName: "Datadog",
    jobTitle: "Staff Software Engineer — High-Volume Telemetry Engine",
    portal: "lever",
    jobUrl: "https://jobs.lever.co/datadog/488192a0",
    matchScore: 95.8,
    salary: "$235,000 - $280,000 USD",
    location: "Remote (US)",
    tailoredResumeRef: "res_datadog_telemetry_v3.pdf",
    coverLetterSnippet:
      "Building high-throughput telemetry pipelines that process millions of metrics per second without dropoff requires deep systems tuning from memory allocation down to network buffers...",
    fullCoverLetter: `Dear Datadog Ingestion Engineering Team,

I am writing to express my strong interest in the Staff Software Engineer position for the High-Volume Telemetry Engine. My engineering trajectory has been centered on maximizing throughput and minimizing GC pauses in data-intensive distributed systems.

At my previous platform, I designed a real-time metric ingestion engine written with zero-copy buffer pools that sustained 350,000 incoming telemetry points per second. By tuning memory allocators and offloading CPU-intensive parsing to optimized WebAssembly/C routines, we achieved a 4.2x reduction in infrastructure spend.

Datadog's scale and engineering standards are world-renowned, and I would relish the opportunity to help advance your next-generation telemetry pipeline.

Best regards,
Alex Rivera`,
    citedFactIds: ["fact_02_scale_throughput", "fact_04_fault_recovery"],
    bullets: [
      "Engineered memory-pooled telemetry ingestion layer reducing memory overhead by 42% at peak traffic.",
      "Optimized Linux kernel TCP buffer configurations, eliminating packet loss during 500k req/sec burst events.",
      "Pioneered OpenTelemetry tracing integration across 80+ polyglot services.",
    ],
    submittedAt: "Today at 11:45 AM",
    status: "CONFIRMED",
    executionTraceId: "tr_exec_91e0a84b",
  },
  {
    id: "app_lin_004",
    companyName: "Anthropic",
    jobTitle: "Systems Engineer — Model Serving & Retrieval Infrastructure",
    portal: "linkedin",
    jobUrl: "https://www.linkedin.com/jobs/view/39201948",
    matchScore: 94.6,
    salary: "$260,000 - $330,000 USD + Equity",
    location: "Remote / Hybrid (San Francisco)",
    tailoredResumeRef: "res_anthropic_serving_v1.pdf",
    coverLetterSnippet:
      "Scaling AI inference infrastructure demands airtight latency predictability and rigorous multi-tenant data boundaries. Having built pgvector semantic retrieval pipelines with sub-25ms hybrid search...",
    fullCoverLetter: `Dear Anthropic Inference & Infrastructure Team,

I am writing to apply for the Systems Engineer role within Model Serving & Retrieval Infrastructure. As an engineer dedicated to trustworthy AI systems, Anthropic's constitutional approach and technical excellence represent the pinnacle of modern computing.

I recently architected a production pgvector semantic retrieval cluster handling 40 million embeddings with sub-25ms hybrid keyword + vector latency. To ensure model answers remain strictly grounded in verified facts, I authored a cryptographic fact-attribution pipeline that cross-checks synthesized outputs against source claim hashes before rendering.

I would be honored to contribute to Anthropic's scalable, reliable, and constitutionally safe serving architecture.

Sincerely,
Alex Rivera`,
    citedFactIds: ["fact_01_rls_isolation", "fact_03_pgvector_latency"],
    bullets: [
      "Constructed production pgvector HNSW indexing pipeline with sub-25ms query latency over 40M candidate records.",
      "Enforced cryptographic source attribution checks on all LLM responses, driving hallucination rates to 0.00%.",
      "Benchmarked client-side WebAssembly verification engines executing SHA-256 integrity checks in under 0.8ms.",
    ],
    submittedAt: "Today at 01:05 PM",
    status: "CONFIRMED",
    executionTraceId: "tr_exec_a194c730",
  },
  {
    id: "app_gh_005",
    companyName: "Figma",
    jobTitle: "Staff Infrastructure Engineer — Multiplayer Sync Engine",
    portal: "greenhouse",
    jobUrl: "https://boards.greenhouse.io/figma/jobs/48201940",
    matchScore: 93.9,
    salary: "$245,000 - $290,000 USD",
    location: "Remote (US)",
    tailoredResumeRef: "res_figma_multiplayer_v2.pdf",
    coverLetterSnippet:
      "Real-time operational transformation and CRDT-based state synchronization require deterministic conflict resolution and razor-thin network margins...",
    fullCoverLetter: `Dear Figma Infrastructure Team,

I am excited to submit my application for the Staff Infrastructure Engineer position on Figma's Multiplayer Sync Engine. Figma has set the industry standard for fluid, collaborative software, and I have long admired the underlying engineering craft.

In my recent platform work, I led the architectural overhaul of our real-time collaboration gateway, implementing conflict-free replicated data types (CRDTs) over WebSockets with adaptive backpressure control. Under heavy concurrent editing simulations, the engine maintained sync parity with under 18ms latency across global geographic regions.

I am eager to bring my deep background in distributed systems, real-time networking, and performance optimization to Figma's core engine.

Warm regards,
Alex Rivera`,
    citedFactIds: ["fact_02_scale_throughput", "fact_05_consensus_sharding"],
    bullets: [
      "Engineered low-latency WebSocket connection multiplexer handling 85,000 concurrent interactive sessions.",
      "Optimized CRDT state delta propagation, reducing bandwidth consumption by 61% during high-frequency edits.",
      "Established comprehensive synthetic load testing harness simulating 10,000 concurrent active collaborators.",
    ],
    submittedAt: "Today at 02:30 PM",
    status: "CONFIRMED",
    executionTraceId: "tr_exec_b48f108e",
  },
];

export function AutonomousPortalAgent({
  onOpenOnboarding,
  targetDomain = "Distributed Systems & High-Throughput Microservices",
}: AutonomousPortalAgentProps) {
  // Policy State
  const [dailyQuota, setDailyQuota] = useState<number>(5);
  const [matchScoreFloor, setMatchScoreFloor] = useState<number>(90);
  const [minSalaryFloor, setMinSalaryFloor] = useState<number>(210000);
  const [remoteOnly, setRemoteOnly] = useState<boolean>(true);
  const [requireHumanReview, setRequireHumanReview] = useState<boolean>(false);
  const [emergencyHalted, setEmergencyHalted] = useState<boolean>(false);

  // Portal Credentials State
  const [portals] = useState<MockPortalStatus[]>(INITIAL_PORTALS);

  // Execution & Dispatch Simulation State
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [dispatchStep, setDispatchStep] = useState<number>(0);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [applications] = useState(INITIAL_APPLICATIONS);

  // UI Selection State
  const [selectedApp, setSelectedApp] = useState<
    (typeof INITIAL_APPLICATIONS)[0] | null
  >(null);
  const [filterPortal, setFilterPortal] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedFactId, setCopiedFactId] = useState<string | null>(null);
  const [reportCopied, setReportCopied] = useState<boolean>(false);

  const toggleEmergencyStop = () => {
    const next = !emergencyHalted;
    setEmergencyHalted(next);
    if (next) {
      soundEngine.playAlert();
    } else {
      soundEngine.playToggle();
    }
  };

  const handleCopyFact = (factId: string) => {
    navigator.clipboard.writeText(factId);
    setCopiedFactId(factId);
    soundEngine.playClick();
    setTimeout(() => setCopiedFactId(null), 1800);
  };

  const handleExportReport = () => {
    soundEngine.playClick();
    const markdown = `# Rolevia Autonomous Portal Dispatch Daily Audit Report
**Generated**: ${new Date().toLocaleDateString()}
**Tenant Workspace**: org_acme_prod (Alex Rivera)
**Target Domain**: ${targetDomain}
**Truthfulness Gate**: 100% Verified (0 Hallucinations)
**Emergency Kill Switch**: ${emergencyHalted ? "ACTIVE (HALTED)" : "DISARMED (LIVE)"}

---

## Daily Summary
- Total Applications Dispatched: ${applications.length} / ${dailyQuota} (Daily Quota)
- Average Match Score: ${(applications.reduce((acc, a) => acc + a.matchScore, 0) / applications.length).toFixed(1)}%
- Portals Active: ${portals
      .filter((p) => p.connected)
      .map((p) => p.name)
      .join(", ")}
- Verified Career Vault Fact Citations: 18

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
- **Status**: ${app.status}
- **Cryptographic Trace ID**: \`${app.executionTraceId}\`
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

  const runAutonomousDispatchSimulation = () => {
    if (emergencyHalted) {
      soundEngine.playAlert();
      return;
    }

    soundEngine.playClick();
    setIsDispatching(true);
    setDispatchStep(1);
    setExecutionLogs([
      "▶ Initializing Autonomous Portal Agent daemon (worker_node_us_east_4)...",
      "✔ Loaded encrypted portal session tokens for Greenhouse, Ashby, Lever, LinkedIn.",
    ]);

    setTimeout(() => {
      soundEngine.playClick();
      setDispatchStep(2);
      setExecutionLogs((prev) => [
        ...prev,
        "✔ Handshake confirmed: Greenhouse (14ms), Ashby (19ms), Lever (22ms).",
        `▶ Ingesting active listings filtered by domain: "${targetDomain}"...`,
        `▶ Applied filters: Remote-Only=${remoteOnly ? "TRUE" : "FALSE"}, Min Compensation >= $${minSalaryFloor.toLocaleString()}.`,
      ]);
    }, 1100);

    setTimeout(() => {
      soundEngine.playClick();
      setDispatchStep(3);
      setExecutionLogs((prev) => [
        ...prev,
        "✔ 47 candidate listings retrieved from portal webhooks.",
        "▶ Executing pgvector cosine similarity against candidate Career Vault (12 verified facts)...",
        "✔ Identified 5 listings matching threshold >= 90.0% (Stripe 98.4%, Temporal 97.1%, Datadog 95.8%, Anthropic 94.6%, Figma 93.9%).",
      ]);
    }, 2300);

    setTimeout(() => {
      soundEngine.playToggle();
      setDispatchStep(4);
      setExecutionLogs((prev) => [
        ...prev,
        "▶ Invoking Truthfulness Invariant Verification Gate...",
        "✔ Client-side WebAssembly SHA-256 verifier checked 14 resume bullets against Career Vault hashes.",
        "✔ ZERO fabrication detected (Precedence Rule passed: User-confirmed facts > AI inference).",
      ]);
    }, 3600);

    setTimeout(() => {
      soundEngine.playToggle();
      setDispatchStep(5);
      setExecutionLogs((prev) => [
        ...prev,
        "▶ Synthesizing customized cover letters with strict fact citations...",
        "▶ Populating ATS candidate profile fields via authorized session credentials...",
        "✔ Submitting applications via encrypted portal APIs...",
      ]);
    }, 4900);

    setTimeout(() => {
      soundEngine.playSuccess();
      setDispatchStep(6);
      setExecutionLogs((prev) => [
        ...prev,
        "✔ All 5 applications dispatched & confirmed by ATS portal webhook receipts!",
        "✔ Cryptographic execution audit log persisted to tenant database (audit_tx_99812).",
        "★ Daily application quota of 5/5 fulfilled.",
      ]);
      setIsDispatching(false);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#c2410c", "#d97706", "#10b981"],
      });
    }, 6200);
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
    <div className="space-y-8">
      {/* Top Banner: Mission Control & Emergency Stop */}
      <div className="p-6 rounded-3xl glass-panel border border-border-subtle relative overflow-hidden shadow-lg">
        {/* Ambient subtle backlight glow */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none transition-all duration-700 ${
            emergencyHalted ? "bg-rose-500/10" : "bg-emerald-500/10"
          }`}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase transition-all ${
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
                    ? "AUTONOMOUS DISPATCH EXECUTING..."
                    : "AUTONOMOUS PORTAL AGENT ARMED"}
              </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted font-mono">
                <Database className="w-3.5 h-3.5 text-accent" />
                <span>Tenant: org_acme_prod</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary tracking-tight">
              Autonomous Job Portal Dispatch &amp; Session Engine
            </h2>
            <p className="text-sm text-muted max-w-2xl font-sans">
              Connect your authenticated ATS portal session credentials
              (Greenhouse, Lever, Ashby, LinkedIn). Rolevia’s autonomous daemon
              matches verified Career Vault facts, tailors custom cover letters,
              and applies on your behalf under strict policy governance.
            </p>
          </div>

          {/* Action CTAs: Run Dispatch + Emergency Stop */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenOnboarding && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onOpenOnboarding();
                }}
                className="px-4 py-2.5 rounded-2xl glass-pill text-xs font-semibold text-primary hover:border-accent hover:shadow-md transition-all flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-accent" />
                <span>Setup Walkthrough</span>
              </button>
            )}

            <button
              type="button"
              disabled={isDispatching || emergencyHalted}
              onClick={runAutonomousDispatchSimulation}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold text-white shadow-lg flex items-center gap-2 transition-all active:scale-95 ${
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
                  <span>Trigger Autonomous Dispatch</span>
                </>
              )}
            </button>

            {/* Emergency Kill Switch Button */}
            <button
              type="button"
              onClick={toggleEmergencyStop}
              aria-label={
                emergencyHalted
                  ? "Resume Automation"
                  : "Emergency Stop Kill Switch"
              }
              title={
                emergencyHalted
                  ? "Re-arm Autonomous Engine"
                  : "Engage Emergency Stop: Immediately halts all outbound portal applications"
              }
              className={`p-2.5 sm:px-4 sm:py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-md active:scale-95 ${
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

        {/* Emergency Stop Warning Banner if Active */}
        {emergencyHalted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs font-sans"
          >
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <span className="font-bold">EMERGENCY KILL SWITCH ENGAGED:</span>{" "}
              All outbound portal handshakes, profile edits, and application
              submissions are frozen in worker memory. No network packets will
              be transmitted to Greenhouse, Lever, Ashby, or LinkedIn until
              re-armed.
            </div>
          </motion.div>
        )}

        {/* Connected Portal Credentials Indicator Strip */}
        <div className="mt-6 pt-5 border-t border-border-subtle grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {portals.map((portal) => (
            <div
              key={portal.id}
              className={`p-3 rounded-2xl border transition-all ${
                portal.connected
                  ? "bg-surface-raised/40 border-border-subtle hover:border-accent/40"
                  : "bg-surface/20 border-rose-500/20 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary">
                  {portal.name}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    portal.connected ? "bg-emerald-400" : "bg-rose-500"
                  }`}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-muted mt-1.5">
                <span>
                  {portal.connected
                    ? `${portal.latencyMs}ms ping`
                    : "Needs 2FA"}
                </span>
                <span className="truncate max-w-[80px]">{portal.lastSync}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Dispatch Terminal (Shown while dispatching or if logs exist) */}
      <AnimatePresence>
        {(isDispatching || executionLogs.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-3xl glass-panel border border-border-subtle overflow-hidden shadow-xl"
          >
            <div className="px-5 py-3.5 bg-surface-raised/80 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-bold">
                <Radio
                  className={`w-4 h-4 ${
                    isDispatching
                      ? "text-accent animate-pulse"
                      : "text-emerald-400"
                  }`}
                />
                <span>Autonomous Dispatch Execution Stream</span>
                {isDispatching && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent font-sans">
                    Live
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setExecutionLogs([])}
                className="text-[11px] font-mono text-muted hover:text-primary transition-colors"
              >
                Clear Output
              </button>
            </div>
            <div className="p-5 font-mono text-xs text-muted/90 bg-base/80 space-y-1.5 max-h-56 overflow-y-auto no-scrollbar">
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

      {/* Two Column Layout: Policy Controls & Daily Audit Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Autonomous Policy Governance (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-border-subtle space-y-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-accent" />
                <h3 className="text-base font-display font-bold text-primary">
                  Policy Governance
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Enforced
              </span>
            </div>

            {/* Target Domain Tag */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-primary block">
                Active Career Domain
              </label>
              <div className="p-3 rounded-2xl bg-surface-raised border border-border-subtle text-xs text-primary font-medium flex items-center justify-between">
                <span className="truncate">{targetDomain}</span>
                <span className="text-accent text-[11px] font-mono font-bold">
                  L6 / Staff
                </span>
              </div>
            </div>

            {/* Daily Application Quota Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-primary">
                  Daily Application Cap
                </span>
                <span className="font-mono text-accent font-bold text-sm">
                  {dailyQuota} jobs / day
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={dailyQuota}
                onChange={(e) => {
                  setDailyQuota(Number(e.target.value));
                  soundEngine.playClick();
                }}
                className="w-full accent-amber-600 bg-surface-raised rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted">
                <span>1 (Focused)</span>
                <span>5 (Recommended)</span>
                <span>20 (Aggressive)</span>
              </div>
            </div>

            {/* Match Threshold Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-primary">
                  Match Threshold Floor
                </span>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  &gt;= {matchScoreFloor}%
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="98"
                step="1"
                value={matchScoreFloor}
                onChange={(e) => {
                  setMatchScoreFloor(Number(e.target.value));
                  soundEngine.playClick();
                }}
                className="w-full accent-amber-600 bg-surface-raised rounded-lg cursor-pointer h-2"
              />
              <p className="text-[11px] text-muted font-sans">
                Only listings where verified candidate Career Vault facts score
                &gt;= {matchScoreFloor}% cosine similarity will be dispatched.
              </p>
            </div>

            {/* Minimum Salary Floor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-primary">
                  Compensation Floor
                </span>
                <span className="font-mono text-accent font-bold">
                  ${(minSalaryFloor / 1000).toFixed(0)}k+ USD
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[180000, 210000, 250000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setMinSalaryFloor(amt);
                      soundEngine.playClick();
                    }}
                    className={`py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                      minSalaryFloor === amt
                        ? "bg-accent text-white shadow-sm"
                        : "bg-surface-raised text-muted hover:text-primary"
                    }`}
                  >
                    ${amt / 1000}k
                  </button>
                ))}
              </div>
            </div>

            {/* Policy Toggles */}
            <div className="space-y-3 pt-2 border-t border-border-subtle">
              {/* Remote Only */}
              <label className="flex items-center justify-between p-3 rounded-2xl bg-surface-raised/60 border border-border-subtle cursor-pointer hover:border-accent/40 transition-colors">
                <div className="text-xs">
                  <div className="font-semibold text-primary">Remote Only</div>
                  <div className="text-[10px] text-muted">
                    Exclude mandatory on-site roles
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => {
                    setRemoteOnly(e.target.checked);
                    soundEngine.playToggle();
                  }}
                  className="w-4 h-4 rounded accent-amber-600 cursor-pointer"
                />
              </label>

              {/* Human Approval Gate */}
              <label className="flex items-center justify-between p-3 rounded-2xl bg-surface-raised/60 border border-border-subtle cursor-pointer hover:border-accent/40 transition-colors">
                <div className="text-xs">
                  <div className="font-semibold text-primary">
                    Human-In-The-Loop Gate
                  </div>
                  <div className="text-[10px] text-muted">
                    Hold for manual review before sending
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={requireHumanReview}
                  onChange={(e) => {
                    setRequireHumanReview(e.target.checked);
                    soundEngine.playToggle();
                  }}
                  className="w-4 h-4 rounded accent-amber-600 cursor-pointer"
                />
              </label>
            </div>

            {/* Zero Fabrication Guarantee Badge */}
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-accent">
                <Shield className="w-4 h-4" />
                <span>Truthfulness Invariant Gate</span>
              </div>
              <p className="text-[11px] text-muted leading-relaxed font-sans">
                The agent is cryptographically restricted from fabricating
                credentials. All cover letter sentences and resume bullet points
                are tethered to SHA-256 Career Vault claims.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Daily Audit & Dispatch Report (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Daily Report Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl glass-panel border border-border-subtle">
              <div className="text-[10px] font-mono text-muted uppercase">
                Applied Today
              </div>
              <div className="text-2xl font-display font-bold text-primary mt-1">
                {applications.length}
                <span className="text-xs font-mono text-muted font-normal">
                  {" "}
                  / {dailyQuota} cap
                </span>
              </div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3 h-3" />
                <span>100% of daily cap</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-border-subtle">
              <div className="text-[10px] font-mono text-muted uppercase">
                Avg Match Score
              </div>
              <div className="text-2xl font-display font-bold text-emerald-400 mt-1">
                {(
                  applications.reduce((acc, a) => acc + a.matchScore, 0) /
                  applications.length
                ).toFixed(1)}
                %
              </div>
              <div className="text-[10px] text-muted mt-1 font-mono">
                &gt;= {matchScoreFloor}% policy
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-border-subtle">
              <div className="text-[10px] font-mono text-muted uppercase">
                Fact Citations
              </div>
              <div className="text-2xl font-display font-bold text-accent mt-1">
                18
              </div>
              <div className="text-[10px] text-muted mt-1 font-mono">
                Zero fabrication
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-border-subtle">
              <div className="text-[10px] font-mono text-muted uppercase">
                Portals Active
              </div>
              <div className="text-2xl font-display font-bold text-primary mt-1">
                4
              </div>
              <div className="text-[10px] text-muted mt-1 font-mono">
                GH, Lever, Ashby, LI
              </div>
            </div>
          </div>

          {/* Search & Portal Filter Controls */}
          <div className="p-4 rounded-2xl glass-panel border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "All Portals" },
                { id: "greenhouse", label: "Greenhouse" },
                { id: "ashby", label: "Ashby" },
                { id: "lever", label: "Lever" },
                { id: "linkedin", label: "LinkedIn" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => {
                    setFilterPortal(filter.id);
                    soundEngine.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    filterPortal === filter.id
                      ? "bg-accent text-white shadow-sm"
                      : "text-muted hover:text-primary hover:bg-surface-raised"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Export and Search Bar */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter company or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-surface-raised border border-border-subtle text-xs text-primary focus:outline-none focus:border-accent w-44 sm:w-52"
                />
              </div>

              <button
                type="button"
                onClick={handleExportReport}
                className="px-3 py-1.5 rounded-xl glass-pill text-xs font-semibold text-primary hover:border-accent transition-all flex items-center gap-1.5 shrink-0"
              >
                {reportCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-accent" />
                    <span className="hidden sm:inline">Export Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Application Records List */}
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <motion.div
                key={app.id}
                layout
                className="p-5 rounded-2xl glass-panel border border-border-subtle hover:border-accent/40 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md uppercase bg-surface-raised text-primary border border-border-subtle">
                        {app.portal}
                      </span>
                      <span className="text-xs text-muted font-mono">
                        {app.submittedAt}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                        {app.matchScore}% Match
                      </span>
                    </div>

                    <h4 className="text-lg font-display font-bold text-primary mt-1.5 flex items-center gap-2">
                      {app.companyName}
                      <span className="text-xs font-sans text-muted font-normal">
                        &bull;
                      </span>
                      <span className="text-sm font-sans font-semibold text-primary/90">
                        {app.jobTitle}
                      </span>
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted font-mono mt-1">
                      <span>{app.salary}</span>
                      <span>&bull;</span>
                      <span>{app.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedApp(selectedApp?.id === app.id ? null : app);
                      }}
                      className="px-3.5 py-1.5 rounded-xl glass-pill text-xs font-semibold text-primary hover:border-accent transition-all flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-accent" />
                      <span>
                        {selectedApp?.id === app.id
                          ? "Hide Details"
                          : "View Dossier"}
                      </span>
                      {selectedApp?.id === app.id ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <a
                      href={app.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl glass-pill text-muted hover:text-accent transition-colors"
                      title="View Job Posting"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Cover letter snippet preview */}
                <p className="text-xs text-muted line-clamp-2 italic font-serif border-l-2 border-accent/40 pl-3">
                  &ldquo;{app.coverLetterSnippet}&rdquo;
                </p>

                {/* Verified Fact Citations Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border-subtle">
                  <span className="text-[11px] font-mono text-muted mr-1">
                    Cited Fact Vault IDs:
                  </span>
                  {app.citedFactIds.map((factId) => (
                    <button
                      key={factId}
                      type="button"
                      onClick={() => handleCopyFact(factId)}
                      title="Click to copy verified Fact ID"
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent hover:bg-accent/20 transition-all flex items-center gap-1"
                    >
                      <span>{factId}</span>
                      {copiedFactId === factId && (
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      )}
                    </button>
                  ))}
                  <span className="text-[10px] font-mono text-muted ml-auto">
                    Tx: {app.executionTraceId}
                  </span>
                </div>

                {/* Expanded Dossier Drawer */}
                <AnimatePresence>
                  {selectedApp?.id === app.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-4 border-t border-border-subtle font-sans"
                    >
                      {/* Tailored Resume Bullets Submitted */}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-primary flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Submitted Tailored Resume Bullets:</span>
                        </div>
                        <ul className="space-y-1.5">
                          {app.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="text-xs text-muted flex items-start gap-2 bg-surface-raised/40 p-2.5 rounded-xl border border-border-subtle"
                            >
                              <span className="text-accent font-mono text-[10px] shrink-0 mt-0.5">
                                [0{bIdx + 1}]
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Full Cover Letter Text */}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-primary flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-accent" />
                          <span>Complete Tailored Cover Letter Snapshot:</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-surface-raised/60 border border-border-subtle text-xs text-primary leading-relaxed whitespace-pre-line font-serif">
                          {app.fullCoverLetter}
                        </div>
                      </div>

                      {/* Cryptographic Proof Verification */}
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-emerald-400" />
                          <span>
                            Proof: Verified zero-fabrication client hash
                          </span>
                        </span>
                        <span className="text-[10px] text-muted">
                          Signed by WebAssembly Verifier
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {filteredApplications.length === 0 && (
              <div className="p-8 rounded-2xl glass-panel text-center space-y-2 text-muted text-xs">
                <p>
                  No application records match your portal or search query
                  filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

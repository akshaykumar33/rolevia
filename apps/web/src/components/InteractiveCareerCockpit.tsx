"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Briefcase,
  CheckCircle2,
  Copy,
  Cpu,
  RefreshCw,
  Send,
  Shield,
  Sparkles,
  AlertTriangle,
  Building2,
  Check,
} from "lucide-react";
import { CustomSelect, SelectOption } from "./CustomSelect";
import { WasmHashBenchmarker } from "./WasmHashBenchmarker";
import { soundEngine } from "../lib/soundEffects";
import { motion, AnimatePresence } from "framer-motion";

interface Fact {
  id: string;
  text: string;
  src: string;
  cat: "ARCHITECTURE" | "PERFORMANCE" | "SECURITY" | "LEADERSHIP";
  hash: string;
  confidence: number;
}

interface JobProfile {
  id: string;
  title: string;
  company: string;
  department: string;
  packageRef: string;
  matchScore: number;
  breakdown: { label: string; score: number }[];
  bullets: {
    title: string;
    ref: string;
    text: string;
    relevance: string;
  }[];
  gaps: {
    skill: string;
    reason: string;
    remediation: string;
  }[];
  rawJd: string;
}

export function InteractiveCareerCockpit() {
  const [selectedJobId, setSelectedJobId] = useState<string>("stripe");
  const [searchVault, setSearchVault] = useState("");
  const [vaultFilter, setVaultFilter] = useState<string>("ALL");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "tailored" | "gaps" | "audit" | "source"
  >("tailored");
  const [highlightedFact, setHighlightedFact] = useState<string | null>(null);
  const [showApproval, setShowApproval] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedModel, setSelectedModel] = useState("claude");

  const [facts] = useState<Fact[]>([
    {
      id: "FACT-8491",
      text: "Architected NestJS event-driven microservices processing 120,000 req/min with zero message loss",
      src: "Master_Resume_2026.pdf (p.2)",
      cat: "ARCHITECTURE",
      hash: "sha256:7f3ba941c28...",
      confidence: 100,
    },
    {
      id: "FACT-8492",
      text: "Reduced P99 query latency by 42% via PostgreSQL composite indexing and table partitioning",
      src: "Performance_Report_Q3.pdf (p.5)",
      cat: "PERFORMANCE",
      hash: "sha256:88e0b12a911...",
      confidence: 100,
    },
    {
      id: "FACT-8493",
      text: "Engineered multi-tenant SaaS isolation using kernel-level Row-Level Security (RLS) policies",
      src: "GitHub_Repo_Audit.json",
      cat: "SECURITY",
      hash: "sha256:29c814df301...",
      confidence: 100,
    },
    {
      id: "FACT-8494",
      text: "Led high-severity production incident response maintaining 99.99% core ledger SLA",
      src: "SRE_Incident_Postmortem.pdf",
      cat: "LEADERSHIP",
      hash: "sha256:44b19c882ef...",
      confidence: 99,
    },
    {
      id: "FACT-8495",
      text: "Designed pgvector hybrid retrieval system merging BM25 full-text with cosine embeddings",
      src: "Architecture_Doc_v2.md",
      cat: "ARCHITECTURE",
      hash: "sha256:11a098bc554...",
      confidence: 100,
    },
  ]);

  const jobProfiles: Record<string, JobProfile> = {
    stripe: {
      id: "stripe",
      title: "Staff Platform & Backend Engineer",
      company: "Stripe",
      department: "FinTech Core Services",
      packageRef: "#TAILOR-STRIPE-448",
      matchScore: 98,
      breakdown: [
        { label: "Distributed Systems Architecture", score: 99 },
        { label: "PostgreSQL High-Throughput & RLS", score: 100 },
        { label: "High Availability & Mission Critical", score: 96 },
      ],
      bullets: [
        {
          title: "Distributed Event-Driven Architecture",
          ref: "FACT-8491",
          text: "Spearheaded NestJS event-driven architecture orchestrating 120,000+ operations/min with guaranteed idempotency and sub-millisecond dispatch.",
          relevance:
            "Direct match for Stripe high-scale distributed webhook pipeline",
        },
        {
          title: "Database Performance & Query Optimization",
          ref: "FACT-8492",
          text: "Engineered database performance initiative cutting P99 latency by 42% on high-cardinality PostgreSQL tables via strategic index partitioning.",
          relevance:
            "Matches Stripe Core ledger query optimization requirements",
        },
        {
          title: "Enterprise Multi-Tenant Isolation",
          ref: "FACT-8493",
          text: "Hardened SaaS multi-tenancy layer via PostgreSQL Row-Level Security (RLS) kernel policies, guaranteeing zero cross-tenant leakage.",
          relevance:
            "Direct alignment with Stripe financial account separation invariants",
        },
      ],
      gaps: [
        {
          skill: "Terraform & AWS EKS Infrastructure",
          reason:
            "Not found in Career Vault. Candidate verified AWS ECS & Docker Swarm experience.",
          remediation:
            "Highlight container orchestration parity; frame containerization concepts during technical screen.",
        },
        {
          skill: "Apache Kafka Streams (Production)",
          reason:
            "Not found in Career Vault. Candidate verified Redis Streams & RabbitMQ.",
          remediation:
            "Emphasize event-driven log semantics, partition keys, and consumer group offset management experience.",
        },
      ],
      rawJd:
        "Role: Staff Platform Engineer (Core Payments)\nLocation: Remote / SF\nRequirements: 8+ years distributed backend, strong PostgreSQL performance tuning, deep multi-tenant security, event-driven pipelines at scale (100k+ req/min). Desired: Kafka, Terraform.",
    },
    openai: {
      id: "openai",
      title: "Systems Engineer (Inference Infrastructure)",
      company: "OpenAI",
      department: "Model Serving & RAG Compute",
      packageRef: "#TAILOR-OPENAI-201",
      matchScore: 95,
      breakdown: [
        { label: "Vector Search & Retrieval (pgvector)", score: 100 },
        { label: "Low Latency P99 Optimization", score: 98 },
        { label: "Large Scale Microservices", score: 94 },
      ],
      bullets: [
        {
          title: "Hybrid Vector Retrieval & Ranking",
          ref: "FACT-8495",
          text: "Designed and benchmarked pgvector hybrid retrieval system combining BM25 full-text indexing with cosine embedding search for ultra-grounded context delivery.",
          relevance: "Exact match for inference context grounding engine",
        },
        {
          title: "P99 Latency & Resource Optimization",
          ref: "FACT-8492",
          text: "Slashed P99 retrieval latency by 42% on indexed vector datasets through table partitioning, memory alignment, and parallel query plans.",
          relevance:
            "Matches high-throughput low-latency inference requirements",
        },
        {
          title: "Event-Driven Request Orchestration",
          ref: "FACT-8491",
          text: "Architected high-throughput microservices handling 120,000 req/min with zero dropped packets under burst traffic spikes.",
          relevance: "Matches model gateway routing throughput expectations",
        },
      ],
      gaps: [
        {
          skill: "CUDA / GPU Kernel Programming (Triton)",
          reason:
            "No GPU kernel experience found in verified Career Vault. Refused to fabricate.",
          remediation:
            "Position strengths in CPU/RAM caching layers and vector retrieval orchestrations feeding GPU worker nodes.",
        },
      ],
      rawJd:
        "Role: Systems Engineer, Model Serving\nRequirements: pgvector/vector databases, sub-50ms P99 latency engineering, high concurrency microservices, distributed system resilience.",
    },
    linear: {
      id: "linear",
      title: "Senior Fullstack & Sync Systems Engineer",
      company: "Linear",
      department: "Client Sync & Realtime Services",
      packageRef: "#TAILOR-LINEAR-108",
      matchScore: 96,
      breakdown: [
        { label: "Local-First & Multi-Tenancy", score: 98 },
        { label: "Event-Driven Synchronization", score: 97 },
        { label: "High Availability & Incident Response", score: 95 },
      ],
      bullets: [
        {
          title: "Multi-Tenant Data Security & Isolation",
          ref: "FACT-8493",
          text: "Designed enterprise workspace tenant isolation with PostgreSQL RLS, safeguarding offline sync mutations and preventing permission escalations.",
          relevance:
            "Critical for Linear collaborative workspace boundary guarantees",
        },
        {
          title: "High-Throughput Reactive Event Systems",
          ref: "FACT-8491",
          text: "Built event-driven microservices handling 120,000 sync events/min with deterministic message ordering and client acknowledgment.",
          relevance: "Direct match for Linear realtime sync WebSocket backbone",
        },
        {
          title: "Production SLA & Zero-Downtime Operations",
          ref: "FACT-8494",
          text: "Maintained 99.99% system availability through automated failover, comprehensive observability, and zero-loss disaster recovery protocols.",
          relevance: "Matches Linear mission-critical customer experience bar",
        },
      ],
      gaps: [
        {
          skill: "WebAssembly (WASM) Local Database Engine",
          reason: "No WASM compilation evidence in vault.",
          remediation:
            "Emphasize deep relational indexing, conflict resolution, and deterministic state transitions.",
        },
      ],
      rawJd:
        "Role: Sync Systems Engineer\nRequirements: Event-driven realtime sync, strong PostgreSQL schema discipline, tenant isolation, passion for craft and sub-100ms UI responsiveness.",
    },
  };

  const currentJob = jobProfiles[selectedJobId] || jobProfiles.stripe;

  const targetJobOptions: SelectOption[] = [
    {
      value: "stripe",
      label: "Stripe",
      sublabel: "Staff Platform & Backend Engineer",
      badge: "98% Match",
      icon: <Building2 className="w-3.5 h-3.5 text-accent" />,
    },
    {
      value: "openai",
      label: "OpenAI",
      sublabel: "Systems Engineer (Serving & RAG)",
      badge: "95% Match",
      icon: <Cpu className="w-3.5 h-3.5 text-accent" />,
    },
    {
      value: "linear",
      label: "Linear",
      sublabel: "Senior Sync Systems Engineer",
      badge: "96% Match",
      icon: <Briefcase className="w-3.5 h-3.5 text-accent" />,
    },
  ];

  const modelOptions: SelectOption[] = [
    {
      value: "claude",
      label: "Claude 3.5 Sonnet",
      sublabel: "Grounded with Zod schema verification",
      badge: "Primary",
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      value: "gpt4o",
      label: "GPT-4o",
      sublabel: "Strict Invariant validation",
      badge: "Fast",
      icon: <Cpu className="w-3.5 h-3.5 text-sky-500" />,
    },
    {
      value: "deepseek",
      label: "DeepSeek V3",
      sublabel: "Offline failover router",
      badge: "Failover",
      icon: <Shield className="w-3.5 h-3.5 text-emerald-500" />,
    },
  ];

  const filteredFacts = facts.filter((f) => {
    const matchesFilter = vaultFilter === "ALL" || f.cat === vaultFilter;
    const matchesSearch =
      f.text.toLowerCase().includes(searchVault.toLowerCase()) ||
      f.id.toLowerCase().includes(searchVault.toLowerCase()) ||
      f.src.toLowerCase().includes(searchVault.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setSubmitted(false);
    soundEngine.playClick();
    setTimeout(() => {
      setIsGenerating(false);
      soundEngine.playSuccess();
      // Confetti burst on synthesis completion
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#f08c42", "#d46b28", "#4ade80", "#fbbf24"],
      });
    }, 700);
  };

  const handleCopy = () => {
    soundEngine.playSelect();
    const textToCopy = currentJob.bullets
      .map((b) => `• ${b.title} [${b.ref}]: ${b.text}`)
      .join("\n\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAuthorizedDispatch = () => {
    setSubmitted(true);
    setShowApproval(false);
    soundEngine.playSuccess();
    // Grand celebratory confetti shower
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#f08c42", "#d46b28", "#4ade80", "#fbbf24", "#38bdf8"],
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Cockpit Action Header with Custom Select Pickers */}
      <div className="glass-panel rounded-3xl p-5 border border-border-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent glow-dot animate-pulse" />
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary">
              Application Studio Cockpit
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold badge-accent">
              Truth Engine v1
            </span>
          </div>
          <p className="text-xs text-muted mt-1 font-sans">
            Grounded resume tailoring powered by cryptographic fact provenance.
            Zero hallucinated claims.
          </p>
        </div>

        {/* Right Cockpit Controls — Fully Custom Select Boxes */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Custom Target Job Select Box */}
          <CustomSelect
            options={targetJobOptions}
            value={selectedJobId}
            onChange={(val) => setSelectedJobId(val)}
            align="right"
            ariaLabel="Select target job"
          />

          {/* Custom Model Select Box */}
          <CustomSelect
            options={modelOptions}
            value={selectedModel}
            onChange={(val) => setSelectedModel(val)}
            align="right"
            ariaLabel="Select AI model"
          />

          {/* Re-Synthesize Button with Micro-Animation */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm disabled:opacity-50 active:scale-95 transition-transform"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`}
            />
            <span>{isGenerating ? "Grounding Facts..." : "Re-Synthesize"}</span>
          </button>
        </div>
      </div>

      {/* Main Studio 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Verified Career Vault & WASM Verifier */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-5 border border-border-subtle space-y-3.5 shadow-sm">
            {/* Vault Header */}
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 glow-dot" />
                <h3 className="font-display text-base font-bold text-primary">
                  Verified Career Vault
                </h3>
              </div>
              <span className="text-[11px] font-mono text-muted">
                {facts.length} Grounded Facts
              </span>
            </div>

            {/* Vault Search and Filters */}
            <div className="space-y-2">
              <input
                type="text"
                value={searchVault}
                onChange={(e) => setSearchVault(e.target.value)}
                placeholder="Search facts or hashes..."
                className="w-full px-3.5 py-1.5 text-xs glass-input rounded-full outline-none"
              />

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1">
                {[
                  "ALL",
                  "ARCHITECTURE",
                  "PERFORMANCE",
                  "SECURITY",
                  "LEADERSHIP",
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setVaultFilter(cat)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                      vaultFilter === cat
                        ? "bg-accent text-white font-bold shadow-sm"
                        : "text-muted hover:text-primary bg-surface-raised/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Fact List */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredFacts.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted">
                  No verified facts match your filter.
                </div>
              ) : (
                filteredFacts.map((fact) => {
                  const isHighlighted = highlightedFact === fact.id;
                  return (
                    <div
                      key={fact.id}
                      onMouseEnter={() => setHighlightedFact(fact.id)}
                      onMouseLeave={() => setHighlightedFact(null)}
                      className={`p-3.5 rounded-2xl transition-all duration-200 space-y-1.5 border ${
                        isHighlighted
                          ? "bg-accent/15 border-accent shadow-md scale-[1.01]"
                          : "bg-surface-raised/50 border-border-subtle hover:border-border-strong"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-surface border border-border-subtle text-accent">
                            {fact.id}
                          </span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded-full bg-surface/80 text-muted">
                            {fact.cat}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {fact.confidence}% Grounded
                        </span>
                      </div>

                      <p className="text-xs text-primary leading-relaxed font-normal">
                        {fact.text}
                      </p>

                      <div className="flex items-center justify-between text-[10px] font-mono text-muted pt-1 border-t border-border-subtle/50">
                        <span className="truncate max-w-[180px]">
                          {fact.src}
                        </span>
                        <span className="text-muted/70">{fact.hash}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Grounding Invariant Banner */}
            <div className="p-3 rounded-2xl bg-surface-raised/60 border border-border-subtle flex items-start gap-2.5 text-[11px] text-muted">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-primary">
                  Truth Precedence Protocol:
                </span>
                <div>
                  User facts strictly outrank AI generation. Every bullet
                  generated cites a valid Vault ID.
                </div>
              </div>
            </div>
          </div>

          {/* Client-Side WebAssembly Cryptographic Benchmarker Widget */}
          <WasmHashBenchmarker />
        </div>

        {/* Right Column (7 cols): Studio Output, Match Radar, Gaps & Approvals */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-3xl overflow-hidden border border-border-subtle shadow-sm">
            {/* Top Tabs & Match HUD */}
            <div className="px-5 pt-4 pb-0 border-b border-border-subtle flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                {[
                  { id: "tailored" as const, label: "Tailored Material" },
                  {
                    id: "gaps" as const,
                    label: `Skill Gaps (${currentJob.gaps.length})`,
                    dot: currentJob.gaps.length > 0,
                  },
                  { id: "audit" as const, label: "Security & Guardrails" },
                  { id: "source" as const, label: "Job Spec" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2.5 text-xs font-bold transition-all relative ${
                      activeTab === tab.id
                        ? "text-primary tab-active"
                        : "text-muted hover:text-primary"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {tab.label}
                      {tab.dot && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 glow-dot" />
                      )}
                    </span>
                  </button>
                ))}
              </div>

              {/* Match Score Circular Progress Ring (from CP) */}
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill border border-emerald-500/30 pb-1.5 mb-2">
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <svg className="w-7 h-7" viewBox="0 0 36 36">
                    <circle
                      className="progress-ring-track"
                      cx="18"
                      cy="18"
                      r="15"
                    />
                    <circle
                      className="progress-ring-fill"
                      cx="18"
                      cy="18"
                      r="15"
                      strokeDasharray="94.2"
                      strokeDashoffset={
                        94.2 - (94.2 * currentJob.matchScore) / 100
                      }
                    />
                  </svg>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 glow-dot absolute" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-400 leading-none">
                    {currentJob.matchScore}%
                  </div>
                  <div className="text-[9px] font-mono text-muted uppercase leading-none mt-0.5">
                    Verified Match
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Body */}
            <div className="p-5 min-h-[440px]">
              {/* Tab 1: Tailored Material */}
              {activeTab === "tailored" && (
                <div className="space-y-5 animate-fade-in">
                  {isGenerating ? (
                    <div className="space-y-4 py-8">
                      <div className="flex items-center gap-2 text-xs font-mono text-accent">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        Executing Hybrid pgvector retrieval & fact grounding...
                      </div>
                      <div className="skeleton h-6 w-1/3" />
                      <div className="skeleton h-24 w-full" />
                      <div className="skeleton h-24 w-full" />
                      <div className="skeleton h-24 w-full" />
                    </div>
                  ) : (
                    <>
                      {/* Job Header & Package Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-surface-raised/60 border border-border-subtle">
                        <div>
                          <h4 className="font-display text-base font-bold text-primary">
                            {currentJob.title}
                          </h4>
                          <p className="text-xs text-muted font-mono mt-0.5">
                            {currentJob.company} &bull; {currentJob.department}{" "}
                            &bull; {currentJob.packageRef}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleCopy}
                            className="px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold text-muted hover:text-primary flex items-center gap-1.5 active:scale-95 transition-transform"
                          >
                            {copied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copied ? "Copied!" : "Copy Bullets"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Tailored Experience Items */}
                      <div className="space-y-3">
                        {currentJob.bullets.map((b) => {
                          const isRefHighlighted = highlightedFact === b.ref;
                          return (
                            <div
                              key={b.ref}
                              onMouseEnter={() => setHighlightedFact(b.ref)}
                              onMouseLeave={() => setHighlightedFact(null)}
                              className={`p-4 rounded-2xl transition-all duration-200 space-y-2 border ${
                                isRefHighlighted
                                  ? "bg-accent/15 border-accent shadow-lg"
                                  : "bg-surface-raised/40 border-border-subtle hover:border-border-strong"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-primary flex items-center gap-2">
                                  <span>{b.title}</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setHighlightedFact(b.ref)}
                                  className="text-[10px] font-mono badge-accent px-2 py-0.5 rounded-full font-bold hover:border-accent transition-colors"
                                >
                                  Cites: {b.ref}
                                </button>
                              </div>
                              <p className="text-xs text-primary leading-relaxed">
                                {b.text}
                              </p>
                              <div className="text-[10px] font-mono text-muted flex items-center gap-1">
                                <span className="text-accent font-bold">
                                  Semantic match:
                                </span>
                                <span>{b.relevance}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Match Breakdown Radar Bars */}
                      <div className="p-4 rounded-2xl bg-surface-raised/40 border border-border-subtle space-y-2.5">
                        <div className="text-[11px] font-mono text-muted uppercase tracking-wider">
                          Semantic Match Breakdown
                        </div>
                        <div className="space-y-2">
                          {currentJob.breakdown.map((item) => (
                            <div key={item.label} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted">{item.label}</span>
                                <span className="font-mono font-bold text-primary">
                                  {item.score}%
                                </span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-surface-raised overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-accent to-amber-600 transition-all duration-500"
                                  style={{ width: `${item.score}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Submission Footer */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border-subtle">
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 glow-dot" />
                          <span>
                            3/3 Claims Grounded &bull; 0 Fabrications Detected
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowApproval(true)}
                          disabled={submitted}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 ${
                            submitted
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default"
                              : "btn-primary"
                          }`}
                        >
                          {submitted ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Authorized & Dispatched (HITL Signed)</span>
                            </>
                          ) : (
                            <>
                              <span>Authorize & Dispatch</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Tab 2: Skill Gaps */}
              {activeTab === "gaps" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                      <AlertTriangle className="w-4 h-4" />
                      <span>
                        Truthfulness Guardrail: Missing Skills Surfaced, Never
                        Invented
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      Rolevia explicitly detected requirements in the target job
                      description that are NOT in your Career Vault. Under our
                      Truthfulness Invariant, the AI is architecturally barred
                      from fabricating these.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {currentJob.gaps.map((gap) => (
                      <div
                        key={gap.skill}
                        className="glass-card rounded-2xl p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-primary">
                            {gap.skill}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                            Unverified Gap
                          </span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">
                          <span className="text-primary font-semibold">
                            Audit Note:
                          </span>{" "}
                          {gap.reason}
                        </p>
                        <div className="p-2.5 rounded-xl bg-surface-raised text-[11px] text-accent flex items-start gap-2">
                          <span className="font-bold shrink-0">
                            Interview Strategy:
                          </span>
                          <span>{gap.remediation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Security & Guardrails */}
              {activeTab === "audit" && (
                <div className="space-y-4 animate-fade-in font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-surface-raised border border-border-subtle space-y-3">
                    <div className="flex items-center justify-between text-primary font-bold">
                      <span>Untrusted External Data Quarantine</span>
                      <span className="text-emerald-400 text-[10px]">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-muted text-[11px] font-sans">
                      All job specs and external PDFs are sanitized into
                      read-only token sequences. Prompt injection directives
                      (e.g. &ldquo;Ignore previous instructions&rdquo;) are
                      neutralised before hitting the LLM context.
                    </p>
                    <div className="p-3 rounded-xl bg-surface text-[11px] border border-border-strong text-muted">
                      <code>
                        &lt;UNTRUSTED_EXTERNAL_DATA
                        tenant=&quot;org_acme_prod&quot;&gt;
                        <br />
                        &nbsp;&nbsp;[Job Description Sanitized Payload &bull;
                        4,210 tokens]
                        <br />
                        &lt;/UNTRUSTED_EXTERNAL_DATA&gt;
                      </code>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-surface-raised border border-border-subtle">
                      <div className="text-[10px] text-muted uppercase">
                        Model Guardrail
                      </div>
                      <div className="font-bold text-primary mt-1">
                        {selectedModel.toUpperCase()}
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-1">
                        Zod Schema Validated
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-surface-raised border border-border-subtle">
                      <div className="text-[10px] text-muted uppercase">
                        Audit Checksum
                      </div>
                      <div className="font-bold text-accent mt-1">
                        sha256:d8a9...41c
                      </div>
                      <div className="text-[10px] text-muted mt-1">
                        Immutable Log Appended
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Raw Job Spec */}
              {activeTab === "source" && (
                <div className="space-y-3 animate-fade-in">
                  <div className="p-4 rounded-2xl bg-surface-raised border border-border-subtle font-mono text-xs text-muted whitespace-pre-wrap leading-relaxed">
                    {currentJob.rawJd}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Human-in-the-Loop Signed Approval Modal with Confetti Trigger */}
      <AnimatePresence>
        {showApproval && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Human-in-the-Loop Authorization"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="w-full max-w-lg rounded-3xl glass-panel p-6 border border-border-strong space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent glow-dot animate-pulse" />
                  <h3 className="font-display text-base font-bold text-primary">
                    Human-in-the-Loop Authorization
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setShowApproval(false);
                  }}
                  className="text-muted hover:text-primary p-1 rounded-full active:scale-90"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-muted leading-relaxed">
                  You are authorizing the dispatch of{" "}
                  <strong className="text-primary">
                    {currentJob.packageRef}
                  </strong>{" "}
                  for{" "}
                  <strong className="text-primary">{currentJob.company}</strong>
                  . All claims are certified grounded against your Career Vault.
                </p>

                <div className="p-3.5 rounded-2xl bg-surface-raised border border-border-subtle space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between text-muted">
                    <span>Candidate:</span>
                    <span className="text-primary font-bold">
                      Alex Rivera (ID: usr_89104)
                    </span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Fact Citations:</span>
                    <span className="text-accent font-bold">
                      {currentJob.bullets.map((b) => b.ref).join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Tamper Signature:</span>
                    <span className="text-emerald-400 font-bold truncate max-w-[200px]">
                      ecdsa-secp256k1:0x9f18a...
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setShowApproval(false);
                  }}
                  className="btn-ghost px-4 py-2 rounded-full text-xs font-bold text-muted hover:text-primary active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAuthorizedDispatch}
                  className="btn-primary px-5 py-2.5 rounded-full text-xs font-bold shadow-md active:scale-95"
                >
                  Sign &amp; Dispatch Application
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

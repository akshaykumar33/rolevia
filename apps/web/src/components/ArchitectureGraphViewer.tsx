"use client";

import React, { useState } from "react";
import {
  Layers,
  Database,
  ShieldCheck,
  FileCode,
  ArrowRight,
  Lock,
  Copy,
  Check,
  Cpu,
} from "lucide-react";
import { CustomSelect, SelectOption } from "./CustomSelect";
import { soundEngine } from "../lib/soundEffects";

interface ContextDetail {
  id: string;
  name: string;
  layer: "Kernel" | "Intelligence" | "Orchestration" | "Egress";
  domain: string;
  role: string;
  databasePolicy: string;
  contracts: string[];
  eventsEmitted: string[];
  typeScriptSnippet: string;
  rlsPolicySql: string;
}

export function ArchitectureGraphViewer() {
  const [selectedContext, setSelectedContext] = useState<string>("identity");
  const [activeSubTab, setActiveSubTab] = useState<
    "contracts" | "rls" | "events"
  >("contracts");
  const [copied, setCopied] = useState(false);

  const contexts: Record<string, ContextDetail> = {
    identity: {
      id: "identity",
      name: "1. Identity & Tenancy Context",
      layer: "Kernel",
      domain: "Authentication, Workspace Memberships, RBAC/ABAC",
      role: "Root tenant context gatekeeper. Generates session JWTs with strict claims.",
      databasePolicy:
        "Kernel-level RLS: tables 'tenants', 'workspaces', 'workspace_memberships'.",
      contracts: ["TenantContext", "WorkspaceMembershipRole", "SessionClaims"],
      eventsEmitted: [
        "identity.user.registered",
        "identity.workspace.switched",
        "identity.session.revoked",
      ],
      typeScriptSnippet: `export interface TenantContext {
  tenantId: string; // UUID v4
  workspaceId: string;
  roles: Array<"admin" | "member" | "viewer">;
  enforceRls: true;
}`,
      rlsPolicySql: `CREATE POLICY tenant_isolation ON workspaces
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);`,
    },
    vault: {
      id: "vault",
      name: "4. Documents & Career Vault",
      layer: "Kernel",
      domain: "Candidate Career Assets & Verifiable Claims",
      role: "Encrypted document storage (S3) with SHA-256 chunk attribution.",
      databasePolicy: "Tenant + Workspace RLS on 'candidate_vault_documents'.",
      contracts: ["DocumentChunk", "VerifiedFact", "CareerAssetMetadata"],
      eventsEmitted: [
        "vault.document.uploaded",
        "vault.chunking.completed",
        "vault.fact.verified",
      ],
      typeScriptSnippet: `export interface VerifiedFact {
  id: string; // FACT-xxxx
  tenantId: string;
  candidateId: string;
  statement: string;
  sourceDocHash: string; // sha256
  confidenceScore: number; // 0.0 - 1.0
  verifiedAt: string;
}`,
      rlsPolicySql: `CREATE POLICY vault_candidate_isolation ON candidate_vault_documents
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid
     AND workspace_id = current_setting('app.current_workspace_id')::uuid);`,
    },
    contextEngine: {
      id: "contextEngine",
      name: "6. Context Engine (pgvector RAG)",
      layer: "Intelligence",
      domain: "Semantic Embedding & Hybrid Retrieval",
      role: "pgvector HNSW index with tsvector BM25 and Reciprocal Rank Fusion.",
      databasePolicy:
        "Enforces tenant_id, workspace_id, and candidate_id on all vector queries.",
      contracts: ["HybridSearchParams", "AttributedChunkResult", "RrfScore"],
      eventsEmitted: [
        "context.embedding.generated",
        "context.retrieval.executed",
      ],
      typeScriptSnippet: `export interface AttributedChunkResult {
  chunkId: string;
  factId: string;
  denseSimilarity: number; // Cosine
  sparseScore: number;     // BM25
  rrfScore: number;        // Reciprocal Rank
  groundedQuote: string;
}`,
      rlsPolicySql: `SELECT chunk_id, fact_id,
       1 - (embedding <=> $1::vector) AS cosine_sim
FROM career_chunk_embeddings
WHERE tenant_id = current_setting('app.current_tenant_id')::uuid
ORDER BY cosine_sim DESC LIMIT 10;`,
    },
    matching: {
      id: "matching",
      name: "8. Job Matching & Gap Analysis",
      layer: "Intelligence",
      domain: "Candidate-to-Job Semantic Fit",
      role: "Evaluates requirements, computes semantic match scores, flags missing skills.",
      databasePolicy:
        "Read-only access to normalized job postings and candidate facts.",
      contracts: ["JobMatchBreakdown", "MissingSkillGap", "MatchScore"],
      eventsEmitted: ["job.match.computed", "job.gaps.detected"],
      typeScriptSnippet: `export interface JobMatchBreakdown {
  jobId: string;
  overallScore: number; // 0-100
  verifiedMatchSkills: string[];
  missingGaps: Array<{
    requiredSkill: string;
    reason: "NOT_FOUND_IN_VAULT";
    recommendation: string;
  }>;
}`,
      rlsPolicySql: `SELECT evaluate_semantic_match(
  candidate_id => $1,
  target_job_id => $2,
  tenant_scope => current_setting('app.current_tenant_id')
);`,
    },
    studio: {
      id: "studio",
      name: "9. Application Studio",
      layer: "Orchestration",
      domain: "Tailored Material Synthesis & State Transitions",
      role: "Synthesizes truthful resumes and cover letters citing verified fact IDs.",
      databasePolicy: "Tenant RLS on 'applications' and 'tailored_versions'.",
      contracts: [
        "TailoredResumeBullet",
        "ApplicationPackage",
        "ApprovalToken",
      ],
      eventsEmitted: [
        "application.tailored.generated",
        "application.candidate.approved",
      ],
      typeScriptSnippet: `export interface TailoredResumeBullet {
  factCitationId: string; // Must match verified vault ID
  headline: string;
  groundedContent: string;
  semanticRelevance: string;
  signature: string;
}`,
      rlsPolicySql: `CREATE POLICY studio_isolation ON applications
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);`,
    },
    workflow: {
      id: "workflow",
      name: "10. Workflow Engine (Temporal)",
      layer: "Orchestration",
      domain: "Durable Orchestration & HITL Gates",
      role: "Long-running durable workflows with timeouts, retries, and human approval signals.",
      databasePolicy:
        "Temporal server managed persistence + application state updates.",
      contracts: ["WorkflowStateSignal", "SubmissionActivityPayload"],
      eventsEmitted: [
        "workflow.submission.started",
        "workflow.approval.received",
        "workflow.completed",
      ],
      typeScriptSnippet: `export interface WorkflowStateSignal {
  workflowId: string;
  signalName: "HUMAN_APPROVAL_GRANTED" | "HUMAN_REJECTION";
  signedBy: string; // Candidate public key
  timestamp: string;
}`,
      rlsPolicySql: `-- Temporal orchestrates state externally via TLS mTLS gRPC
-- Application state transitions logged with tenant checksum.`,
    },
  };

  const current = contexts[selectedContext];

  const contextOptions: SelectOption[] = Object.values(contexts).map((ctx) => ({
    value: ctx.id,
    label: ctx.name,
    sublabel: `${ctx.layer} • ${ctx.domain}`,
    badge: ctx.layer,
  }));

  const handleSelectContext = (id: string) => {
    soundEngine.playClick();
    setSelectedContext(id);
  };

  const handleCopyCode = (text: string) => {
    soundEngine.playSelect();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-5 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent glow-dot" />
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary">
              Bounded Context Topology &amp; System Decoupling
            </h2>
          </div>
          <p className="text-xs text-muted mt-1 font-sans">
            Strict DDD boundaries: 17 decoupled contexts communicating via typed
            asynchronous events and schema contracts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold badge-accent">
            17 Bounded Contexts
          </span>
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold badge-live">
            100% RLS Enforced
          </span>
        </div>
      </div>

      {/* Visual Data Flow Pipeline Diagram */}
      <div className="glass-panel rounded-3xl p-4 border border-border-subtle overflow-x-auto shadow-sm">
        <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-3">
          Synchronous / Asynchronous Architecture Flow
        </div>
        <div className="flex items-center gap-2 min-w-[780px] text-xs font-mono">
          <div className="p-2.5 rounded-2xl bg-accent/15 border border-accent/30 text-accent font-bold flex items-center gap-1.5 shrink-0">
            <Lock className="w-3.5 h-3.5" />
            <span>Identity Gate</span>
            <span className="text-[10px] text-muted">JWT RLS</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted shrink-0" />
          <div className="p-2.5 rounded-2xl bg-surface-raised border border-border-subtle text-primary font-semibold flex items-center gap-1.5 shrink-0">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Career Vault</span>
            <span className="text-[10px] text-emerald-400 font-mono">
              SHA-256
            </span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted shrink-0" />
          <div className="p-2.5 rounded-2xl bg-surface-raised border border-border-subtle text-primary font-semibold flex items-center gap-1.5 shrink-0">
            <Cpu className="w-3.5 h-3.5 text-amber-500" />
            <span>pgvector RAG</span>
            <span className="text-[10px] text-amber-500 font-mono">
              HNSW BM25
            </span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted shrink-0" />
          <div className="p-2.5 rounded-2xl bg-surface-raised border border-border-subtle text-primary font-semibold flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gap Analysis</span>
            <span className="text-[10px] text-accent font-mono">Zero-Fab</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted shrink-0" />
          <div className="p-2.5 rounded-2xl bg-surface-raised border border-border-subtle text-primary font-semibold flex items-center gap-1.5 shrink-0">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <span>Studio Engine</span>
            <span className="text-[10px] text-accent font-mono">Grounded</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted shrink-0" />
          <div className="p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HITL Temporal</span>
            <span className="text-[10px]">Signed</span>
          </div>
        </div>
      </div>

      {/* Mobile Context Selector Dropdown */}
      <div className="lg:hidden flex items-center justify-between gap-3 p-3.5 rounded-2xl glass-panel border border-border-subtle">
        <span className="text-xs font-mono font-semibold text-muted">
          Select Context:
        </span>
        <CustomSelect
          options={contextOptions}
          value={selectedContext}
          onChange={(val) => handleSelectContext(val)}
          align="right"
          ariaLabel="Choose bounded context"
        />
      </div>

      {/* Main Grid: Context Explorer (Left) & Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Context List (Desktop) */}
        <div className="hidden lg:block lg:col-span-5 space-y-2.5">
          {Object.values(contexts).map((ctx) => {
            const isSelected = selectedContext === ctx.id;
            return (
              <button
                key={ctx.id}
                type="button"
                onClick={() => handleSelectContext(ctx.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border active:scale-95 ${
                  isSelected
                    ? "bg-accent/15 border-accent text-primary shadow-md scale-[1.01]"
                    : "bg-surface/70 border-border-subtle hover:border-border-strong text-muted hover:text-primary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary font-display">
                    {ctx.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-surface border border-border-subtle text-muted">
                    {ctx.layer}
                  </span>
                </div>
                <div className="text-[11px] text-muted mt-1 truncate font-sans">
                  {ctx.domain}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Node Inspector */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 border border-border-subtle space-y-4 shadow-sm min-h-[460px]">
            {/* Context Title & Domain */}
            <div className="space-y-1.5 border-b border-border-subtle pb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-primary">
                  {current.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold badge-accent">
                  Layer: {current.layer}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-sans">
                {current.role}
              </p>
            </div>

            {/* Sub-Tabs: TypeScript Contracts vs RLS SQL vs Domain Events */}
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <div className="flex items-center gap-1.5">
                {[
                  {
                    id: "contracts" as const,
                    label: "TypeScript Schema",
                    icon: <FileCode className="w-3.5 h-3.5" />,
                  },
                  {
                    id: "rls" as const,
                    label: "PostgreSQL RLS",
                    icon: <Lock className="w-3.5 h-3.5" />,
                  },
                  {
                    id: "events" as const,
                    label: "Domain Events",
                    icon: <Layers className="w-3.5 h-3.5" />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveSubTab(tab.id);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                      activeSubTab === tab.id
                        ? "bg-accent text-white shadow-sm"
                        : "text-muted hover:text-primary bg-surface-raised/70"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {activeSubTab !== "events" && (
                <button
                  type="button"
                  onClick={() =>
                    handleCopyCode(
                      activeSubTab === "contracts"
                        ? current.typeScriptSnippet
                        : current.rlsPolicySql,
                    )
                  }
                  className="px-3 py-1 rounded-full glass-pill text-xs font-mono text-muted hover:text-primary flex items-center gap-1.5"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              )}
            </div>

            {/* Sub-Tab Contents */}
            {activeSubTab === "contracts" && (
              <div className="space-y-2 animate-fade-in font-mono text-xs">
                <div className="flex items-center justify-between text-muted text-[11px]">
                  <span>Exported Types: {current.contracts.join(", ")}</span>
                  <span className="text-accent font-bold">
                    Strict Zod Guarded
                  </span>
                </div>
                <pre className="p-4 rounded-2xl bg-surface/90 border border-border-strong text-amber-200 overflow-x-auto text-[11px] leading-relaxed">
                  <code>{current.typeScriptSnippet}</code>
                </pre>
              </div>
            )}

            {activeSubTab === "rls" && (
              <div className="space-y-2 animate-fade-in font-mono text-xs">
                <div className="text-muted text-[11px]">
                  Policy: {current.databasePolicy}
                </div>
                <pre className="p-4 rounded-2xl bg-surface/90 border border-border-strong text-emerald-300 overflow-x-auto text-[11px] leading-relaxed">
                  <code>{current.rlsPolicySql}</code>
                </pre>
              </div>
            )}

            {activeSubTab === "events" && (
              <div className="space-y-2 animate-fade-in">
                <div className="text-xs text-muted font-sans">
                  Domain events emitted via transactional outbox to NATS /
                  EventBridge:
                </div>
                <div className="space-y-1.5 font-mono text-xs">
                  {current.eventsEmitted.map((ev) => (
                    <div
                      key={ev}
                      className="p-2.5 rounded-xl bg-surface-raised/70 border border-border-subtle text-primary flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent glow-dot" />
                      <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

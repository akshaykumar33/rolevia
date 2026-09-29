"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Network,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { soundEngine } from "../lib/soundEffects";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onNavigateTab?: (
    tab: "cockpit" | "state_machine" | "architecture" | "tokens",
  ) => void;
}

export function HeroSection({ onNavigateTab }: HeroSectionProps) {
  const [copiedToken, setCopiedToken] = useState(false);

  const handleCopySessionToken = () => {
    soundEngine.playSelect();
    navigator.clipboard.writeText(
      "jwt_tenant_org_acme_prod_sub_89104_claims_strict_rls",
    );
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <section className="relative pt-4 pb-8 sm:pt-6 sm:pb-12 overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-600/8 rounded-full blur-[130px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Hero messaging */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Status pill badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold badge-live">
              <span className="w-2 h-2 rounded-full bg-emerald-400 glow-dot animate-pulse" />
              Rolevia Studio &bull; v0.1.0
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold badge-accent">
              <Zap className="w-3.5 h-3.5" />
              Next.js 15 &bull; React 19
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Lock className="w-3 h-3" />
              pgvector &bull; Strict RLS
            </span>
          </div>

          {/* Headline with Fraunces Display Serif (from CP) */}
          <div className="space-y-3">
            <h1 className="font-display heading-hero font-extrabold tracking-tight text-primary">
              The{" "}
              <span className="gradient-text italic font-serif">
                Truthful AI
              </span>
              <br />
              Career Operating System.
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl font-normal font-sans">
              Handcrafted career intelligence, cryptographic fact provenance,
              and zero-fabrication AI synthesis. Built for candidates whose
              experience is authentic and uncompromised.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                if (onNavigateTab) onNavigateTab("cockpit");
              }}
              className="btn-primary px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <span>Launch Career Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                if (onNavigateTab) onNavigateTab("architecture");
              }}
              className="btn-ghost px-4 py-2.5 rounded-full text-xs font-bold text-muted hover:text-primary flex items-center gap-2 active:scale-95"
            >
              <Network className="w-4 h-4 text-accent" />
              <span>Inspect Architecture</span>
            </button>

            <button
              type="button"
              onClick={handleCopySessionToken}
              className="px-3.5 py-2 rounded-full glass-pill text-xs font-mono font-semibold text-muted hover:text-primary flex items-center gap-2 transition-colors active:scale-95"
              title="Copy verified tenant JWT token"
            >
              {copiedToken ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedToken ? "Copied JWT!" : "Copy Tenant JWT"}</span>
            </button>
          </div>

          {/* Core Invariants Mini Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl glass-card border border-border-subtle flex items-start gap-2.5 interactive-glow">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 glow-dot mt-1 shrink-0" />
              <div>
                <div className="text-xs font-bold text-primary font-display">
                  Zero Fabrication
                </div>
                <div className="text-[11px] text-muted leading-tight font-sans">
                  Facts strictly outrank AI inference
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-card border border-border-subtle flex items-start gap-2.5 interactive-glow">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 glow-dot mt-1 shrink-0" />
              <div>
                <div className="text-xs font-bold text-primary font-display">
                  Kernel Multi-Tenancy
                </div>
                <div className="text-[11px] text-muted leading-tight font-sans">
                  Postgres tenant &amp; workspace bound
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-card border border-border-subtle flex items-start gap-2.5 interactive-glow">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 glow-dot mt-1 shrink-0" />
              <div>
                <div className="text-xs font-bold text-primary font-display">
                  Human-in-the-Loop
                </div>
                <div className="text-[11px] text-muted leading-tight font-sans">
                  Signed cryptographic approval
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: Interactive Telemetry & Engine Daemon Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="glass-panel rounded-3xl border border-border-strong overflow-hidden shadow-2xl relative interactive-glow">
            {/* Terminal Title Bar */}
            <div className="px-5 py-3.5 bg-surface/90 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono font-bold text-primary ml-2">
                  rolevia-core-daemon
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ONLINE
                </span>
                <span className="text-[10px] font-mono text-muted">
                  PID: 89412
                </span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-5 space-y-4 font-mono text-xs">
              {/* Telemetry Metric Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-surface/70 border border-border-subtle">
                  <div className="text-[10px] text-muted uppercase">
                    Grounded Ratio
                  </div>
                  <div className="text-base font-bold text-emerald-400">
                    100.0%
                  </div>
                  <div className="text-[9px] text-muted">
                    0 unverified claims
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-surface/70 border border-border-subtle">
                  <div className="text-[10px] text-muted uppercase">
                    HNSW Retrieval
                  </div>
                  <div className="text-base font-bold text-amber-500">
                    18.4ms
                  </div>
                  <div className="text-[9px] text-muted">
                    pgvector cosine top-k
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-surface/70 border border-border-subtle">
                  <div className="text-[10px] text-muted uppercase">
                    Bounded Contexts
                  </div>
                  <div className="text-base font-bold text-primary">
                    17 / 17
                  </div>
                  <div className="text-[9px] text-muted">Fully decoupled</div>
                </div>

                <div className="p-3 rounded-2xl bg-surface/70 border border-border-subtle">
                  <div className="text-[10px] text-muted uppercase">
                    UX State Coverage
                  </div>
                  <div className="text-base font-bold text-orange-400">
                    10 / 10
                  </div>
                  <div className="text-[9px] text-muted">
                    Zero unhandled states
                  </div>
                </div>
              </div>

              {/* Real-time Pipeline Execution Trace */}
              <div className="space-y-2 pt-2 border-t border-border-subtle">
                <div className="text-[10px] text-muted uppercase tracking-wider mb-1">
                  Live Execution Trace
                </div>
                <div className="flex items-center justify-between text-[11px] text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <span>✓</span>
                    <span>RLS Context Authenticated</span>
                  </span>
                  <span className="text-muted text-[10px]">org_acme_prod</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <span>✓</span>
                    <span>Fact Hash Verified (SHA-256)</span>
                  </span>
                  <span className="text-muted text-[10px]">5 Chunks</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-amber-500">
                  <span className="flex items-center gap-1.5">
                    <span>✓</span>
                    <span>Reciprocal Rank Fusion</span>
                  </span>
                  <span className="text-muted text-[10px]">BM25 + Dense</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-accent">
                  <span className="flex items-center gap-1.5">
                    <span className="animate-spin text-accent">●</span>
                    <span>HITL Guardrail Active</span>
                  </span>
                  <span className="text-muted text-[10px]">
                    Awaiting Dispatch
                  </span>
                </div>
              </div>

              {/* Security signature footer */}
              <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[10px] text-muted">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Isolation: Kernel PostgreSQL RLS</span>
                </span>
                <span className="text-emerald-400 font-bold">SECURE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

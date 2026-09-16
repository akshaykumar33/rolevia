import { BRAND_CONFIG } from '@rolevia/config';
import { DESIGN_TOKENS } from '@rolevia/ui';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-6 md:p-12 max-w-6xl mx-auto">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-6 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-raised border border-border-strong flex items-center justify-center font-mono font-bold text-accent text-sm shadow-sm">
            R
          </div>
          <div>
            <h1 className="font-semibold tracking-tight text-sm text-primary">
              {BRAND_CONFIG.displayName}
            </h1>
            <p className="text-xs text-muted font-mono">
              {BRAND_CONFIG.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            PHASE 0: FOUNDATION
          </span>
        </div>
      </header>

      {/* Main Status & Architecture Shell */}
      <section className="my-auto py-12 space-y-8">
        <div className="max-w-2xl space-y-4">
          <div className="inline-block text-xs font-mono text-accent uppercase tracking-wider">
            Repository Baseline Verified
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary">
            Engineering Operating System Active
          </h2>
          <p className="text-muted leading-relaxed text-sm md:text-base">
            {BRAND_CONFIG.missionStatement}
          </p>
        </div>

        {/* System Invariants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-xl bg-surface border border-border-subtle space-y-2.5 transition-colors hover:border-border-strong">
            <div className="text-xs font-mono text-muted uppercase">Invariant 01</div>
            <h3 className="text-sm font-medium text-primary">Zero Credential Fabrication</h3>
            <p className="text-xs text-muted leading-relaxed">
              AI agents are cryptographically bounded. Facts confirmed by the user hold absolute precedence over model inferences.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border-subtle space-y-2.5 transition-colors hover:border-border-strong">
            <div className="text-xs font-mono text-muted uppercase">Invariant 02</div>
            <h3 className="text-sm font-medium text-primary">Strict Logical Multi-Tenancy</h3>
            <p className="text-xs text-muted leading-relaxed">
              Every database query, vector search, and cache key is scoped to verified tenant and workspace boundaries.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border-subtle space-y-2.5 transition-colors hover:border-border-strong">
            <div className="text-xs font-mono text-muted uppercase">Invariant 03</div>
            <h3 className="text-sm font-medium text-primary">Human Agency & Consent</h3>
            <p className="text-xs text-muted leading-relaxed">
              Consequential third-party interactions and application submissions require explicit, authenticated human approval.
            </p>
          </div>
        </div>

        {/* Design Tokens & Theme Diagnostics */}
        <div className="p-6 rounded-xl bg-surface border border-border-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider">
              Design Token System Active
            </h3>
            <span className="text-xs font-mono text-muted">
              Font: {DESIGN_TOKENS.typography.fontSans.split(',')[0]}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-xs">
              <span className="w-3 h-3 rounded-full bg-accent" />
              <span className="font-mono text-muted">--accent-primary</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-xs">
              <span className="w-3 h-3 rounded-full bg-success" />
              <span className="font-mono text-muted">--status-success</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-xs">
              <span className="w-3 h-3 rounded-full bg-warning" />
              <span className="font-mono text-muted">--status-warning</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-xs">
              <span className="w-3 h-3 rounded-full bg-danger" />
              <span className="font-mono text-muted">--status-danger</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-xs">
              <span className="w-3 h-3 rounded-full bg-base border border-border-strong" />
              <span className="font-mono text-muted">--bg-base</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Repository Provenance */}
      <footer className="pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted font-mono">
        <div>
          {BRAND_CONFIG.legalEntity} &bull; Phase 0 Foundation
        </div>
        <div className="flex items-center gap-4">
          <span>Docs: /docs</span>
          <span>ADRs: /docs/adr</span>
          <span>Memory: /.ai</span>
        </div>
      </footer>
    </main>
  );
}

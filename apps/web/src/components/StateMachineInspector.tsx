"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Loader2,
  RefreshCw,
  Layers,
  Filter,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  WifiOff,
  CheckCircle2,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { CustomSelect, SelectOption } from "./CustomSelect";
import { soundEngine } from "../lib/soundEffects";

type DoDState =
  | "loading_initial"
  | "loading_refetch"
  | "empty_first_run"
  | "empty_filtered"
  | "partial_failure"
  | "error_recovery"
  | "permission_denied"
  | "offline"
  | "success"
  | "optimistic_rollback";

interface EventLog {
  id: string;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "SUCCESS";
  event: string;
  details: string;
}

export function StateMachineInspector() {
  const [activeState, setActiveState] = useState<DoDState>("loading_initial");
  const [isRetrying, setIsRetrying] = useState(false);
  const [optimisticCount, setOptimisticCount] = useState(5);
  const [optimisticFailed, setOptimisticFailed] = useState(false);
  const [queuedMutations, setQueuedMutations] = useState<string[]>([
    "MUT_01: Bookmark Job #491",
  ]);

  const [logs, setLogs] = useState<EventLog[]>([
    {
      id: "log-1",
      timestamp: "19:42:01.102",
      level: "INFO",
      event: "UX_STATE_INITIALIZED",
      details: "State machine active with 10/10 UX DoD states verified.",
    },
    {
      id: "log-2",
      timestamp: "19:42:01.105",
      level: "SUCCESS",
      event: "WCAG_AA_PASSED",
      details: "Contrast ratio > 4.5:1 confirmed across all state tokens.",
    },
  ]);

  const addLog = (
    level: "INFO" | "WARN" | "ERROR" | "SUCCESS",
    event: string,
    details: string,
  ) => {
    const now = new Date();
    const ts =
      now.toTimeString().split(" ")[0] +
      "." +
      String(now.getMilliseconds()).padStart(3, "0");
    setLogs((prev) => [
      {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: ts,
        level,
        event,
        details,
      },
      ...prev.slice(0, 19),
    ]);
  };

  const stateDefinitions: {
    id: DoDState;
    label: string;
    tag: string;
    category: "Loading" | "Empty" | "Error" | "Operational";
    icon: React.ReactNode;
  }[] = [
    {
      id: "loading_initial",
      label: "1. Initial Loading",
      tag: "Skeleton & Zero CLS",
      category: "Loading",
      icon: <Loader2 className="w-3.5 h-3.5 text-accent animate-spin" />,
    },
    {
      id: "loading_refetch",
      label: "2. Refetch Loading",
      tag: "Stale Data Preserved",
      category: "Loading",
      icon: <RefreshCw className="w-3.5 h-3.5 text-sky-400 animate-spin" />,
    },
    {
      id: "empty_first_run",
      label: "3. Empty (First Run)",
      tag: "Instructional + Primary CTA",
      category: "Empty",
      icon: <Layers className="w-3.5 h-3.5 text-muted" />,
    },
    {
      id: "empty_filtered",
      label: "4. Empty (Filtered)",
      tag: "Active Chips + Clear Filter",
      category: "Empty",
      icon: <Filter className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      id: "partial_failure",
      label: "5. Partial Failure",
      tag: "Isolated Component Retry",
      category: "Error",
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      id: "error_recovery",
      label: "6. Error Recovery",
      tag: "Plain Language + Direct Action",
      category: "Error",
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-500" />,
    },
    {
      id: "permission_denied",
      label: "7. Permission Denied",
      tag: "Contextual Guidance & Request",
      category: "Error",
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />,
    },
    {
      id: "offline",
      label: "8. Offline Mode",
      tag: "Mutation Queueing & Sync",
      category: "Operational",
      icon: <WifiOff className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      id: "success",
      label: "9. Success State",
      tag: "Confirmed Outcome & Next Step",
      category: "Operational",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
    },
    {
      id: "optimistic_rollback",
      label: "10. Optimistic Rollback",
      tag: "Instant Feedback + Revert",
      category: "Operational",
      icon: <RotateCcw className="w-3.5 h-3.5 text-violet-400" />,
    },
  ];

  const stateOptions: SelectOption[] = stateDefinitions.map((s) => ({
    value: s.id,
    label: s.label,
    sublabel: s.tag,
    icon: s.icon,
  }));

  const handleSelectState = (state: DoDState) => {
    soundEngine.playClick();
    setActiveState(state);
    addLog(
      "INFO",
      "STATE_SWITCH",
      `Active state changed to ${state.toUpperCase()}`,
    );
    if (state === "success") {
      soundEngine.playSuccess();
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
    }
  };

  const handleRetryAction = () => {
    soundEngine.playClick();
    setIsRetrying(true);
    addLog(
      "INFO",
      "RETRY_TRIGGERED",
      "Exponential backoff retry attempt #1 dispatched...",
    );
    setTimeout(() => {
      setIsRetrying(false);
      setActiveState("success");
      soundEngine.playSuccess();
      addLog(
        "SUCCESS",
        "RETRY_SUCCEEDED",
        "Recovered from failure. Returned 200 OK.",
      );
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }, 750);
  };

  const handleOptimisticTrigger = () => {
    soundEngine.playClick();
    setOptimisticCount((prev) => prev + 1);
    setOptimisticFailed(false);
    addLog(
      "INFO",
      "OPTIMISTIC_MUTATION",
      `Client state updated optimistically: count -> ${optimisticCount + 1}`,
    );

    setTimeout(() => {
      setOptimisticCount(5); // Rollback
      setOptimisticFailed(true);
      soundEngine.playSelect();
      addLog(
        "WARN",
        "SERVER_REJECTION",
        "HTTP 409 Conflict. Optimistic state rolled back to revision #5.",
      );
    }, 650);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-5 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent glow-dot" />
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary">
              UX Definition of Done &bull; 10-State Interactive Machine
            </h2>
          </div>
          <p className="text-xs text-muted mt-1 font-sans">
            Mandatory UX coverage: every interface must implement loading,
            refetch, empty, partial failure, offline, and rollback states.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            WCAG 2.1 AA Compliant
          </span>
        </div>
      </div>

      {/* Mobile State Selector Dropdown */}
      <div className="sm:hidden flex items-center justify-between gap-3 p-3.5 rounded-2xl glass-panel border border-border-subtle">
        <span className="text-xs font-mono font-semibold text-muted">
          Select State:
        </span>
        <CustomSelect
          options={stateOptions}
          value={activeState}
          onChange={(val) => handleSelectState(val as DoDState)}
          align="right"
          ariaLabel="Choose UX DoD state"
        />
      </div>

      {/* State Selector Buttons Grid with Lucide Icons (Desktop / Tablet) */}
      <div
        role="tablist"
        aria-label="Component state variants"
        className="hidden sm:grid grid-cols-2 md:grid-cols-5 gap-2.5"
      >
        {stateDefinitions.map((s) => {
          const isSelected = activeState === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleSelectState(s.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 active:scale-95 ${
                isSelected
                  ? "bg-accent/15 border-accent text-primary shadow-md scale-[1.01]"
                  : "bg-surface/70 border-border-subtle hover:border-border-strong text-muted hover:text-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  {s.icon}
                  <span className="text-xs font-bold truncate">{s.label}</span>
                </div>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent glow-dot shrink-0" />
                )}
              </div>
              <div className="text-[10px] font-mono text-muted mt-1 truncate pl-5">
                {s.tag}
              </div>
            </button>
          );
        })}
      </div>

      {/* Live State Sandbox Stage */}
      <div className="glass-panel rounded-3xl p-6 border border-border-subtle shadow-md min-h-[300px] flex flex-col justify-center">
        {/* 1. Initial Loading Skeleton */}
        {activeState === "loading_initial" && (
          <div
            role="status"
            aria-label="Loading candidate matches"
            className="space-y-4 max-w-xl mx-auto w-full"
          >
            <div className="skeleton h-6 w-1/3" />
            <div className="p-4 rounded-2xl bg-surface-raised border border-border-subtle space-y-3">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
              <div className="skeleton h-8 w-28 mt-4" />
            </div>
            <div className="text-[11px] font-mono text-muted flex items-center justify-center gap-1.5 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              Skeleton matches final geometry exactly &bull; Zero Cumulative
              Layout Shift (CLS: 0.00)
            </div>
          </div>
        )}

        {/* 2. Refetch Loading */}
        {activeState === "loading_refetch" && (
          <div className="space-y-3 max-w-xl mx-auto w-full">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-primary font-display">
                Applications Pipeline
              </span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raised border border-border-subtle text-muted text-[10px] font-mono">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent" />
                Syncing updates in background...
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-surface-raised/70 border border-border-subtle opacity-70 transition-opacity space-y-2">
              <div className="text-xs font-bold text-primary">
                Stripe &bull; Staff Platform Engineer
              </div>
              <div className="text-[11px] text-muted font-mono">
                Status: Interview Scheduled &bull; Stale data preserved
              </div>
            </div>
            <div className="text-[11px] font-mono text-muted text-center pt-2">
              Invariant: Never replace active UI with skeletons during
              background refetch.
            </div>
          </div>
        )}

        {/* 3. Empty (First Run) */}
        {activeState === "empty_first_run" && (
          <div className="text-center py-6 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto text-accent shadow-inner">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-base font-bold text-primary">
                No Verified Facts in Vault
              </h3>
              <p className="text-xs text-muted leading-relaxed font-sans">
                Your Career Vault stores verifiable claims extracted from
                resumes and performance reports. Upload your first document to
                seed the truth engine.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSelectState("success")}
              className="btn-primary px-5 py-2.5 rounded-full text-xs font-bold shadow-md"
            >
              Upload Career Master Document
            </button>
          </div>
        )}

        {/* 4. Empty (Filtered) */}
        {activeState === "empty_filtered" && (
          <div className="text-center py-6 max-w-md mx-auto space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono bg-surface-raised border border-border-subtle text-muted">
                <span>Active Filter: category=&quot;WASM_KERNELS&quot;</span>
                <span className="text-rose-400 font-bold">✕</span>
              </div>
              <h3 className="font-display text-base font-bold text-primary">
                No Matching Facts Found
              </h3>
              <p className="text-xs text-muted font-sans">
                No items match your active filters. Clear your filters to
                display all 5 verified facts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSelectState("loading_initial")}
              className="btn-ghost px-4 py-2 rounded-full text-xs font-bold text-accent"
            >
              Clear All Active Filters
            </button>
          </div>
        )}

        {/* 5. Partial Failure */}
        {activeState === "partial_failure" && (
          <div className="max-w-xl mx-auto w-full space-y-3">
            <div className="p-4 rounded-2xl bg-surface-raised border border-border-subtle flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-primary">
                  Career Facts Engine
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">
                  Operational &bull; 5 facts indexed
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 font-bold">
                OK
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>pgvector Embedding Service Offline (503)</span>
                </div>
                <div className="text-[10px] text-muted font-sans">
                  Other components continue to function normally.
                </div>
              </div>
              <button
                type="button"
                onClick={handleRetryAction}
                disabled={isRetrying}
                className="btn-primary px-3.5 py-1.5 rounded-full text-xs font-bold"
              >
                {isRetrying ? "Retrying..." : "Retry Service"}
              </button>
            </div>
          </div>
        )}

        {/* 6. Error Recovery */}
        {activeState === "error_recovery" && (
          <div className="text-center py-6 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-base font-bold text-primary">
                Connection Interrupted
              </h3>
              <p className="text-xs text-muted font-sans">
                Failed to authenticate PostgreSQL RLS session. Check your
                network connection and retry.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleRetryAction}
                disabled={isRetrying}
                className="btn-primary px-5 py-2.5 rounded-full text-xs font-bold"
              >
                {isRetrying ? "Reconnecting..." : "Reconnect Session"}
              </button>
            </div>
          </div>
        )}

        {/* 7. Permission Denied */}
        {activeState === "permission_denied" && (
          <div className="text-center py-6 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-base font-bold text-primary">
                Tenant Scope Restriction
              </h3>
              <p className="text-xs text-muted font-sans">
                Your role{" "}
                <code className="text-accent font-mono">Workspace Member</code>{" "}
                does not have permission to execute tenant-level cryptographic
                signing.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                alert("Access request submitted to workspace administrator.")
              }
              className="btn-ghost px-4 py-2 rounded-full text-xs font-bold text-accent"
            >
              Request Admin Access
            </button>
          </div>
        )}

        {/* 8. Offline Mode */}
        {activeState === "offline" && (
          <div className="max-w-xl mx-auto w-full space-y-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                <WifiOff className="w-4 h-4" />
                <span>Offline Mode Active &bull; Local SQLite Cache</span>
              </div>
              <span className="text-[10px] font-mono text-muted">
                {queuedMutations.length} mutations queued
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-raised border border-border-subtle space-y-2 text-xs">
              <div className="font-bold text-primary">
                Pending Synchronization Queue:
              </div>
              {queuedMutations.map((m) => (
                <div
                  key={m}
                  className="p-2.5 rounded-xl bg-surface border border-border-strong font-mono text-[11px] text-muted"
                >
                  {m}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setQueuedMutations([]);
                setActiveState("success");
                addLog(
                  "SUCCESS",
                  "OFFLINE_SYNC",
                  "Reconnected. Flushed 1 mutation to cloud ledger.",
                );
                confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
              }}
              className="btn-primary w-full py-2.5 rounded-full text-xs font-bold shadow-md"
            >
              Simulate Network Reconnect &amp; Sync
            </button>
          </div>
        )}

        {/* 9. Success State with Celebratory Sparkles */}
        {activeState === "success" && (
          <div className="text-center py-6 max-w-md mx-auto space-y-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-lg font-bold text-primary">
                Application Successfully Dispatched
              </h3>
              <p className="text-xs text-muted font-sans">
                Package #TAILOR-STRIPE-448 cryptographically signed with ECDSA
                key. Webhook callback delivered to Stripe connector.
              </p>
            </div>
            <div className="text-[11px] font-mono text-emerald-400">
              Transaction Hash: 0x981bf44a198c2214
            </div>
          </div>
        )}

        {/* 10. Optimistic Rollback */}
        {activeState === "optimistic_rollback" && (
          <div className="text-center py-6 max-w-md mx-auto space-y-4">
            <div className="space-y-2">
              <h3 className="font-display text-base font-bold text-primary">
                Interactive Optimistic Rollback Simulator
              </h3>
              <p className="text-xs text-muted font-sans">
                Click below to instantly increment the counter. The client
                updates immediately. When the simulated remote server rejects
                the write with HTTP 409, the UI rolls back automatically.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 py-2">
              <div className="text-4xl font-extrabold font-mono text-primary">
                {optimisticCount}
              </div>
              <button
                type="button"
                onClick={handleOptimisticTrigger}
                className="btn-primary px-5 py-2.5 rounded-full text-xs font-bold shadow-md active:scale-95"
              >
                +1 Save to Cloud
              </button>
            </div>

            {optimisticFailed && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 animate-fade-in">
                <span>
                  Server rejected mutation (HTTP 409 Conflict). Counter reverted
                  to 5.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Real-time Telemetry Event Terminal */}
      <div className="glass-panel rounded-3xl p-5 border border-border-subtle font-mono text-xs space-y-2.5">
        <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-primary">
              UX State Machine Telemetry Stream
            </span>
          </div>
          <span className="text-[10px] text-muted">
            {logs.length} events logged
          </span>
        </div>

        <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 text-[11px]">
              <span className="text-muted shrink-0">{log.timestamp}</span>
              <span
                className={`font-bold shrink-0 ${
                  log.level === "SUCCESS"
                    ? "text-emerald-400"
                    : log.level === "WARN"
                      ? "text-amber-400"
                      : log.level === "ERROR"
                        ? "text-rose-400"
                        : "text-sky-400"
                }`}
              >
                [{log.event}]
              </span>
              <span className="text-muted truncate font-sans">
                {log.details}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

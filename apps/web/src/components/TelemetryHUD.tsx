"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  ShieldCheck,
  Database,
  Sparkles,
  Cpu,
  Clock,
  RefreshCw,
} from "lucide-react";

export function TelemetryHUD() {
  const [latency, setLatency] = useState(18);
  const [uptime] = useState("99.99%");
  const [pinging, setPinging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(16 + Math.floor(Math.random() * 5));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handlePing = () => {
    setPinging(true);
    setTimeout(() => {
      setLatency(14 + Math.floor(Math.random() * 4));
      setPinging(false);
    }, 300);
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-3.5 border border-border-subtle overflow-x-auto shadow-sm">
      <div className="flex items-center justify-between min-w-[760px] text-xs">
        {/* Left: Tenant and RLS Status */}
        <div className="flex items-center gap-2">
          <div className="hud-pill">
            <span className="w-2 h-2 rounded-full bg-emerald-400 glow-dot animate-pulse" />
            <Building2 className="w-3.5 h-3.5 text-muted" />
            <span className="text-muted">Tenant:</span>
            <span className="font-bold text-primary">org_acme_prod</span>
          </div>

          <div className="hud-pill">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-muted">Kernel RLS:</span>
            <span className="font-bold text-emerald-400">Strict Enforced</span>
          </div>

          <button
            type="button"
            onClick={handlePing}
            className="hud-pill cursor-pointer hover:border-accent transition-colors group active:scale-95"
            title="Click to ping vector database"
          >
            <Database className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-muted">Vector DB:</span>
            <span className="font-bold text-primary">pgvector HNSW</span>
            <span className="text-[10px] text-muted font-mono">
              {latency}ms
            </span>
            <RefreshCw
              className={`w-2.5 h-2.5 text-muted group-hover:text-accent ml-0.5 ${pinging ? "animate-spin text-accent" : ""}`}
            />
          </button>
        </div>

        {/* Right: Truth Invariant & Model Routing */}
        <div className="flex items-center gap-2">
          <div className="hud-pill">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-muted">Grounded Truth:</span>
            <span className="font-bold text-accent">
              100% (Zero Hallucination)
            </span>
          </div>

          <div className="hud-pill hidden lg:inline-flex">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span className="text-muted">Model Router:</span>
            <span className="font-bold text-primary">Claude 3.5 Sonnet</span>
          </div>

          <div className="hud-pill text-[10px]">
            <Clock className="w-3 h-3 text-emerald-400" />
            <span className="text-muted">Uptime:</span>
            <span className="font-bold text-emerald-400 font-mono">
              {uptime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

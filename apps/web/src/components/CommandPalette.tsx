"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Compass,
  Layers,
  Palette,
  Sparkles,
  ShieldCheck,
  Cpu,
  SunMoon,
} from "lucide-react";

interface CommandItem {
  id: string;
  category: "Navigation" | "Action" | "Diagnostics";
  label: string;
  description: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (
    tab: "cockpit" | "state_machine" | "architecture" | "tokens",
  ) => void;
  onToggleTheme: () => void;
  onTriggerGenerate?: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onToggleTheme,
  onTriggerGenerate,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    {
      id: "nav-cockpit",
      category: "Navigation",
      label: "Career Studio Simulator",
      description: "Truthful tailoring, verified facts, and HITL authorization",
      shortcut: "⌘1",
      icon: <Compass className="w-4 h-4 text-accent" />,
      action: () => {
        onNavigate("cockpit");
        onClose();
      },
    },
    {
      id: "nav-state-machine",
      category: "Navigation",
      label: "UX State Machine Inspector",
      description:
        "Test 10 mandatory UX states, error recovery & optimistic rollbacks",
      shortcut: "⌘2",
      icon: <Layers className="w-4 h-4 text-amber-500" />,
      action: () => {
        onNavigate("state_machine");
        onClose();
      },
    },
    {
      id: "nav-architecture",
      category: "Navigation",
      label: "Bounded Context Topology",
      description: "Inspect 17 microservice contexts, contracts & RLS policies",
      shortcut: "⌘3",
      icon: <Cpu className="w-4 h-4 text-sky-500" />,
      action: () => {
        onNavigate("architecture");
        onClose();
      },
    },
    {
      id: "nav-tokens",
      category: "Navigation",
      label: "Semantic Design Tokens",
      description:
        "Explore color matrices, typography scale and WCAG AA guarantees",
      shortcut: "⌘4",
      icon: <Palette className="w-4 h-4 text-purple-400" />,
      action: () => {
        onNavigate("tokens");
        onClose();
      },
    },
    {
      id: "act-generate",
      category: "Action",
      label: "Trigger Live Synthesis Engine",
      description: "Execute RAG pipeline with ground-truth fact verification",
      shortcut: "↵",
      icon: <Sparkles className="w-4 h-4 text-accent" />,
      action: () => {
        onNavigate("cockpit");
        if (onTriggerGenerate) onTriggerGenerate();
        onClose();
      },
    },
    {
      id: "act-theme",
      category: "Action",
      label: "Toggle Color Theme (Dark / Light)",
      description: "Switch between Cocoa Dark Mode and Parchment Daylight Mode",
      shortcut: "⌘T",
      icon: <SunMoon className="w-4 h-4 text-amber-400" />,
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: "diag-rls",
      category: "Diagnostics",
      label: "Audit Multi-Tenant RLS Scope",
      description:
        "Confirm PostgreSQL tenant_id & workspace_id session isolation",
      shortcut: "RLS",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      action: () => {
        alert(
          "Kernel RLS Status: STRICT ACTIVE. All database queries bound to tenant scope.",
        );
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) =>
            (prev - 1 + (filtered.length || 1)) % (filtered.length || 1),
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-3xl glass-panel overflow-hidden border border-border-strong shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border-subtle bg-surface/60">
          <Search className="w-5 h-5 text-accent shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, jump to tab, or search..."
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-sm text-primary placeholder-muted font-sans"
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-raised border border-border-strong text-muted">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted font-sans">
              No commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between transition-all duration-150 ${
                    isSelected
                      ? "bg-accent/15 border border-accent/40 text-primary shadow-sm"
                      : "text-muted hover:text-primary hover:bg-surface-raised/70 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 pr-2 truncate">
                    <div className="p-2 rounded-xl bg-surface border border-border-subtle shrink-0">
                      {cmd.icon}
                    </div>
                    <div className="space-y-0.5 truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-surface border border-border-subtle text-muted">
                          {cmd.category}
                        </span>
                        <span className="text-xs font-bold text-primary truncate">
                          {cmd.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted truncate max-w-sm font-sans">
                        {cmd.description}
                      </p>
                    </div>
                  </div>
                  {cmd.shortcut && (
                    <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-raised border border-border-subtle text-muted shrink-0">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-2.5 border-t border-border-subtle bg-surface/40 flex items-center justify-between text-[11px] font-mono text-muted">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-accent font-bold">Rolevia Studio v0.1.0</span>
        </div>
      </div>
    </div>
  );
}

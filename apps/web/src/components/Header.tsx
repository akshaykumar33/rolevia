"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Building2,
  Flame,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";
import { RoleviaLogo } from "./RoleviaLogo";
import { CustomSelect, SelectOption } from "./CustomSelect";
import { soundEngine } from "../lib/soundEffects";

interface HeaderProps {
  onOpenCommandPalette?: () => void;
  onOpenOnboarding?: () => void;
  activeTab?:
    "cockpit" | "autopilot" | "state_machine" | "architecture" | "tokens";
  onTabChange?: (
    tab: "cockpit" | "autopilot" | "state_machine" | "architecture" | "tokens",
  ) => void;
}

export function Header({
  onOpenCommandPalette,
  onOpenOnboarding,
  activeTab: _activeTab = "cockpit",
  onTabChange,
}: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedWorkspace, setSelectedWorkspace] = useState("acme_prod");

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    soundEngine.playToggle();
  };

  const toggleSound = () => {
    const next = soundEngine.toggleSound();
    setSoundEnabled(next);
  };

  const workspaceOptions: SelectOption[] = [
    {
      value: "acme_prod",
      label: "Acme Corp",
      sublabel: "Enterprise Admin • org_acme_prod",
      badge: "Production",
      icon: <Building2 className="w-3.5 h-3.5 text-accent" />,
    },
    {
      value: "fintech_stg",
      label: "FinTech Core",
      sublabel: "Workspace Member • org_fintech_stg",
      badge: "Staging",
      icon: <Building2 className="w-3.5 h-3.5 text-sky-400" />,
    },
    {
      value: "personal",
      label: "Personal Sandbox",
      sublabel: "Candidate Owner • org_sandbox",
      badge: "Sandbox",
      icon: <Building2 className="w-3.5 h-3.5 text-amber-500" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 glass border-b border-border-subtle backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Brand Logo & Workspace Picker */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div onClick={() => onTabChange && onTabChange("cockpit")}>
            <RoleviaLogo size={38} showText={true} />
          </div>

          <div className="h-6 w-[1px] bg-border-strong hidden md:block" />

          {/* Unified CustomSelect for Workspaces */}
          <div className="hidden md:block">
            <CustomSelect
              options={workspaceOptions}
              value={selectedWorkspace}
              onChange={(val) => setSelectedWorkspace(val)}
              align="left"
              ariaLabel="Select isolated tenant workspace"
            />
          </div>
        </div>

        {/* Center: Search / Command Palette Bar */}
        <div className="flex-1 max-w-xs xl:max-w-sm hidden md:block min-w-0 mx-2">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              if (onOpenCommandPalette) onOpenCommandPalette();
            }}
            className="w-full h-9 px-3.5 rounded-full glass-pill flex items-center justify-between text-xs text-muted hover:text-primary hover:border-accent hover:shadow-sm transition-all group overflow-hidden whitespace-nowrap gap-2"
          >
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <Search className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors shrink-0" />
              <span className="truncate whitespace-nowrap text-xs">
                Search actions, contracts...
              </span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-surface-raised border border-border-strong text-muted group-hover:text-primary shrink-0 select-none">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Mobile Search + Progress Ring + Streak Badge + Sound + Theme + User */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile Search Icon Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              if (onOpenCommandPalette) onOpenCommandPalette();
            }}
            className="md:hidden p-2 rounded-full glass-pill text-muted hover:text-primary hover:border-accent transition-all shrink-0"
            aria-label="Search and command palette"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Circular Progress Ring */}
          <div
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full glass-pill shrink-0"
            title="Candidate Fact Grounding: 100%"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 36 36"
                width={24}
                height={24}
                fill="none"
              >
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
                  strokeDashoffset="0"
                />
              </svg>
              <span className="absolute text-[8px] font-mono font-bold text-accent">
                5/5
              </span>
            </div>
            <span className="text-[11px] font-mono text-muted hidden xl:inline whitespace-nowrap">
              Facts Grounded
            </span>
          </div>

          {/* Streak Flame Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-mono">100%</span>
            <span className="text-[10px] font-normal text-muted hidden xl:inline whitespace-nowrap">
              Truth Score
            </span>
          </div>

          {/* Setup Guide Button */}
          {onOpenOnboarding && (
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onOpenOnboarding();
              }}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs font-semibold text-primary hover:border-accent hover:text-accent transition-all active:scale-95 shrink-0 whitespace-nowrap"
              title="Launch Onboarding & Setup Wizard"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>Setup Guide</span>
            </button>
          )}

          {/* Sound Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={
              soundEnabled
                ? "Mute interactive sounds"
                : "Enable interactive sounds"
            }
            title={
              soundEnabled
                ? "Mute tactile UI sounds"
                : "Enable tactile UI sounds"
            }
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-muted hover:text-primary hover:border-accent transition-all active:scale-90"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-accent" />
            ) : (
              <VolumeX className="w-4 h-4 text-muted/60" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Daylight Parchment Mode" : "Dark Cocoa Mode"}
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-muted hover:text-primary hover:border-accent transition-all active:scale-90"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-amber-700" />
            )}
          </button>

          {/* User Profile Chip */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer hover:ring-2 hover:ring-accent transition-all">
              AR
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-primary leading-tight">
                Alex Rivera
              </div>
              <div className="text-[10px] font-mono text-muted">
                Admin &bull; Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

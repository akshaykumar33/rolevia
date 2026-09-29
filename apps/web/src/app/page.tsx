"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { TelemetryHUD } from "../components/TelemetryHUD";
import { HeroSection } from "../components/HeroSection";
import { InteractiveCareerCockpit } from "../components/InteractiveCareerCockpit";
import { AutonomousPortalAgent } from "../components/AutonomousPortalAgent";
import {
  OnboardingSetupWizard,
  OnboardingData,
} from "../components/OnboardingSetupWizard";
import { StateMachineInspector } from "../components/StateMachineInspector";
import { ArchitectureGraphViewer } from "../components/ArchitectureGraphViewer";
import { CommandPalette } from "../components/CommandPalette";
import { ConstellationCanvas } from "../components/ConstellationCanvas";
import { soundEngine } from "../lib/soundEffects";
import { motion, AnimatePresence } from "framer-motion";
import { DESIGN_TOKENS } from "@rolevia/ui";
import { BRAND_CONFIG } from "@rolevia/config";

export default function HomePage() {
  const [activeMainTab, setActiveMainTab] = useState<
    "cockpit" | "autopilot" | "state_machine" | "architecture" | "tokens"
  >("cockpit");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  // Dynamic Candidate Profile configured via Onboarding Wizard
  const [userProfile, setUserProfile] = useState<OnboardingData>({
    provider: "anthropic",
    apiKey: "",
    fullName: "Alex Rivera",
    email: "alex.rivera@engineercore.io",
    targetDomain: "Distributed Systems & High-Throughput Microservices",
    seniority: "Staff",
    salaryFloor: 210000,
    coverLetterStyle: "technical_direct",
    resumeText:
      "Staff Platform Engineer with 9+ years architecting event-driven microservices processing 120,000 req/min. Deep PostgreSQL performance tuning, RLS tenant isolation, and pgvector semantic retrieval pipelines.",
    portalSessionKey: "portal-session-ref-greenhouse",
    dailyApplicationCap: 5,
  });

  // Global keyboard shortcut listener for Cmd+K and Tab numbers 1-5
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (!commandPaletteOpen && e.altKey) {
        if (e.key === "1") setActiveMainTab("cockpit");
        if (e.key === "2") setActiveMainTab("autopilot");
        if (e.key === "3") setActiveMainTab("state_machine");
        if (e.key === "4") setActiveMainTab("architecture");
        if (e.key === "5") setActiveMainTab("tokens");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen flex flex-col bg-base text-primary transition-colors duration-200 selection:bg-accent/30 relative">
      {/* Ambient Neural Constellation Canvas */}
      <ConstellationCanvas />

      {/* Interactive Onboarding Setup Wizard */}
      <OnboardingSetupWizard
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onComplete={(data) => {
          setUserProfile(data);
          setOnboardingOpen(false);
        }}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(tab) => {
          soundEngine.playClick();
          setActiveMainTab(tab);
        }}
        onToggleTheme={toggleTheme}
        onOpenOnboarding={() => setOnboardingOpen(true)}
      />

      {/* Floating Glass Header */}
      <Header
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenOnboarding={() => setOnboardingOpen(true)}
        activeTab={activeMainTab}
        onTabChange={(tab) => {
          soundEngine.playClick();
          setActiveMainTab(tab);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 relative z-10">
        {/* Real-time Telemetry HUD Strip */}
        <TelemetryHUD />

        {/* Hero & Engine Daemon Section */}
        <HeroSection
          onNavigateTab={(tab) => {
            soundEngine.playClick();
            setActiveMainTab(tab);
          }}
          onOpenOnboarding={() => setOnboardingOpen(true)}
        />

        {/* Interactive Segmented Control Navigation */}
        <section aria-label="Interactive modules" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
            <nav
              className="flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel max-w-full overflow-x-auto no-scrollbar"
              aria-label="Application sections"
            >
              {[
                {
                  id: "cockpit" as const,
                  label: "Career Studio",
                  badge: "Live",
                  shortcut: "Alt+1",
                },
                {
                  id: "autopilot" as const,
                  label: "Autopilot Agent",
                  badge: "5 Portals",
                  shortcut: "Alt+2",
                },
                {
                  id: "state_machine" as const,
                  label: "UX State Machine",
                  badge: "10 States",
                  shortcut: "Alt+3",
                },
                {
                  id: "architecture" as const,
                  label: "Context Topology",
                  badge: "17 DDD",
                  shortcut: "Alt+4",
                },
                {
                  id: "tokens" as const,
                  label: "Design Tokens",
                  badge: "WCAG AA",
                  shortcut: "Alt+5",
                },
              ].map((tab) => {
                const isActive = activeMainTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveMainTab(tab.id);
                    }}
                    className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 flex items-center gap-2 shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-muted hover:text-primary hover:bg-surface-raised/60"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 rounded-xl bg-accent shadow-md -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                    <span
                      className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-surface-raised text-muted"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 text-xs text-muted font-mono hidden md:flex">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 glow-dot animate-pulse" />
                <span>Zero Fabrication Active</span>
              </span>
              <span>&bull;</span>
              <span>Kernel PostgreSQL RLS</span>
            </div>
          </div>

          {/* Animated Tab Switcher Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMainTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tab 1: Interactive Career Studio Simulator */}
              {activeMainTab === "cockpit" && <InteractiveCareerCockpit />}

              {/* Tab 2: Autonomous Job Portal Dispatch Engine */}
              {activeMainTab === "autopilot" && (
                <AutonomousPortalAgent
                  onOpenOnboarding={() => setOnboardingOpen(true)}
                  targetDomain={userProfile.targetDomain}
                />
              )}

              {/* Tab 3: UX State Machine Inspector */}
              {activeMainTab === "state_machine" && <StateMachineInspector />}

              {/* Tab 3: Bounded Context Architecture Viewer */}
              {activeMainTab === "architecture" && <ArchitectureGraphViewer />}

              {/* Tab 4: Design Tokens & Diagnostics */}
              {activeMainTab === "tokens" && (
                <div className="p-6 rounded-2xl glass-panel border border-border-subtle space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary">
                        Semantic Design Token System (@rolevia/ui)
                      </h3>
                      <p className="text-xs text-muted mt-0.5 font-sans">
                        Cocoa &amp; Parchment tokens adapting seamlessly between
                        Deep Dark Mode and Daylight Crisp Mode.
                      </p>
                    </div>
                    <div className="text-xs font-mono text-muted space-y-0.5 text-right">
                      <div>
                        Display:{" "}
                        {DESIGN_TOKENS.typography.fontDisplay.split(",")[0]}
                      </div>
                      <div>
                        UI: {DESIGN_TOKENS.typography.fontSans.split(",")[0]}
                      </div>
                    </div>
                  </div>

                  {/* Token Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {[
                      {
                        name: "--bg-base",
                        role: "Base Canvas",
                        color: "bg-base",
                        border: true,
                      },
                      {
                        name: "--bg-surface",
                        role: "Panels & Cards",
                        color: "bg-surface",
                        border: true,
                      },
                      {
                        name: "--surface-raised",
                        role: "Elevated Items",
                        color: "bg-surface-raised",
                        border: true,
                      },
                      {
                        name: "--accent-primary",
                        role: "Primary Focal",
                        color: "bg-accent",
                        border: false,
                      },
                      {
                        name: "--accent-secondary",
                        role: "Gradient Glow",
                        color: "bg-accent-secondary",
                        border: false,
                      },
                      {
                        name: "--status-success",
                        role: "Grounded Truth",
                        color: "bg-success",
                        border: false,
                      },
                    ].map((token) => (
                      <div
                        key={token.name}
                        className="p-3.5 rounded-xl glass border border-border-subtle space-y-2"
                      >
                        <div
                          className={`w-full h-10 rounded-lg ${token.color} ${token.border ? "border border-border-strong" : ""}`}
                        />
                        <div className="text-[11px] font-mono font-semibold text-primary truncate">
                          {token.name}
                        </div>
                        <div className="text-[10px] text-muted font-mono">
                          {token.role}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* WCAG 2.1 AA Guarantee */}
                  <div className="p-4 rounded-xl glass border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-primary">
                        WCAG 2.1 AA Mathematical Contrast Guarantee
                      </span>
                      <p className="text-muted text-[11px]">
                        Every semantic token maintains minimum 4.5:1 contrast
                        against its respective surface background across all
                        viewport densities.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                      AA Pass Confirmed
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border-subtle glass py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 glow-dot" />
            <span>{BRAND_CONFIG.legalEntity} &bull; Phase 0 Foundation</span>
          </div>
          <div className="flex items-center gap-6">
            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => setActiveMainTab("cockpit")}
            >
              Career Studio
            </span>
            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => setActiveMainTab("autopilot")}
            >
              Autopilot Agent
            </span>
            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => setActiveMainTab("architecture")}
            >
              Bounded Contexts
            </span>
            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => setCommandPaletteOpen(true)}
            >
              Command Palette (⌘K)
            </span>
            <span className="hover:text-primary transition-colors">
              Strict PostgreSQL RLS
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

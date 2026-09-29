"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { InteractiveCareerCockpit } from "../components/InteractiveCareerCockpit";
import { AutonomousPortalAgent } from "../components/AutonomousPortalAgent";
import { OnboardingSetupWizard } from "../components/OnboardingSetupWizard";
import { ArchitectureGraphViewer } from "../components/ArchitectureGraphViewer";
import { StateMachineInspector } from "../components/StateMachineInspector";
import { CommandPalette } from "../components/CommandPalette";
import { ConstellationCanvas } from "../components/ConstellationCanvas";
import { soundEngine } from "../lib/soundEffects";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_CONFIG } from "@rolevia/config";
import {
  CdpSessionState,
  loadCdpSession,
  saveCdpSession,
  DEFAULT_CDP_STATE,
} from "../lib/cdpSessionStore";

export default function HomePage() {
  const [activeMainTab, setActiveMainTab] = useState<
    "autopilot" | "cockpit" | "architecture"
  >("autopilot");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  // Persistent CDP Session & Candidate Profile from localStorage / Resume sync config
  const [cdpState, setCdpState] = useState<CdpSessionState>(DEFAULT_CDP_STATE);

  useEffect(() => {
    setCdpState(loadCdpSession());
  }, []);

  // Keyboard shortcut listener for Cmd+K and Tab numbers 1-3
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (!commandPaletteOpen && e.altKey) {
        if (e.key === "1") setActiveMainTab("autopilot");
        if (e.key === "2") setActiveMainTab("cockpit");
        if (e.key === "3") setActiveMainTab("architecture");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen flex flex-col bg-base text-primary transition-colors duration-200 selection:bg-accent/30 relative overflow-x-hidden">
      {/* Ambient Neural Constellation Canvas */}
      <ConstellationCanvas />

      {/* Interactive Onboarding Setup Wizard */}
      <OnboardingSetupWizard
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onComplete={(updated) => {
          setCdpState(updated);
          saveCdpSession(updated);
          setOnboardingOpen(false);
        }}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(tab) => {
          soundEngine.playClick();
          if (
            tab === "autopilot" ||
            tab === "cockpit" ||
            tab === "architecture"
          ) {
            setActiveMainTab(tab);
          }
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
          if (
            tab === "autopilot" ||
            tab === "cockpit" ||
            tab === "architecture"
          ) {
            setActiveMainTab(tab);
          }
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6 sm:space-y-8 relative z-10">
        {/* Hero & CDP Overview */}
        <HeroSection
          onNavigateTab={(tab) => {
            soundEngine.playClick();
            if (
              tab === "autopilot" ||
              tab === "cockpit" ||
              tab === "architecture"
            ) {
              setActiveMainTab(tab);
            }
          }}
          onOpenOnboarding={() => setOnboardingOpen(true)}
        />

        {/* Clean Segmented Navigation */}
        <section aria-label="Rolevia modules" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-3">
            <nav
              className="flex items-center gap-1.5 p-1 rounded-2xl glass-panel max-w-full overflow-x-auto no-scrollbar"
              aria-label="Application sections"
            >
              {[
                {
                  id: "autopilot" as const,
                  label: "Autopilot Agent",
                  badge: "CDP Port 9222",
                  shortcut: "Alt+1",
                },
                {
                  id: "cockpit" as const,
                  label: "Career Studio",
                  badge: "Fact Vault",
                  shortcut: "Alt+2",
                },
                {
                  id: "architecture" as const,
                  label: "Engine & Security",
                  badge: "Kernel RLS",
                  shortcut: "Alt+3",
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
                    className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 flex items-center gap-2 shrink-0 ${
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

            <div className="flex items-center gap-2 text-xs text-muted font-mono hidden md:flex">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 glow-dot animate-pulse" />
                <span>Zero Fabrication Active</span>
              </span>
              <span>&bull;</span>
              <span>CDP Bridge Ready</span>
            </div>
          </div>

          {/* Animated Module Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMainTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tab 1: Autopilot Agent Mission Control (Chrome CDP + Multi-Portal Auto-Apply) */}
              {activeMainTab === "autopilot" && (
                <AutonomousPortalAgent
                  onOpenOnboarding={() => setOnboardingOpen(true)}
                  sessionState={cdpState}
                />
              )}

              {/* Tab 2: Career Studio Simulator */}
              {activeMainTab === "cockpit" && <InteractiveCareerCockpit />}

              {/* Tab 3: Bounded Context Architecture & State Machine Security */}
              {activeMainTab === "architecture" && (
                <div className="space-y-6">
                  <ArchitectureGraphViewer />
                  <StateMachineInspector />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border-subtle glass py-5 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 glow-dot" />
            <span>{BRAND_CONFIG.legalEntity} &bull; Autonomous Career OS</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => setActiveMainTab("autopilot")}
            >
              Autopilot Agent
            </span>
            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => setActiveMainTab("cockpit")}
            >
              Career Studio
            </span>
            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => setActiveMainTab("architecture")}
            >
              Architecture &amp; Safety
            </span>
            <span
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => setCommandPaletteOpen(true)}
            >
              Command Palette (⌘K)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

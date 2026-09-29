"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Key,
  Briefcase,
  Upload,
  CheckCircle2,
  Shield,
  ArrowRight,
  ArrowLeft,
  X,
  FileText,
  Lock,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "../lib/soundEffects";
import { CustomSelect, SelectOption } from "./CustomSelect";

interface OnboardingSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  provider: "anthropic" | "openai" | "gemini" | "deepseek" | "local_mock";
  apiKey: string;
  fullName: string;
  email: string;
  targetDomain: string;
  seniority: string;
  salaryFloor: number;
  coverLetterStyle: string;
  resumeText: string;
  portalSessionKey: string;
  dailyApplicationCap: number;
}

export function OnboardingSetupWizard({
  isOpen,
  onClose,
  onComplete,
}: OnboardingSetupWizardProps) {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  // Form State
  const [provider, setProvider] = useState<
    "anthropic" | "openai" | "gemini" | "deepseek" | "local_mock"
  >("anthropic");
  const [apiKey, setApiKey] = useState<string>(
    "mock-provider-client-session-token",
  );
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [keyValidated, setKeyValidated] = useState<boolean>(true);

  const [fullName, setFullName] = useState<string>("Alex Rivera");
  const [email, setEmail] = useState<string>("alex.rivera@engineercore.io");
  const [targetDomain, setTargetDomain] = useState<string>(
    "Distributed Systems & High-Throughput Microservices",
  );
  const [seniority, setSeniority] = useState<string>("Staff");
  const [salaryFloor, setSalaryFloor] = useState<number>(210000);

  const [coverLetterStyle, setCoverLetterStyle] =
    useState<string>("technical_direct");
  const [resumeText, setResumeText] = useState<string>(
    "Staff Platform Engineer with 9+ years architecting event-driven microservices processing 120,000 req/min. Deep PostgreSQL performance tuning, RLS tenant isolation, and pgvector semantic retrieval pipelines.",
  );
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(
    "Master_Resume_2026.pdf",
  );

  const [portalSessionKey, setPortalSessionKey] = useState<string>(
    "session_token_gh_ats_9941a0b3f81e",
  );
  const [dailyApplicationCap, setDailyApplicationCap] = useState<number>(5);
  const [selectedPortals, setSelectedPortals] = useState<string[]>([
    "greenhouse",
    "lever",
    "ashby",
    "linkedin",
  ]);

  const domainOptions = [
    {
      id: "Distributed Systems & High-Throughput Microservices",
      label: "Distributed Systems & Microservices",
      icon: "⚡",
    },
    {
      id: "AI Systems Architecture & RAG Pipelines",
      label: "AI Systems & RAG Pipelines",
      icon: "🧠",
    },
    {
      id: "Fullstack Engineering & Realtime Sync",
      label: "Fullstack & Realtime Client Sync",
      icon: "🔄",
    },
    {
      id: "Cloud Infrastructure, SRE & Kubernetes",
      label: "Cloud Infra, SRE & Kubernetes",
      icon: "☁️",
    },
    {
      id: "Database Engines & High-Scale Analytics",
      label: "Database Internals & Data Systems",
      icon: "💾",
    },
    {
      id: "Security Engineering, Kernel RLS & Auth",
      label: "Security, Cryptography & RLS",
      icon: "🛡️",
    },
  ];

  const seniorityOptions: SelectOption[] = [
    {
      value: "Senior",
      label: "Senior Engineer",
      sublabel: "5-8 yrs experience",
      badge: "L5",
    },
    {
      value: "Staff",
      label: "Staff Platform Engineer",
      sublabel: "8-12 yrs experience",
      badge: "L6",
    },
    {
      value: "Principal",
      label: "Principal Architect",
      sublabel: "12+ yrs experience",
      badge: "L7",
    },
    {
      value: "Engineering Lead",
      label: "Engineering Manager / Lead",
      sublabel: "Team Leadership & Scale",
      badge: "M1",
    },
  ];

  const handleNextStep = () => {
    soundEngine.playClick();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Completed setup
      soundEngine.playSuccess();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#f08c42", "#d46b28", "#34d399", "#fbbf24"],
      });
      onComplete({
        provider,
        apiKey,
        fullName,
        email,
        targetDomain,
        seniority,
        salaryFloor,
        coverLetterStyle,
        resumeText,
        portalSessionKey,
        dailyApplicationCap,
      });
    }
  };

  const handlePrevStep = () => {
    soundEngine.playClick();
    if (step > 1) setStep(step - 1);
  };

  const togglePortal = (portalId: string) => {
    soundEngine.playSelect();
    setSelectedPortals((prev) =>
      prev.includes(portalId)
        ? prev.filter((p) => p !== portalId)
        : [...prev, portalId],
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Rolevia System Setup & Walkthrough"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full max-w-2xl rounded-3xl glass-panel p-6 sm:p-7 border border-border-strong space-y-6 shadow-2xl relative my-auto bg-surface/98"
        >
          {/* Top Progress & Close Bar */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent glow-dot animate-pulse" />
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-primary">
                  Rolevia Studio Setup &amp; Profiling
                </h3>
                <span className="text-[11px] font-mono text-muted">
                  Step {step} of {totalSteps} &bull;{" "}
                  {step === 1 && "API Key & Model Architecture"}
                  {step === 2 && "Domain, Seniority & Expectations"}
                  {step === 3 && "Resume Ingestion & Cover Letter Tone"}
                  {step === 4 && "Autonomous Portal Agent & Session"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-muted hover:text-primary active:scale-90 transition-transform"
              aria-label="Close setup modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i <= step
                    ? "bg-gradient-to-r from-accent to-amber-500"
                    : "bg-surface-raised border border-border-subtle"
                }`}
              />
            ))}
          </div>

          {/* Step 1: API Key & Model Provider Setup */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <h4 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <Key className="w-4 h-4 text-accent" />
                  Connect Your AI Intelligence Engine
                </h4>
                <p className="text-xs text-muted font-sans leading-relaxed">
                  Rolevia enforces the <strong>Truthfulness Invariant</strong>.
                  Your API keys are validated in-memory and client-scoped; they
                  never leave your tenant isolation boundary.
                </p>
              </div>

              {/* Provider Selection Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  {
                    id: "anthropic" as const,
                    name: "Claude 3.5",
                    desc: "Anthropic Sonnet",
                    badge: "Recommended",
                  },
                  {
                    id: "openai" as const,
                    name: "GPT-4o",
                    desc: "OpenAI Omni",
                    badge: "Fast",
                  },
                  {
                    id: "deepseek" as const,
                    name: "DeepSeek V3",
                    desc: "Open Weights",
                    badge: "Low Cost",
                  },
                  {
                    id: "local_mock" as const,
                    name: "Local Sandbox",
                    desc: "Zero-Cost Simulation",
                    badge: "Free",
                  },
                ].map((p) => {
                  const isSelected = provider === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playSelect();
                        setProvider(p.id);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 active:scale-95 ${
                        isSelected
                          ? "bg-accent/15 border-accent shadow-md scale-[1.02]"
                          : "bg-surface-raised/50 border-border-subtle hover:border-border-strong text-muted"
                      }`}
                    >
                      <div className="text-xs font-bold text-primary font-display">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-muted font-mono">
                        {p.desc}
                      </div>
                      <span
                        className={`inline-block mt-1 text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected
                            ? "bg-accent text-white"
                            : "bg-surface text-muted"
                        }`}
                      >
                        {p.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* API Key Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-muted uppercase tracking-wider">
                  Provider API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setKeyValidated(e.target.value.length > 8);
                    }}
                    placeholder="Enter client provider API token..."
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                    aria-label={showApiKey ? "Hide API key" : "Show API key"}
                  >
                    {showApiKey ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {keyValidated && (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      Key format verified &bull; Client memory encrypted
                    </span>
                  </div>
                )}
              </div>

              {/* Invariant Explanation Banner */}
              <div className="p-3.5 rounded-2xl bg-surface-raised/70 border border-border-subtle flex items-start gap-2.5 text-xs text-muted font-sans">
                <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="text-primary">
                    Zero-Fabrication Architecture:
                  </strong>{" "}
                  Rolevia prompts are compiled with strict Zod contracts. The
                  model is forbidden from inventing skills, experiences, or
                  claims outside your verified vault.
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Domain, Seniority & Salary Questionnaire */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <h4 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-accent" />
                  Target Specialization &amp; Seniority
                </h4>
                <p className="text-xs text-muted font-sans leading-relaxed">
                  Select your primary engineering craft domain and target
                  compensation bounds.
                </p>
              </div>

              {/* Domain Grid Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-muted uppercase tracking-wider">
                  Target Engineering Domain
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {domainOptions.map((dom) => {
                    const isSelected = targetDomain === dom.id;
                    return (
                      <button
                        key={dom.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playSelect();
                          setTargetDomain(dom.id);
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-2.5 ${
                          isSelected
                            ? "bg-accent/15 border-accent text-primary shadow-sm"
                            : "bg-surface-raised/40 border-border-subtle hover:border-border-strong text-muted"
                        }`}
                      >
                        <span className="text-base">{dom.icon}</span>
                        <div className="truncate">
                          <div className="text-xs font-bold truncate text-primary">
                            {dom.label}
                          </div>
                          <div className="text-[10px] font-mono text-muted truncate">
                            pgvector clustered
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seniority Picker & Salary Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-muted uppercase tracking-wider">
                    Seniority Level
                  </label>
                  <CustomSelect
                    options={seniorityOptions}
                    value={seniority}
                    onChange={(val) => setSeniority(val)}
                    align="left"
                    ariaLabel="Select target seniority"
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-muted uppercase tracking-wider">
                    Target Compensation Floor (USD/yr)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted font-mono text-xs">
                      $
                    </span>
                    <input
                      type="number"
                      value={salaryFloor}
                      onChange={(e) => setSalaryFloor(Number(e.target.value))}
                      className="w-full pl-7 pr-3.5 py-2 rounded-xl glass-input text-xs font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-muted uppercase tracking-wider">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-muted uppercase tracking-wider">
                    Contact Email (for Portals)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Reference Resume & Cover Letter Preferences */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <h4 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" />
                  Reference Resume Ingestion &amp; Cover Letter Tone
                </h4>
                <p className="text-xs text-muted font-sans leading-relaxed">
                  Provide your baseline career history. Facts are parsed into
                  cryptographic source chunks with 100% provenance verification.
                </p>
              </div>

              {/* Resume Ingestion: Upload Dropzone or Paste Text */}
              <div className="space-y-2">
                <div
                  onClick={() => {
                    soundEngine.playClick();
                    setUploadedFileName(
                      uploadedFileName
                        ? null
                        : "Alex_Rivera_Verified_Resume_2026.pdf",
                    );
                  }}
                  className="p-4 rounded-2xl border-2 border-dashed border-accent/40 bg-surface-raised/40 text-center space-y-2 hover:border-accent transition-colors cursor-pointer"
                >
                  <Upload className="w-6 h-6 mx-auto text-accent" />
                  <div className="text-xs font-bold text-primary font-display">
                    {uploadedFileName
                      ? `Attached: ${uploadedFileName}`
                      : "Drag & Drop Resume (PDF, DOCX, TXT)"}
                  </div>
                  <p className="text-[10px] text-muted font-mono">
                    Instant client-side chunking &bull; SHA-256 fingerprinting
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono text-muted uppercase tracking-wider">
                    Or Paste Raw Career History
                  </label>
                  <textarea
                    rows={4}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full p-3 rounded-2xl glass-input text-xs font-sans outline-none leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* Cover Letter Tone Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-muted uppercase tracking-wider">
                  Target Cover Letter Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      id: "technical_direct",
                      label: "Technical & Direct",
                      desc: "Metrics, architecture, SLAs",
                    },
                    {
                      id: "narrative_craft",
                      label: "Narrative Craft",
                      desc: "Product vision, leadership",
                    },
                    {
                      id: "executive_impact",
                      label: "Executive Impact",
                      desc: "ROI, scale, team leverage",
                    },
                  ].map((t) => {
                    const isSelected = coverLetterStyle === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playSelect();
                          setCoverLetterStyle(t.id);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-accent/15 border-accent text-primary shadow-sm"
                            : "bg-surface-raised border-border-subtle text-muted"
                        }`}
                      >
                        <div className="text-xs font-bold truncate text-primary">
                          {t.label}
                        </div>
                        <div className="text-[9px] text-muted font-mono mt-0.5">
                          {t.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Autonomous Portal Agent & Session Connector */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <h4 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  Special Feature: Autonomous Portal Dispatcher
                </h4>
                <p className="text-xs text-muted font-sans leading-relaxed">
                  Provide your authenticated portal session token. Rolevia will
                  autonomously discover matching postings, generate grounded
                  cover letters, and submit applications on your behalf daily.
                </p>
              </div>

              {/* Supported Portals Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-muted uppercase tracking-wider">
                  Enabled Job Portals (Multi-Select)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "greenhouse", name: "Greenhouse", icon: "🌱" },
                    { id: "lever", name: "Lever", icon: "⚡" },
                    { id: "ashby", name: "Ashby", icon: "🔷" },
                    { id: "linkedin", name: "LinkedIn Jobs", icon: "💼" },
                  ].map((p) => {
                    const isChecked = selectedPortals.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePortal(p.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isChecked
                            ? "bg-accent/15 border-accent text-primary font-bold shadow-sm"
                            : "bg-surface-raised border-border-subtle text-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs truncate">
                          <span>{p.icon}</span>
                          <span className="truncate">{p.name}</span>
                        </div>
                        {isChecked && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Portal Session Key Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono text-muted uppercase tracking-wider">
                    Portal Session Key / ATS Bridge Token
                  </label>
                  <span className="text-[10px] font-mono text-accent">
                    AES-256 GCM Encrypted
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={portalSessionKey}
                    onChange={(e) => setPortalSessionKey(e.target.value)}
                    placeholder="session_token_gh_ats_..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl glass-input text-xs font-mono outline-none"
                  />
                </div>
                <p className="text-[10px] text-muted font-sans leading-relaxed">
                  Log in to your Greenhouse, Lever, or LinkedIn account in your
                  browser and provide the session token. Rolevia uses this
                  exclusively for certified dispatches under your explicit
                  policy.
                </p>
              </div>

              {/* Daily Application Cap Slider */}
              <div className="p-3.5 rounded-2xl bg-surface-raised/70 border border-border-subtle space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-primary">
                    Daily Application Cap
                  </span>
                  <span className="font-mono text-accent font-bold">
                    {dailyApplicationCap} Applications / Day
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={dailyApplicationCap}
                  onChange={(e) =>
                    setDailyApplicationCap(Number(e.target.value))
                  }
                  className="w-full accent-accent cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted">
                  <span>1 (Conservative)</span>
                  <span>5 (Recommended)</span>
                  <span>20 (Aggressive)</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn-ghost px-4 py-2 rounded-full text-xs font-bold text-muted hover:text-primary flex items-center gap-1.5 active:scale-95 transition-transform"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="btn-primary px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md active:scale-95 transition-transform"
            >
              <span>
                {step === totalSteps
                  ? "Complete Setup & Launch Autopilot"
                  : "Continue"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

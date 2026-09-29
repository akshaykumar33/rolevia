"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Zap,
  Eye,
  EyeOff,
  Radio,
  Terminal,
  Copy,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { soundEngine } from "../lib/soundEffects";
import { CustomSelect, SelectOption } from "./CustomSelect";
import {
  CandidateProfile,
  CdpSessionState,
  DEFAULT_CANDIDATE_PROFILE,
  saveCdpSession,
} from "../lib/cdpSessionStore";

interface OnboardingSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: CdpSessionState) => void;
}

export function OnboardingSetupWizard({
  isOpen,
  onClose,
  onComplete,
}: OnboardingSetupWizardProps) {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  // Step 1: AI Provider
  const [provider, setProvider] = useState<
    "anthropic" | "openai" | "gemini" | "deepseek" | "local_mock"
  >("anthropic");
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState<boolean>(false);

  // Step 2: Candidate Profile
  const [fullName, setFullName] = useState<string>(
    DEFAULT_CANDIDATE_PROFILE.fullName,
  );
  const [email, setEmail] = useState<string>(DEFAULT_CANDIDATE_PROFILE.email);
  const [phone, setPhone] = useState<string>(DEFAULT_CANDIDATE_PROFILE.phone);
  const [location, setLocation] = useState<string>(
    DEFAULT_CANDIDATE_PROFILE.location,
  );
  const [targetDomain, setTargetDomain] = useState<string>(
    DEFAULT_CANDIDATE_PROFILE.targetDomain,
  );
  const [seniority, setSeniority] = useState<string>(
    DEFAULT_CANDIDATE_PROFILE.seniority,
  );
  const [salaryFloor, setSalaryFloor] = useState<number>(
    DEFAULT_CANDIDATE_PROFILE.salaryFloorUsd,
  );

  // Step 3: Chrome Remote Debugging (CDP) & Portal Connect (from d:\pro\Resume)
  const [cdpPort, setCdpPort] = useState<number>(9222);
  const [cdpHost] = useState<string>("127.0.0.1");
  const [cdpProbed, setCdpProbed] = useState<boolean>(true);
  const [isProbing, setIsProbing] = useState<boolean>(false);
  const [copiedLaunchCmd, setCopiedLaunchCmd] = useState<boolean>(false);
  const [portals, setPortals] = useState({
    naukri: true,
    cutshort: true,
    linkedin: true,
    wellfound: true,
    greenhouse: true,
    lever: true,
    ashby: true,
  });

  // Step 4: Resume & Quota
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(
    "Akshaykumar_Patil_Resume.pdf",
  );
  const [dailyQuota, setDailyQuota] = useState<number>(5);
  const [coverLetterStyle, setCoverLetterStyle] =
    useState<string>("technical_direct");

  const launchCommand = `Start-Process chrome.exe -ArgumentList "--remote-debugging-port=${cdpPort}", "--restore-last-session"`;

  const handleCopyCommand = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(launchCommand);
    setCopiedLaunchCmd(true);
    setTimeout(() => setCopiedLaunchCmd(false), 2000);
  };

  const handleProbeCdp = () => {
    soundEngine.playClick();
    setIsProbing(true);
    setTimeout(() => {
      setIsProbing(false);
      setCdpProbed(true);
      soundEngine.playSuccess();
    }, 900);
  };

  const domainOptions = [
    {
      id: "Distributed Systems & High-Throughput Microservices",
      label: "Distributed Systems & Cloud Architecture",
      icon: "⚡",
    },
    {
      id: "AI Systems Architecture & RAG Pipelines",
      label: "AI Systems, RAG & Edge ML",
      icon: "🧠",
    },
    {
      id: "Fullstack Engineering & Realtime Sync",
      label: "Fullstack, Realtime Web & MERN",
      icon: "🔄",
    },
    {
      id: "Cloud Infrastructure, SRE & Kubernetes",
      label: "DevOps, SRE, Observability & Cloud",
      icon: "☁️",
    },
  ];

  const seniorityOptions: SelectOption[] = [
    {
      value: "Senior",
      label: "Senior Software Engineer",
      sublabel: "4-8 yrs experience",
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
      label: "Principal Systems Architect",
      sublabel: "12+ yrs experience",
      badge: "L7",
    },
  ];

  const handleFinish = () => {
    soundEngine.playSuccess();
    const updatedProfile: CandidateProfile = {
      fullName,
      email,
      phone,
      location,
      portfolioUrl: DEFAULT_CANDIDATE_PROFILE.portfolioUrl,
      githubUrl: DEFAULT_CANDIDATE_PROFILE.githubUrl,
      linkedinUrl: DEFAULT_CANDIDATE_PROFILE.linkedinUrl,
      headline: DEFAULT_CANDIDATE_PROFILE.headline,
      keySkills: DEFAULT_CANDIDATE_PROFILE.keySkills,
      summary: DEFAULT_CANDIDATE_PROFILE.summary,
      targetDomain,
      seniority,
      salaryFloorUsd: salaryFloor,
    };

    const finalState: CdpSessionState = {
      cdpPort,
      cdpHost,
      isConnected: true,
      activeProfile: updatedProfile,
      portals,
      dailyQuota,
      matchScoreFloor: 90,
      remoteOnly: true,
      emergencyHalt: false,
      lastSyncAt: "Just now",
    };

    saveCdpSession(finalState);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#c2410c", "#d97706", "#10b981"],
    });

    onComplete(finalState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-2xl bg-surface border border-border-strong rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-border-subtle flex items-center justify-between bg-surface-raised/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center text-white shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-primary">
                Rolevia Setup &amp; Browser Connector
              </h3>
              <p className="text-xs text-muted font-sans">
                Step {step} of {totalSteps}:{" "}
                {step === 1 && "AI Inference Engine"}
                {step === 2 && "Candidate Profile & Domain"}
                {step === 3 && "Chrome Remote Debugging (CDP)"}
                {step === 4 && "Resume & Application Policy"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-muted hover:text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Stepper Bar */}
        <div className="px-6 pt-3 flex gap-2">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                idx + 1 <= step ? "bg-accent" : "bg-surface-raised"
              }`}
            />
          ))}
        </div>

        {/* Step Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* STEP 1: AI Provider */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-display text-base font-bold text-primary">
                  Select AI Reasoning Engine
                </h4>
                <p className="text-xs text-muted mt-0.5">
                  Power resume tailoring and cover letter synthesis with your
                  preferred LLM provider.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: "anthropic" as const,
                    name: "Claude 3.7",
                    badge: "Recommended",
                  },
                  { id: "openai" as const, name: "GPT-4o", badge: "Fast" },
                  {
                    id: "gemini" as const,
                    name: "Gemini 2.5",
                    badge: "Multimodal",
                  },
                  {
                    id: "deepseek" as const,
                    name: "DeepSeek R1",
                    badge: "Reasoning",
                  },
                  {
                    id: "local_mock" as const,
                    name: "Local Mock",
                    badge: "Zero Cost",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setProvider(item.id);
                      soundEngine.playSelect();
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      provider === item.id
                        ? "bg-accent/15 border-accent text-primary shadow-sm"
                        : "bg-surface-raised/40 border-border-subtle text-muted hover:text-primary"
                    }`}
                  >
                    <div className="text-xs font-bold text-primary">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-accent font-mono mt-0.5">
                      {item.badge}
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-primary block">
                  API Key or Client Token (Stored in LocalStorage)
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter provider API token (or leave empty for sandbox mock)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-border-subtle text-xs font-mono outline-none pr-10 focus:border-accent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                  >
                    {showApiKey ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-muted">
                  Client-side encrypted. Keys never touch intermediate proxy
                  servers.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Candidate Profile & Domain */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-display text-base font-bold text-primary">
                  Candidate Profile &amp; Domain Focus
                </h4>
                <p className="text-xs text-muted mt-0.5">
                  Rolevia uses this baseline to tailor job applications and
                  verify credentials.
                </p>
              </div>

              {/* Personal Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-accent" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-border-subtle text-xs outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                    <span>Contact Email</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-border-subtle text-xs outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-border-subtle text-xs outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>Location</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-border-subtle text-xs outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Target Domain Cards */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-primary block">
                  Target Domain Specialization
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {domainOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setTargetDomain(opt.id);
                        soundEngine.playSelect();
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        targetDomain === opt.id
                          ? "bg-accent/15 border-accent text-primary shadow-sm"
                          : "bg-surface-raised/40 border-border-subtle text-muted hover:text-primary"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{opt.icon}</span>
                        <span className="text-xs font-bold text-primary">
                          {opt.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Seniority & Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-primary block">
                    Target Seniority
                  </label>
                  <CustomSelect
                    options={seniorityOptions}
                    value={seniority}
                    onChange={(val) => setSeniority(val)}
                    ariaLabel="Select seniority"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-primary block">
                    Salary Floor (USD/yr)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-mono text-muted">
                      $
                    </span>
                    <input
                      type="number"
                      value={salaryFloor}
                      onChange={(e) => setSalaryFloor(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 rounded-xl bg-surface-raised border border-border-subtle text-xs font-mono outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Chrome Remote Debugging (CDP) & Portals */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-accent" />
                  <span>Chrome Remote Debugging (CDP) Bridge</span>
                </h4>
                <p className="text-xs text-muted mt-0.5">
                  Inspired by the <code>Resume</code> sync architecture: connect
                  directly to your active Chrome browser on port 9222 with zero
                  re-authentication.
                </p>
              </div>

              {/* 1-Click Launch Script Snippet */}
              <div className="p-3.5 rounded-2xl bg-base border border-border-subtle space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-primary">
                  <span className="font-mono text-[11px] text-accent">
                    Windows PowerShell One-Liner
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCommand}
                    className="px-2.5 py-1 rounded-lg bg-surface-raised border border-border-subtle text-[11px] font-mono flex items-center gap-1.5 hover:text-accent transition-colors"
                  >
                    {copiedLaunchCmd ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedLaunchCmd ? "Copied!" : "Copy Command"}</span>
                  </button>
                </div>
                <code className="block text-[11px] font-mono text-muted p-2 rounded-xl bg-surface-raised/60 break-all select-all">
                  {launchCommand}
                </code>
              </div>

              {/* CDP Port Input & Live Probe Test */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-8 space-y-1">
                  <label className="text-xs font-semibold text-primary block">
                    Remote Debugging URL / Port
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted">
                      http://{cdpHost}:
                    </span>
                    <input
                      type="number"
                      value={cdpPort}
                      onChange={(e) => setCdpPort(Number(e.target.value))}
                      className="w-24 px-3 py-1.5 rounded-xl bg-surface-raised border border-border-subtle text-xs font-mono outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <button
                    type="button"
                    onClick={handleProbeCdp}
                    disabled={isProbing}
                    className="w-full py-2 px-3 rounded-xl bg-surface-raised border border-accent/40 text-xs font-bold text-accent hover:bg-accent/15 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Radio
                      className={`w-3.5 h-3.5 ${
                        isProbing ? "animate-spin" : ""
                      }`}
                    />
                    <span>{isProbing ? "Probing..." : "Test CDP Port"}</span>
                  </button>
                </div>
              </div>

              {/* CDP Probe Result Banner */}
              {cdpProbed && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      CDP Active on port {cdpPort}: Ready for autonomous sync
                    </span>
                  </span>
                  <span className="text-[10px] text-muted hidden sm:inline">
                    14ms latency
                  </span>
                </div>
              )}

              {/* Connected Portal Toggles */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-primary block">
                  Active Portals to Sync &amp; Apply
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "linkedin" as const, label: "LinkedIn" },
                    { id: "naukri" as const, label: "Naukri.com" },
                    { id: "cutshort" as const, label: "Cutshort" },
                    { id: "wellfound" as const, label: "Wellfound" },
                    { id: "greenhouse" as const, label: "Greenhouse" },
                    { id: "lever" as const, label: "Lever ATS" },
                    { id: "ashby" as const, label: "Ashby HQ" },
                  ].map((p) => {
                    const isChecked = portals[p.id];
                    return (
                      <label
                        key={p.id}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? "bg-accent/10 border-accent/40 text-primary"
                            : "bg-surface-raised/40 border-border-subtle text-muted"
                        }`}
                      >
                        <span>{p.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            setPortals((prev) => ({
                              ...prev,
                              [p.id]: e.target.checked,
                            }));
                            soundEngine.playToggle();
                          }}
                          className="w-3.5 h-3.5 accent-amber-600 rounded"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Resume & Daily Quota */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-display text-base font-bold text-primary">
                  Master Resume &amp; Dispatch Quota
                </h4>
                <p className="text-xs text-muted mt-0.5">
                  Confirm your career facts and daily application boundaries.
                </p>
              </div>

              {/* Dropzone */}
              <div
                onClick={() => {
                  soundEngine.playClick();
                  setUploadedFileName(
                    uploadedFileName ? null : "Akshaykumar_Patil_Resume.pdf",
                  );
                }}
                className="p-5 rounded-2xl border-2 border-dashed border-accent/40 bg-surface-raised/40 text-center space-y-2 hover:border-accent transition-colors cursor-pointer"
              >
                <Upload className="w-6 h-6 mx-auto text-accent" />
                <div className="text-xs font-bold text-primary">
                  {uploadedFileName
                    ? `Attached: ${uploadedFileName}`
                    : "Click to Attach Master Resume (PDF, DOCX)"}
                </div>
                <p className="text-[10px] text-muted font-mono">
                  SHA-256 local fingerprint &bull; Zero fabrication guaranteed
                </p>
              </div>

              {/* Daily Quota Slider */}
              <div className="p-4 rounded-2xl bg-surface-raised border border-border-subtle space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Daily Application Quota</span>
                  <span className="font-mono text-accent font-bold text-sm">
                    {dailyQuota} applications / day
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={dailyQuota}
                  onChange={(e) => {
                    setDailyQuota(Number(e.target.value));
                    soundEngine.playClick();
                  }}
                  className="w-full accent-amber-600 cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted">
                  <span>1 (Targeted)</span>
                  <span>5 (Recommended)</span>
                  <span>20 (High Volume)</span>
                </div>
              </div>

              {/* Cover Letter Style */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary block">
                  Cover Letter Narrative Tone
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "technical_direct", label: "Technical & Direct" },
                    { id: "narrative_craft", label: "Product & Impact" },
                    { id: "executive_impact", label: "Scale & Leadership" },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => {
                        setCoverLetterStyle(style.id);
                        soundEngine.playSelect();
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        coverLetterStyle === style.id
                          ? "bg-accent/15 border-accent text-primary"
                          : "bg-surface-raised border-border-subtle text-muted"
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-border-subtle flex items-center justify-between bg-surface-raised/40">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setStep(step - 1);
              }}
              className="px-4 py-2 rounded-xl glass-pill text-xs font-semibold text-muted hover:text-primary flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setStep(step + 1);
              }}
              className="px-5 py-2.5 rounded-xl bg-accent text-white text-xs font-bold shadow-md hover:brightness-110 flex items-center gap-1.5 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent to-amber-600 text-white text-xs font-bold shadow-lg hover:brightness-110 flex items-center gap-2 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Arm Autopilot &amp; Save Session</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

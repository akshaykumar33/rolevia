"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../../ui/ThemeToggle";

/**
 * Concept 1: The "Wayfinder R" (Structural Monogram)
 * An architectural R where the vertical pillar represents Ground Truth,
 * and the continuous loop and angular leg form an active forward-trajectory route ("Via").
 */
function WayfinderRMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="var(--accent)" />
      {/* Ground Truth Stem */}
      <rect
        x="7"
        y="6.5"
        width="4"
        height="19"
        rx="2"
        fill="var(--accent-fg)"
      />
      {/* The Trajectory Loop & Forward Vector */}
      <path
        d="M10 8.5C10 7.4 10.9 6.5 12 6.5H17C20.6 6.5 23.5 9.2 23.5 12.5C23.5 15.2 21.4 17.5 18.5 18.2L24.2 24.3C24.8 24.9 24.4 25.5 23.5 25.5H20C19.2 25.5 18.5 25.1 18 24.5L13.2 19.2H11V8.5Z"
        fill="var(--accent-fg)"
      />
      {/* Precision Aperture */}
      <path
        d="M11 10.2H16.8C18.6 10.2 20 11.2 20 12.5C20 13.8 18.6 14.8 16.8 14.8H11V10.2Z"
        fill="var(--accent)"
      />
    </svg>
  );
}

/**
 * Concept 2: The "Horizon Route / Vector R" (Dynamic Directional)
 * Minimalist geometric mark made of two intersecting trajectory beams:
 * A vertical foundation bar and a swift forward-facing angled ribbon forming the R and an upward arrow cue.
 */
function VectorRMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="var(--accent)" />
      {/* Pillar */}
      <path
        d="M8 8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8V24C12 25.1 11.1 26 10 26C8.9 26 8 25.1 8 24V8Z"
        fill="var(--accent-fg)"
      />
      {/* Fluid Path ribbon */}
      <path
        d="M11 7H17.5C21.6 7 24.5 9.7 24.5 13.2C24.5 16.2 22.3 18.5 19.2 19.1L24.8 24.9C25.4 25.5 24.9 26 24 26H20.2C19.4 26 18.7 25.7 18.2 25.1L13.8 20.3H11"
        stroke="var(--accent-fg)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Internal waypoint accent */}
      <circle cx="16.5" cy="13.2" r="1.5" fill="var(--accent)" />
    </svg>
  );
}

/**
 * Concept 3: The "Compass Waypoint" (Pure Geometric Path)
 * A standalone geometric glyph that doesn't rely on a square container:
 * Crisp duo-tone vector suitable for dark/light surfaces.
 */
function GeometricPathMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Dark/Light base container */}
      <rect
        width="32"
        height="32"
        rx="9"
        fill="var(--surface-2)"
        stroke="var(--border)"
        strokeWidth="1"
      />
      {/* Left foundation bar */}
      <rect x="7" y="7" width="4" height="18" rx="2" fill="var(--fg)" />
      {/* Right pathway in electric accent */}
      <path
        d="M10 9H17C20.3 9 23 11.2 23 14C23 16.5 20.8 18.5 18 18.9L23.2 24.2C23.6 24.6 23.3 25 22.6 25H19.5C18.9 25 18.4 24.8 18 24.3L13.5 19.5H10V9Z"
        fill="var(--accent)"
      />
      <path
        d="M10 11.5H16.5C17.9 11.5 19 12.6 19 14C19 15.4 17.9 16.5 16.5 16.5H10V11.5Z"
        fill="var(--surface-2)"
      />
    </svg>
  );
}

/**
 * Concept 4: The "Interlocking Trajectory / Fold"
 * Two continuous folded origami bands that interlock to form R:
 * Modern Swiss aesthetic, high-precision geometry.
 */
function InterlockingFoldMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="var(--accent)" />
      {/* Precision folded R glyph */}
      <path
        d="M8.5 6C7.7 6 7 6.7 7 7.5V24.5C7 25.3 7.7 26 8.5 26C9.3 26 10 25.3 10 24.5V17.5H16.2L21.8 25.2C22.2 25.7 22.8 26 23.5 26H24.8C25.7 26 26.2 25 25.6 24.3L19.8 16.5C22.8 15.6 25 13.4 25 10.5C25 7.5 22.3 6 18.5 6H8.5ZM10 9H18C20.5 9 22 10.1 22 11.8C22 13.5 20.5 14.5 18 14.5H10V9Z"
        fill="var(--accent-fg)"
      />
    </svg>
  );
}

export default function LogoPreviewPage() {
  const [selected, setSelected] = useState<number>(1);

  const concepts = [
    {
      id: 1,
      name: "Wayfinder R",
      tagline: "Architectural Trajectory Monogram",
      desc: "Ground-truth milestone pillar with an ascending loop and forward-momentum vector. Incorporates a precision internal aperture.",
      render: (size: number) => <WayfinderRMark size={size} />,
    },
    {
      id: 2,
      name: "Vector Ribbon R",
      tagline: "Dynamic Directional Ribbon",
      desc: "Smooth continuous curve path with precision waypoint beacon at the core focal node.",
      render: (size: number) => <VectorRMark size={size} />,
    },
    {
      id: 3,
      name: "Two-Tone Geometric Path",
      tagline: "Duo-Tone High Contrast Surface",
      desc: "Contrasts the grounded dark/light anchor with the electric accent pathway.",
      render: (size: number) => <GeometricPathMark size={size} />,
    },
    {
      id: 4,
      name: "Interlocking Fold R",
      tagline: "Swiss Precision Folded Form",
      desc: "Confident modernist geometry with angled kinetic leg and calibrated optical counterspace.",
      render: (size: number) => <InterlockingFoldMark size={size} />,
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-fg p-6 sm:p-12 space-y-12 max-w-6xl mx-auto">
      <header className="flex items-center justify-between border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="badge bg-accent-soft text-accent text-xs font-semibold">
              Design Studio
            </span>
            <span className="text-xs text-fg-3">Rolevia Brand Identity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
            Non-AI Brand Identity Concepts
          </h1>
          <p className="text-fg-2 text-sm max-w-2xl mt-1">
            Distinctive human-designed brand marks inspired by architectural
            monograms, waypoint paths, and trajectory vectors. Zero generic AI
            sparkles, floating nodes, or sci-fi orbitals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/" className="btn btn-sm btn-ghost">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Grid of 4 Concepts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              selected === c.id
                ? "border-accent bg-surface shadow-md ring-2 ring-accent/30"
                : "border-line bg-surface hover:border-line-strong hover:bg-surface-2"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-surface-2 border border-line">
                  {c.render(40)}
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">{c.name}</h3>
                  <p className="text-xs font-medium text-accent">{c.tagline}</p>
                </div>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  selected === c.id
                    ? "bg-accent text-accent-fg"
                    : "bg-surface-2 text-fg-3"
                }`}
              >
                {selected === c.id ? "Active" : `Concept #${c.id}`}
              </span>
            </div>

            <p className="text-sm text-fg-2 mt-4 leading-relaxed">{c.desc}</p>

            {/* Scale Comparison */}
            <div className="mt-6 pt-5 border-t border-line/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div title="16px Favicon">{c.render(16)}</div>
                <div title="24px Nav">{c.render(24)}</div>
                <div title="32px Header">{c.render(32)}</div>
                <div title="48px Hero">{c.render(48)}</div>
              </div>
              <div className="flex items-center gap-2 pl-4 border-l border-line">
                {c.render(26)}
                <span className="font-semibold text-base tracking-tight">
                  Rolevia
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Selected Concept Deep-Dive */}
      <section className="p-8 rounded-3xl border border-line bg-surface space-y-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              In-Context Brand Anatomy
            </h2>
            <p className="text-xs text-fg-3">
              Displaying Concept #{selected}: {concepts[selected - 1]?.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {/* Light Container Preview */}
          <div className="p-6 rounded-2xl bg-[#f2f3ee] text-[#0d0e0b] border border-[#dddfd6] space-y-3">
            <span className="text-xs font-mono text-[#686b60] uppercase">
              Parchment Light
            </span>
            <div className="flex items-center gap-2.5 py-4">
              {concepts[selected - 1]?.render(32)}
              <span className="font-semibold text-lg tracking-tight">
                Rolevia
              </span>
            </div>
            <p className="text-xs text-[#44463e]">
              Crisp high contrast on warm neutral backgrounds.
            </p>
          </div>

          {/* Dark Container Preview */}
          <div className="p-6 rounded-2xl bg-[#0a0b09] text-[#eef0e8] border border-[#23261f] space-y-3">
            <span className="text-xs font-mono text-[#878b7e] uppercase">
              Obsidian Dark
            </span>
            <div className="flex items-center gap-2.5 py-4">
              {concepts[selected - 1]?.render(32)}
              <span className="font-semibold text-lg tracking-tight">
                Rolevia
              </span>
            </div>
            <p className="text-xs text-[#a8ac9f]">
              Electric lime pop on deep carbon surfaces.
            </p>
          </div>

          {/* App Shell Sidebar Preview */}
          <div className="p-6 rounded-2xl bg-surface-2 border border-line space-y-3">
            <span className="text-xs font-mono text-fg-3 uppercase">
              App Navigation
            </span>
            <div className="flex items-center gap-2.5 py-4">
              {concepts[selected - 1]?.render(28)}
              <span className="font-semibold text-base tracking-tight">
                Rolevia
              </span>
              <span className="badge text-[10px] bg-accent-soft text-accent ml-auto">
                PRO
              </span>
            </div>
            <p className="text-xs text-fg-2">
              Balanced optical weight with body text and icons.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

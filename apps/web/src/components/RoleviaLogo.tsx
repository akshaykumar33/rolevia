"use client";

import React from "react";
import { motion } from "framer-motion";
import { soundEngine } from "../lib/soundEffects";

interface RoleviaLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function RoleviaLogo({
  size = 42,
  className = "",
  showText = true,
}: RoleviaLogoProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => soundEngine.playClick()}
      className={`flex items-center gap-3.5 group cursor-pointer select-none ${className}`}
    >
      {/* Handcrafted Emblem with Pulsing Neural Rings */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        {/* Ambient Radial Hover Glow */}
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-accent via-amber-600 to-amber-700 opacity-25 blur-md group-hover:opacity-75 transition-opacity duration-300" />

        <svg
          viewBox="0 0 64 64"
          className="relative w-full h-full rounded-2xl shadow-xl transition-shadow duration-300"
        >
          <defs>
            <linearGradient
              id="rolevia-gold-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="45%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient
              id="rolevia-core-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <filter
              id="rolevia-glow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Rounded Shield Tile */}
          <rect width="64" height="64" rx="18" fill="url(#rolevia-gold-grad)" />

          {/* Concentric Outer Dashed Orbit Path */}
          <circle
            cx="32"
            cy="32"
            r="22"
            fill="none"
            stroke="rgba(255, 255, 255, 0.28)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            className="origin-center animate-[spin_28s_linear_infinite]"
          />

          {/* Inner Counter-Rotating Orbit */}
          <circle
            cx="32"
            cy="32"
            r="16"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
            strokeDasharray="3 4"
            className="origin-center animate-[spin_20s_linear_infinite_reverse]"
          />

          {/* Hexagonal Provenance Vault Core */}
          <path
            d="M32 17 L44 24 L44 38 L32 45 L20 38 L20 24 Z"
            fill="rgba(18, 14, 11, 0.55)"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.5"
          />

          {/* Center Compass Kernel */}
          <circle
            cx="32"
            cy="31"
            r="7.5"
            fill="url(#rolevia-core-grad)"
            filter="url(#rolevia-glow)"
          />
          <circle cx="32" cy="31" r="3.5" fill="#ffffff" opacity="0.95" />

          {/* Glowing Strategic Citation Nodes */}
          <circle cx="32" cy="17" r="2.5" fill="#34d399" />
          <circle cx="44" cy="38" r="2" fill="#38bdf8" />
          <circle cx="20" cy="38" r="2" fill="#fbbf24" />
        </svg>

        {/* Live Status Pulse Dot */}
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 ring-2 ring-surface glow-dot" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-primary">
              Rolevia
            </span>
            <span className="font-serif italic font-normal text-accent text-base">
              Studio
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted tracking-wider uppercase mt-1 hidden sm:block">
            Truth Engine &bull; Phase 0
          </span>
        </div>
      )}
    </motion.div>
  );
}

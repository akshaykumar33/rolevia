"use client";

import { FileCheck2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "../../ui/motion";

// Sample values that match the run shown in AgentDemo.
const MATCH = 91;

/** Cards that hover around the agent panel to make the hero read as a product shot. */
export function HeroFloaters() {
  const reduce = useReducedMotion();
  const float = (amp: number, dur: number) =>
    reduce
      ? {}
      : {
          y: [0, -amp, 0],
          transition: {
            duration: dur,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  const r = 20;
  const c = 2 * Math.PI * r;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden xl:block"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.1 }}
        className="absolute -left-16 top-20"
      >
        <motion.div
          animate={float(8, 5)}
          className="flex items-center gap-3 rounded-2xl border border-line bg-surface/90 p-3 pr-5 shadow-lg backdrop-blur-xl"
        >
          <div className="relative grid size-12 place-items-center">
            <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
              <circle
                cx="24"
                cy="24"
                r={r}
                fill="none"
                stroke="var(--border)"
                strokeWidth="4"
              />
              <motion.circle
                cx="24"
                cy="24"
                r={r}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={c}
                initial={{ strokeDashoffset: c }}
                animate={{ strokeDashoffset: c * (1 - MATCH / 100) }}
                transition={{ duration: 1.4, ease: EASE_OUT, delay: 1.3 }}
              />
            </svg>
            <span className="text-sm font-semibold tabular-nums">{MATCH}</span>
          </div>
          <div>
            <p className="text-sm font-semibold">Strong match</p>
            <p className="text-xs text-fg-3">Senior Backend, Northwind</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.4 }}
        className="absolute -bottom-8 -right-10"
      >
        <motion.div
          animate={float(10, 6)}
          className="flex items-center gap-3 rounded-2xl bg-accent px-4 py-3 text-accent-fg shadow-[0_16px_40px_-12px_var(--accent)]"
        >
          <FileCheck2 size={20} />
          <div>
            <p className="text-sm font-semibold">Resume tailored</p>
            <p className="text-xs opacity-75">7 bullets reordered, 0 added</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

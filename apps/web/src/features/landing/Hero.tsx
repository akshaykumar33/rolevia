"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { AgentDemo } from "./AgentDemo";
import { HeroFloaters } from "./HeroFloaters";
import { EASE_OUT, Magnetic, WordReveal } from "../../ui/motion";

const portals = [
  "LinkedIn",
  "Naukri",
  "Indeed",
  "Wellfound",
  "Greenhouse",
  "Lever",
  "Ashby",
  "Workday",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const panelRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduce ? 0 : 6],
  );
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-28 sm:pt-32"
    >
      {/* Aurora: two slow-drifting blurred blobs plus a fading grid. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute left-[8%] top-[-12%] size-[560px] animate-[drift_18s_ease-in-out_infinite_alternate] rounded-full bg-accent/25 blur-[120px] motion-reduce:animate-none" />
        <div className="absolute right-[-6%] top-[18%] size-[460px] animate-[drift_22s_ease-in-out_infinite_alternate-reverse] rounded-full bg-[#3dd6c6]/15 blur-[120px] motion-reduce:animate-none" />
      </div>

      <div className="container-page grid items-center gap-16 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
        <motion.div style={{ y: copyY, opacity: fade }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1 pl-1 pr-3 text-sm text-fg-2 backdrop-blur"
          >
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-fg">
              New
            </span>
            Bring your own AI key
          </motion.p>

          <h1 className="mt-6 text-[clamp(2.6rem,1.6rem+3.6vw,4.5rem)] font-bold leading-[1] tracking-[-0.035em]">
            <WordReveal text="Applying to jobs is a job." className="block" />
            <WordReveal
              text="Let Rolevia take it."
              className="block text-accent"
              delay={0.25}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.55 }}
            className="mt-7 max-w-[42ch] text-lg leading-relaxed text-fg-2"
          >
            It finds roles that fit, rewrites your resume for each one, applies
            on your schedule, and tells you what happened.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/app"
                className="btn-primary sheen btn-lg group h-14 rounded-full px-8 text-base shadow-[0_10px_40px_-10px_var(--accent)]"
              >
                Get started
                <ArrowRight
                  size={18}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </Magnetic>
            <a
              href="#how-it-works"
              className="btn-ghost btn-lg h-14 rounded-full px-6 text-base"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.3 }}
          style={{
            y: panelY,
            rotateX: panelRotate,
            transformPerspective: 1200,
          }}
        >
          <div className="relative">
            <AgentDemo />
            <HeroFloaters />
          </div>
        </motion.div>
      </div>

      <div className="border-y border-line bg-surface/40 backdrop-blur-sm">
        <div className="container-page flex flex-col gap-4 py-7 md:flex-row md:items-center md:gap-10">
          <p className="shrink-0 text-sm text-fg-3">Applies through</p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="flex w-max animate-[marquee_40s_linear_infinite] gap-14 motion-reduce:animate-none">
              {[...portals, ...portals].map((p, i) => (
                <li
                  key={i}
                  aria-hidden={i >= portals.length}
                  className="font-display text-xl font-semibold tracking-tight text-fg-3"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

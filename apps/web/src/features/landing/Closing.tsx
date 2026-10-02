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
import { BRAND_CONFIG } from "@rolevia/config";
import { Logo } from "../../ui/Logo";
import { FadeIn, Magnetic } from "../../ui/motion";

export function Closing() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 120, 0]);

  return (
    <>
      <section className="container-page pb-24">
        <FadeIn>
          <div className="relative isolate overflow-hidden rounded-[32px] border border-line bg-surface px-6 py-20 text-center sm:px-12 sm:py-28">
            <div
              aria-hidden
              className="bg-grid absolute inset-0 -z-10 opacity-70"
            />
            <div
              aria-hidden
              className="absolute bottom-[-260px] left-1/2 -z-10 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]"
            />
            <h2 className="mx-auto max-w-[16ch] text-[clamp(2.2rem,1.2rem+3vw,4rem)] font-bold leading-[1.02]">
              Your next job search can run itself.
            </h2>
            <p className="mx-auto mt-5 max-w-[42ch] text-lg text-fg-2">
              Ten minutes to set up. Review mode on, so nothing is sent until
              you say so.
            </p>
            <div className="mt-10">
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
            </div>
          </div>
        </FadeIn>
      </section>

      <footer
        ref={ref}
        className="relative overflow-hidden border-t border-line"
      >
        <div className="container-page flex flex-col gap-4 pt-10 text-sm text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p>
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.legalEntity}
          </p>
        </div>
        <motion.p
          aria-hidden
          style={{ y: wordY }}
          className="select-none text-center font-display text-[clamp(5rem,22vw,20rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_var(--border-strong)]"
        >
          {BRAND_CONFIG.displayName.toLowerCase()}
        </motion.p>
      </footer>
    </>
  );
}

"use client";

import { CalendarClock, FileUp, KeyRound, Mail } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import { EASE_OUT, FadeIn } from "../../ui/motion";
import {
  ConnectPreview,
  PlanPreview,
  ReportPreview,
  UploadPreview,
} from "./StepPreviews";

const steps = [
  {
    icon: FileUp,
    title: "Tell us who you are",
    body: "Upload your resume, a job description you like, and anything else that helps.",
    preview: UploadPreview,
  },
  {
    icon: KeyRound,
    title: "Connect your AI and portals",
    body: "Add your own AI key and pick the job sites you use. Sessions stay yours.",
    preview: ConnectPreview,
  },
  {
    icon: CalendarClock,
    title: "Set the plan",
    body: "How many jobs, which portals, and when. Once, every weekday, or every morning.",
    preview: PlanPreview,
  },
  {
    icon: Mail,
    title: "Read the report",
    body: "Every application, the resume version it used, and why anything was skipped.",
    preview: ReportPreview,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24">
      <PinnedSteps />
      <StackedSteps />
    </section>
  );
}

/** Desktop: the section pins while scrolling walks through each step. */
function PinnedSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setActive(Math.min(steps.length - 1, Math.floor(p * steps.length))),
  );
  const Preview = steps[active]!.preview;

  return (
    <div ref={ref} className="relative hidden h-[360vh] lg:block">
      <div className="sticky top-0 flex h-[100dvh] items-center">
        <div className="container-page grid w-full grid-cols-[0.95fr_1.05fr] items-center gap-20">
          <div>
            <p className="text-sm font-semibold text-accent">How it works</p>
            <h2 className="mt-3 text-[clamp(2rem,1.2rem+2.4vw,3.5rem)] font-bold leading-[1.02]">
              Set it up once.
              <br />
              It keeps working.
            </h2>

            <ol className="relative mt-12 space-y-1 pl-6">
              <div
                aria-hidden
                className="absolute bottom-2 left-0 top-2 w-px bg-line"
              >
                <motion.div
                  style={{ scaleY: bar }}
                  className="h-full w-px origin-top bg-accent"
                />
              </div>
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <li
                    key={s.title}
                    aria-current={on ? "step" : undefined}
                    className="py-3"
                  >
                    <motion.h3
                      animate={{ opacity: on ? 1 : 0.4, x: on ? 0 : -4 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="flex items-center gap-3 text-lg font-semibold"
                    >
                      <s.icon
                        size={18}
                        aria-hidden
                        className={on ? "text-accent" : ""}
                      />
                      {s.title}
                    </motion.h3>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: EASE_OUT }}
                          className="max-w-[40ch] overflow-hidden pl-[30px] text-fg-2"
                        >
                          <span className="block pt-1">{s.body}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative rounded-[28px] border border-line bg-surface-2/50 p-10">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[28px] bg-[radial-gradient(60%_50%_at_70%_0%,var(--accent-soft),transparent)]"
            />
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{
                    opacity: 0,
                    y: 24,
                    scale: 0.98,
                    filter: "blur(6px)",
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    y: -16,
                    scale: 0.98,
                    filter: "blur(6px)",
                  }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <Preview />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile and tablet: a plain sequence, no pinning. */
function StackedSteps() {
  return (
    <div className="container-page py-24 lg:hidden">
      <p className="text-sm font-semibold text-accent">How it works</p>
      <h2 className="mt-3 text-[clamp(2rem,1.2rem+2.4vw,3.5rem)] font-bold leading-[1.02]">
        Set it up once. It keeps working.
      </h2>
      <ol className="mt-12 space-y-14">
        {steps.map((s) => (
          <li key={s.title}>
            <FadeIn>
              <h3 className="flex items-center gap-3 text-lg font-semibold">
                <s.icon size={18} className="text-accent" aria-hidden />
                {s.title}
              </h3>
              <p className="mt-1 text-fg-2">{s.body}</p>
              <div className="mt-6">
                <s.preview />
              </div>
            </FadeIn>
          </li>
        ))}
      </ol>
    </div>
  );
}

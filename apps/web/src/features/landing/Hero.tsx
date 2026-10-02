import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AgentDemo } from "./AgentDemo";

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
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-280px] -z-10 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)] opacity-90 blur-2xl"
      />

      <div className="container-page grid items-center gap-14 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
        <div className="animate-[rowIn_800ms_cubic-bezier(0.16,1,0.3,1)]">
          <h1 className="text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-4xl lg:text-[3.5rem]">
            Apply to the right jobs, with a resume{" "}
            <span className="text-accent">written for each one.</span>
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-fg-2">
            Rolevia finds roles that fit, tailors your resume truthfully,
            applies on your schedule, and reports back.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="btn-primary btn-lg group shadow-[0_8px_24px_-8px_var(--accent)]"
            >
              Get started
              <ArrowRight
                size={18}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <a href="#how-it-works" className="btn-secondary btn-lg">
              How it works
            </a>
          </div>
        </div>

        <div className="animate-[rowIn_900ms_cubic-bezier(0.16,1,0.3,1)_120ms_both]">
          <AgentDemo />
        </div>
      </div>

      <div className="border-y border-line bg-surface/50">
        <div className="container-page flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-10">
          <p className="shrink-0 text-sm text-fg-3">Applies through</p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="flex w-max animate-[marquee_40s_linear_infinite] gap-12 motion-reduce:animate-none">
              {[...portals, ...portals].map((p, i) => (
                <li
                  key={i}
                  aria-hidden={i >= portals.length}
                  className="text-lg font-semibold tracking-tight text-fg-3"
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

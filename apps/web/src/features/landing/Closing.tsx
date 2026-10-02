import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "@rolevia/config";
import { Logo } from "../../ui/Logo";
import { Reveal } from "../../ui/Reveal";

export function Closing() {
  return (
    <>
      <section className="container-page pb-24">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[28px] border border-line bg-surface px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="bg-grid absolute inset-0 -z-10 opacity-70"
            />
            <div
              aria-hidden
              className="absolute bottom-[-240px] left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]"
            />
            <h2 className="mx-auto max-w-[20ch] text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Your next job search can run itself.
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-fg-2">
              Set up in about ten minutes. Start in review mode, so nothing is
              sent until you say so.
            </p>
            <Link
              href="/app"
              className="btn-primary btn-lg group mt-9 shadow-[0_8px_24px_-8px_var(--accent)]"
            >
              Get started
              <ArrowRight
                size={18}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-line">
        <div className="container-page flex flex-col gap-4 py-8 text-sm text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p>
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.legalEntity}
          </p>
        </div>
      </footer>
    </>
  );
}

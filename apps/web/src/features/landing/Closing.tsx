import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "@rolevia/config";
import { Logo } from "../../ui/Logo";

export function Closing() {
  return (
    <>
      <section className="container-page pb-20 lg:pb-24">
        <div className="card flex flex-col items-start gap-6 px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">
              Set up your first campaign in about ten minutes.
            </h2>
            <p className="mt-2 text-fg-2">
              Start in review mode. Nothing is sent until you say so.
            </p>
          </div>
          <Link href="/app" className="btn-primary btn-lg shrink-0">
            Get started
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
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

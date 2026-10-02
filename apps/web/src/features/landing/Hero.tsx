import Link from "next/link";
import { ArrowRight, Check, Clock, FileText } from "lucide-react";
import { Badge } from "../../ui/primitives";

// A real, static rendering of the daily report the product sends.
// Sample data, labelled as such.
const sample = [
  {
    company: "Northwind Labs",
    role: "Senior Backend Engineer",
    portal: "LinkedIn",
    match: 91,
    status: "applied",
  },
  {
    company: "Kestrel Health",
    role: "Platform Engineer",
    portal: "Greenhouse",
    match: 87,
    status: "applied",
  },
  {
    company: "Tidewater Pay",
    role: "Staff Engineer, Payments",
    portal: "Lever",
    match: 84,
    status: "review",
  },
  {
    company: "Orbit Freight",
    role: "Backend Engineer II",
    portal: "Naukri",
    match: 62,
    status: "skipped",
  },
] as const;

export function Hero() {
  return (
    <section className="container-page grid items-center gap-12 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28">
      <div>
        <h1 className="text-3xl font-semibold leading-[1.1] sm:text-4xl">
          Apply to the right jobs, with a resume written for each one.
        </h1>
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-fg-2">
          Rolevia finds roles that fit, tailors your resume truthfully, applies
          on your schedule, and reports back.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/app" className="btn-primary btn-lg">
            Get started
            <ArrowRight size={18} aria-hidden />
          </Link>
          <a href="#how-it-works" className="btn-secondary btn-lg">
            How it works
          </a>
        </div>
      </div>

      <figure className="card overflow-hidden shadow-lg">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="text-sm font-semibold">Today&apos;s report</p>
            <p className="text-xs text-fg-3">Sample data</p>
          </div>
          <Badge tone="accent">
            <Clock size={12} aria-hidden />
            Daily at 9:00
          </Badge>
        </div>
        <ul className="divide-y divide-line">
          {sample.map((row) => (
            <li
              key={row.company}
              className="flex items-center gap-4 px-5 py-3.5"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-control bg-surface-2 text-sm font-semibold text-fg-2">
                {row.company[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{row.role}</p>
                <p className="truncate text-xs text-fg-3">
                  {row.company}, via {row.portal}
                </p>
              </div>
              <span className="hidden font-mono text-xs text-fg-2 sm:inline">
                {row.match}% fit
              </span>
              {row.status === "applied" && (
                <Badge tone="success">
                  <Check size={12} aria-hidden />
                  Applied
                </Badge>
              )}
              {row.status === "review" && (
                <Badge tone="warning">Needs you</Badge>
              )}
              {row.status === "skipped" && <Badge>Skipped</Badge>}
            </li>
          ))}
        </ul>
        <figcaption className="flex items-center gap-2 border-t border-line bg-surface-2/60 px-5 py-3 text-xs text-fg-2">
          <FileText size={14} aria-hidden />
          Each application used its own tailored resume.
        </figcaption>
      </figure>
    </section>
  );
}

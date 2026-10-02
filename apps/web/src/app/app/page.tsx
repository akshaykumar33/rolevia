"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Hand,
  Inbox,
  SkipForward,
  type LucideIcon,
} from "lucide-react";
import { Badge, EmptyState } from "../../ui/primitives";
import { useWorkspace } from "../../features/workspace/store";
import { PORTALS, setupSteps } from "../../features/workspace/model";
import { scheduleLabel } from "../../features/workspace/format";

export default function OverviewPage() {
  const w = useWorkspace();
  const steps = setupSteps(w);
  const doneCount = steps.filter((s) => s.done).length;
  const ready = doneCount === steps.length;
  const next = steps.find((s) => !s.done);
  const firstName = w.profile.fullName.split(" ")[0];

  const counts = {
    applied: w.applications.filter((a) => a.status === "applied").length,
    review: w.applications.filter((a) => a.status === "needs-review").length,
    skipped: w.applications.filter((a) => a.status === "skipped").length,
  };

  return (
    <div className="space-y-6">
      <section className="relative isolate overflow-hidden rounded-[20px] border border-line bg-surface p-6 sm:p-8">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 -z-10 opacity-60"
        />
        <div
          aria-hidden
          className="absolute -right-32 -top-40 -z-10 size-[420px] rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]"
        />
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              {firstName
                ? `Good to see you, ${firstName}`
                : "Welcome to Rolevia"}
            </h1>
            <p className="mt-2 max-w-[46ch] text-fg-2">
              {ready
                ? w.campaign.paused
                  ? "Your campaign is paused. Resume it when you are ready."
                  : `Your campaign runs ${scheduleLabel(w.campaign).toLowerCase()}.`
                : `${steps.length - doneCount} quick ${
                    steps.length - doneCount === 1 ? "step" : "steps"
                  } left before your first campaign can run.`}
            </p>
            {next && (
              <Link href={next.href} className="btn-primary group mt-6">
                {next.label}
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            )}
            {ready && (
              <Link href="/app/campaign" className="btn-secondary mt-6">
                Edit campaign
              </Link>
            )}
          </div>
          <ProgressRing value={doneCount} total={steps.length} />
        </div>

        {!ready && (
          <ol className="mt-8 grid gap-2 sm:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className={`flex h-full flex-col gap-3 rounded-card border p-3.5 text-sm transition-colors ${
                    s.done
                      ? "border-transparent bg-accent-soft/60 text-fg-2"
                      : s.id === next?.id
                        ? "border-accent/50 bg-surface shadow-sm"
                        : "border-line bg-surface/70 text-fg-2 hover:border-line-strong"
                  }`}
                >
                  <span
                    className={`grid size-6 place-items-center rounded-full text-xs font-semibold ${
                      s.done
                        ? "bg-accent text-accent-fg"
                        : "border border-line-strong text-fg-2"
                    }`}
                  >
                    {s.done ? <Check size={13} aria-hidden /> : i + 1}
                  </span>
                  <span
                    className={s.id === next?.id ? "font-medium text-fg" : ""}
                  >
                    {s.label}
                    {s.done && <span className="sr-only"> (done)</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section aria-label="Summary" className="grid gap-4 sm:grid-cols-3">
        <Stat
          icon={CheckCircle2}
          tone="text-success bg-success-soft"
          label="Applied"
          value={counts.applied}
        />
        <Stat
          icon={Hand}
          tone="text-warning bg-warning-soft"
          label="Waiting for you"
          value={counts.review}
        />
        <Stat
          icon={SkipForward}
          tone="text-fg-2 bg-surface-2"
          label="Skipped"
          value={counts.skipped}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="card">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="text-base font-semibold">Recent activity</h2>
            <Link
              href="/app/activity"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all
            </Link>
          </div>
          {w.applications.length === 0 ? (
            <EmptyState
              icon={<Inbox size={20} aria-hidden />}
              title="No applications yet"
              description="When your campaign runs, every application and skip shows up here."
            />
          ) : (
            <ul className="divide-y divide-line">
              {w.applications.slice(0, 5).map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-4 px-5 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.role}</p>
                    <p className="truncate text-xs text-fg-3">{a.company}</p>
                  </div>
                  <span className="text-xs tabular-nums text-fg-2">
                    {a.match}%
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Campaign</h2>
            {w.campaign.paused ? (
              <Badge tone="warning">Paused</Badge>
            ) : w.campaign.portals.length ? (
              <Badge tone="success">Active</Badge>
            ) : (
              <Badge>Not set</Badge>
            )}
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-control bg-surface-2 px-4 py-3">
            <Clock size={16} className="text-accent" aria-hidden />
            <span className="text-sm font-medium">
              {scheduleLabel(w.campaign)}
            </span>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <Row term="Jobs per run" value={String(w.campaign.jobsPerRun)} />
            <Row term="Minimum match" value={`${w.campaign.minMatch}%`} />
            <Row
              term="Portals"
              value={
                w.campaign.portals.length
                  ? w.campaign.portals
                      .map((id) => PORTALS.find((p) => p.id === id)?.name)
                      .join(", ")
                  : "None chosen"
              }
            />
            <Row
              term="Mode"
              value={w.campaign.reviewFirst ? "Review first" : "Autopilot"}
            />
          </dl>
        </div>
      </section>
    </div>
  );
}

function ProgressRing({ value, total }: { value: number; total: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const pct = value / total;
  return (
    <div
      className="relative grid size-28 shrink-0 place-items-center"
      role="img"
      aria-label={`Setup ${value} of ${total} done`}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="text-center">
        <p className="text-2xl font-semibold tabular-nums">
          {value}
          <span className="text-fg-3">/{total}</span>
        </p>
        <p className="text-xs text-fg-3">set up</p>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  tone,
  label,
  value,
}: {
  icon: LucideIcon;
  tone: string;
  label: string;
  value: number;
}) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className={`grid size-11 place-items-center rounded-xl ${tone}`}>
        <Icon size={20} aria-hidden />
      </span>
      <div>
        <p className="text-2xl font-semibold tabular-nums">{value}</p>
        <p className="text-sm text-fg-2">{label}</p>
      </div>
    </div>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-fg-3">{term}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

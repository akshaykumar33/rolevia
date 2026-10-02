"use client";

import Link from "next/link";
import { ArrowRight, Check, Inbox } from "lucide-react";
import { Badge, EmptyState, PageHeader } from "../../ui/primitives";
import { useWorkspace } from "../../features/workspace/store";
import { PORTALS, setupSteps } from "../../features/workspace/model";
import { scheduleLabel } from "../../features/workspace/format";

export default function OverviewPage() {
  const w = useWorkspace();
  const steps = setupSteps(w);
  const doneCount = steps.filter((s) => s.done).length;
  const ready = doneCount === steps.length;
  const firstName = w.profile.fullName.split(" ")[0];

  const counts = {
    applied: w.applications.filter((a) => a.status === "applied").length,
    review: w.applications.filter((a) => a.status === "needs-review").length,
    skipped: w.applications.filter((a) => a.status === "skipped").length,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={firstName ? `Welcome back, ${firstName}` : "Welcome to Rolevia"}
        description={
          ready
            ? "Here is where your job search stands."
            : "Finish these steps and your first campaign is ready to run."
        }
      />

      {!ready && (
        <section className="card" aria-labelledby="setup-title">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
            <h2 id="setup-title" className="text-base font-semibold">
              Get set up
            </h2>
            <span className="text-sm text-fg-2">
              {doneCount} of {steps.length} done
            </span>
          </div>
          <div
            className="h-1 bg-surface-2"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-valuenow={doneCount}
            aria-label="Setup progress"
          >
            <div
              className="h-full bg-accent transition-[width] duration-300"
              style={{ width: `${(doneCount / steps.length) * 100}%` }}
            />
          </div>
          <ol className="divide-y divide-line">
            {steps.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2/60 sm:px-6"
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full border ${
                      s.done
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-line-strong"
                    }`}
                  >
                    {s.done && <Check size={14} aria-hidden />}
                  </span>
                  <span
                    className={`flex-1 text-sm ${
                      s.done ? "text-fg-3 line-through" : "font-medium"
                    }`}
                  >
                    {s.label}
                    {s.done && <span className="sr-only"> (done)</span>}
                  </span>
                  {!s.done && (
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="text-fg-3 transition-transform group-hover:translate-x-0.5"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section aria-label="Summary" className="grid gap-4 sm:grid-cols-3">
        <Stat label="Applied" value={counts.applied} />
        <Stat
          label="Waiting for your review"
          value={counts.review}
          highlight={counts.review > 0}
        />
        <Stat label="Skipped" value={counts.skipped} />
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
                  <span className="font-mono text-xs text-fg-2">
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
          <dl className="mt-5 space-y-3 text-sm">
            <Row term="Schedule" value={scheduleLabel(w.campaign)} />
            <Row term="Jobs per run" value={String(w.campaign.jobsPerRun)} />
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
              value={
                w.campaign.reviewFirst
                  ? "Review before sending"
                  : "Full autopilot"
              }
            />
          </dl>
          <Link href="/app/campaign" className="btn-secondary mt-6 w-full">
            Edit campaign
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className={`card p-5 ${highlight ? "border-warning/40" : ""}`}>
      <p className="text-sm text-fg-2">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">
        {value}
      </p>
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { Inbox } from "lucide-react";
import { Badge, EmptyState, PageHeader } from "../../../ui/primitives";
import {
  updateWorkspace,
  useWorkspace,
} from "../../../features/workspace/store";
import {
  PORTALS,
  type ApplicationStatus,
} from "../../../features/workspace/model";
import { formatDate } from "../../../features/workspace/format";

const filters: { id: ApplicationStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "needs-review", label: "Needs review" },
  { id: "applied", label: "Applied" },
  { id: "skipped", label: "Skipped" },
  { id: "failed", label: "Failed" },
];

const statusBadge: Record<
  ApplicationStatus,
  { tone: "success" | "warning" | "neutral" | "danger"; label: string }
> = {
  applied: { tone: "success", label: "Applied" },
  "needs-review": { tone: "warning", label: "Needs review" },
  skipped: { tone: "neutral", label: "Skipped" },
  failed: { tone: "danger", label: "Failed" },
};

export default function ActivityPage() {
  const { applications } = useWorkspace();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const rows =
    filter === "all"
      ? applications
      : applications.filter((a) => a.status === filter);

  function decide(id: string, approve: boolean) {
    updateWorkspace((ws) => ({
      ...ws,
      applications: ws.applications.map((a) =>
        a.id === id
          ? {
              ...a,
              status: approve ? "applied" : "skipped",
              reason: approve ? undefined : "Declined by you",
            }
          : a,
      ),
    }));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity"
        description="Every application, what it scored, and anything waiting for you."
      />

      <div
        role="group"
        aria-label="Filter by status"
        className="flex gap-1 overflow-x-auto"
      >
        {filters.map((f) => {
          const count =
            f.id === "all"
              ? applications.length
              : applications.filter((a) => a.status === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`btn-sm btn shrink-0 rounded-full ${
                filter === f.id
                  ? "bg-fg text-bg"
                  : "text-fg-2 hover:bg-surface-2"
              }`}
            >
              {f.label}
              <span className="text-xs tabular-nums opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="card overflow-hidden">
        {rows.length === 0 ? (
          <EmptyState
            icon={<Inbox size={20} aria-hidden />}
            title={
              applications.length
                ? "Nothing in this view"
                : "No applications yet"
            }
            description={
              applications.length
                ? "Try another filter."
                : "Once your campaign runs, you will see each job here with its match score and the resume version used."
            }
            action={
              !applications.length && (
                <Link href="/app/campaign" className="btn-secondary btn-sm">
                  Set up campaign
                </Link>
              )
            }
          />
        ) : (
          <ul className="divide-y divide-line">
            {rows.map((a) => {
              const b = statusBadge[a.status];
              return (
                <li
                  key={a.id}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.role}</p>
                    <p className="truncate text-xs text-fg-3">
                      {a.company}, via{" "}
                      {PORTALS.find((p) => p.id === a.portal)?.name},{" "}
                      {formatDate(a.at)}
                      {a.reason && `. ${a.reason}`}
                    </p>
                  </div>
                  <span className="text-xs tabular-nums text-fg-2">
                    {a.match}% fit
                  </span>
                  {a.status === "needs-review" ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="btn-ghost btn-sm"
                        onClick={() => decide(a.id, false)}
                      >
                        Skip
                      </button>
                      <button
                        type="button"
                        className="btn-primary btn-sm"
                        onClick={() => decide(a.id, true)}
                      >
                        Approve
                      </button>
                    </div>
                  ) : (
                    <Badge tone={b.tone}>{b.label}</Badge>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

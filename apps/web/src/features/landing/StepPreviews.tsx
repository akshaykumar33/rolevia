import type { ReactNode } from "react";
import { Check, FileText, KeyRound } from "lucide-react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="card p-5 shadow-lg">{children}</div>;
}

export function UploadPreview() {
  return (
    <div className="space-y-3">
      <Panel>
        {[
          { name: "resume-2026.pdf", note: "Resume, 2 pages" },
          { name: "dream-role-jd.pdf", note: "Job description" },
          { name: "portfolio-links.txt", note: "Supporting" },
        ].map((f) => (
          <div key={f.name} className="flex items-center gap-3 py-2">
            <FileText size={18} className="text-fg-3" aria-hidden />
            <div className="flex-1">
              <p className="text-sm font-medium">{f.name}</p>
              <p className="text-xs text-fg-3">{f.note}</p>
            </div>
            <Check size={16} className="text-success" aria-hidden />
          </div>
        ))}
      </Panel>
      <Panel>
        <p className="text-xs font-medium text-fg-3">
          Skills found in your resume
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "AWS Lambda",
            "Redis",
            "System design",
            "Next.js",
          ].map((s, i) => (
            <span
              key={s}
              className="badge animate-[rowIn_400ms_both] bg-accent-soft text-accent"
              style={{ animationDelay: `${150 + i * 70}ms` }}
            >
              {s}
            </span>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function ConnectPreview() {
  return (
    <div className="space-y-3">
      <Panel>
        <p className="text-sm font-medium">AI key</p>
        <div className="mt-2 flex items-center gap-3 rounded-control border border-line-strong px-3 py-2.5">
          <KeyRound size={16} className="text-accent" aria-hidden />
          <span className="flex-1 font-mono text-sm text-fg-2">
            sk-ant-••••••••••••7Qx2
          </span>
          <span className="badge bg-success-soft text-success">Verified</span>
        </div>
      </Panel>
      <Panel>
        <p className="text-sm font-medium">Portals</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            ["LinkedIn", true],
            ["Naukri", true],
            ["Greenhouse", true],
            ["Indeed", false],
          ].map(([n, on], i) => (
            <div
              key={n as string}
              className={`flex animate-[rowIn_400ms_both] items-center justify-between rounded-control border px-3 py-2.5 text-sm ${
                on ? "border-accent/40 bg-accent-soft/50" : "border-line"
              }`}
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              {n}
              {on ? (
                <Check size={15} className="text-accent" aria-hidden />
              ) : (
                <span className="text-xs text-fg-3">Off</span>
              )}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function PlanPreview() {
  return (
    <Panel>
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium">Jobs per run</p>
        <p className="text-2xl font-semibold tabular-nums">15</p>
      </div>
      <div className="mt-3 h-2 rounded-full bg-surface-2">
        <div className="h-full w-[30%] origin-left animate-[grow_900ms_cubic-bezier(0.16,1,0.3,1)] rounded-full bg-accent" />
      </div>
      <p className="mt-6 text-sm font-medium">Schedule</p>
      <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
        {["Manually", "Weekdays", "Every day"].map((s) => (
          <div
            key={s}
            className={`rounded-control border px-3 py-2.5 text-center ${
              s === "Weekdays"
                ? "border-accent bg-accent-soft font-medium text-accent"
                : "border-line text-fg-2"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between rounded-control bg-surface-2 px-4 py-3 text-sm">
        <span className="text-fg-2">Next run</span>
        <span className="font-medium">Tomorrow, 9:00</span>
      </div>
    </Panel>
  );
}

export function ReportPreview() {
  return (
    <Panel>
      <div className="flex items-center gap-3 border-b border-line pb-4">
        <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-fg">
          R
        </span>
        <div>
          <p className="text-sm font-semibold">Your Tuesday report</p>
          <p className="text-xs text-fg-3">Sent at 9:42</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 py-5 text-center">
        {[
          ["8", "Applied", "text-success"],
          ["2", "Need you", "text-warning"],
          ["13", "Skipped", "text-fg-2"],
        ].map(([n, l, c], i) => (
          <div
            key={l}
            className="animate-[rowIn_500ms_both]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className={`text-3xl font-semibold tabular-nums ${c}`}>{n}</p>
            <p className="mt-1 text-xs text-fg-3">{l}</p>
          </div>
        ))}
      </div>
      <p className="rounded-control bg-surface-2 px-4 py-3 text-sm text-fg-2">
        Tidewater Pay asks for expected salary. Approve or skip from your
        dashboard.
      </p>
    </Panel>
  );
}

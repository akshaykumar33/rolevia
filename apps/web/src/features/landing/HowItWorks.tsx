"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  CalendarClock,
  Check,
  FileText,
  FileUp,
  KeyRound,
  Mail,
} from "lucide-react";
import { Reveal } from "../../ui/Reveal";

const STEP_MS = 6000;

const steps = [
  {
    icon: FileUp,
    title: "Tell us who you are",
    body: "Upload your resume, a job description you like, and anything else that helps.",
  },
  {
    icon: KeyRound,
    title: "Connect your AI and portals",
    body: "Add your own AI key and pick the job sites you use. Sessions stay yours.",
  },
  {
    icon: CalendarClock,
    title: "Set the plan",
    body: "How many jobs, which portals, and when. Once, every weekday, or every morning.",
  },
  {
    icon: Mail,
    title: "Read the report",
    body: "Every application, the resume version it used, and why anything was skipped.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(
      () => setActive((a) => (a + 1) % steps.length),
      STEP_MS,
    );
    return () => clearTimeout(t);
  }, [active, auto]);

  return (
    <section id="how-it-works" className="scroll-mt-20">
      <div className="container-page py-24 lg:py-32">
        <Reveal>
          <p className="text-sm font-medium text-accent">How it works</p>
          <h2 className="mt-3 max-w-[20ch] text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
            Set it up once. It keeps working.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ol className="space-y-2">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setAuto(false);
                    }}
                    aria-current={on ? "step" : undefined}
                    className={`relative w-full overflow-hidden rounded-card border p-5 text-left transition-colors duration-200 ${
                      on
                        ? "border-line bg-surface shadow-md"
                        : "border-transparent hover:bg-surface/60"
                    }`}
                  >
                    <div className="flex gap-4">
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${
                          on
                            ? "bg-accent text-accent-fg"
                            : "bg-surface-2 text-fg-2"
                        }`}
                      >
                        <s.icon size={18} aria-hidden />
                      </span>
                      <div>
                        <h3
                          className={`text-base font-semibold ${on ? "" : "text-fg-2"}`}
                        >
                          {s.title}
                        </h3>
                        <p
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                            on
                              ? "mt-1 grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <span className="overflow-hidden text-fg-2">
                            {s.body}
                          </span>
                        </p>
                      </div>
                    </div>
                    {on && auto && (
                      <span
                        aria-hidden
                        key={active}
                        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-accent motion-reduce:hidden"
                        style={{ animation: `progress ${STEP_MS}ms linear` }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="relative min-h-[380px] rounded-[20px] border border-line bg-surface-2/60 p-4 sm:p-8">
            <div
              aria-hidden
              className="absolute inset-0 -z-0 rounded-[20px] bg-[radial-gradient(60%_50%_at_70%_0%,var(--accent-soft),transparent)]"
            />
            <div
              key={active}
              className="relative animate-[rowIn_500ms_cubic-bezier(0.16,1,0.3,1)]"
            >
              {active === 0 && <UploadPreview />}
              {active === 1 && <ConnectPreview />}
              {active === 2 && <PlanPreview />}
              {active === 3 && <ReportPreview />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return <div className="card p-5 shadow-lg">{children}</div>;
}

function UploadPreview() {
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

function ConnectPreview() {
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

function PlanPreview() {
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

function ReportPreview() {
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

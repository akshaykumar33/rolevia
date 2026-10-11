"use client";

import { useEffect, useState } from "react";
import {
  Check,
  FileText,
  Filter,
  Hand,
  Search,
  ShieldCheck,
  SkipForward,
  type LucideIcon,
} from "lucide-react";

type Kind =
  "search" | "filter" | "tailor" | "check" | "applied" | "review" | "skip";

const script: { kind: Kind; text: string; meta: string }[] = [
  {
    kind: "search",
    text: "Searching LinkedIn and Greenhouse",
    meta: "148 new roles",
  },
  {
    kind: "filter",
    text: "Kept 23 roles above your 80% match",
    meta: "125 skipped",
  },
  {
    kind: "tailor",
    text: "Tailoring resume for Northwind Labs",
    meta: "Senior Backend",
  },
  { kind: "check", text: "Fact check passed", meta: "0 new claims" },
  { kind: "applied", text: "Applied to Northwind Labs", meta: "91% fit" },
  {
    kind: "tailor",
    text: "Tailoring resume for Kestrel Health",
    meta: "Platform",
  },
  { kind: "applied", text: "Applied to Kestrel Health", meta: "87% fit" },
  {
    kind: "review",
    text: "Tidewater Pay held for you",
    meta: "Asks for salary",
  },
  { kind: "applied", text: "Applied to Lumen Grid", meta: "85% fit" },
];

const style: Record<Kind, { icon: LucideIcon; cls: string }> = {
  search: { icon: Search, cls: "bg-surface-2 text-fg-2" },
  filter: { icon: Filter, cls: "bg-surface-2 text-fg-2" },
  tailor: { icon: FileText, cls: "bg-accent-soft text-accent" },
  check: { icon: ShieldCheck, cls: "bg-accent-soft text-accent" },
  applied: { icon: Check, cls: "bg-success-soft text-success" },
  review: { icon: Hand, cls: "bg-warning-soft text-warning" },
  skip: { icon: SkipForward, cls: "bg-surface-2 text-fg-3" },
};

const VISIBLE = 5;

export function AgentDemo() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(script.length);
      return;
    }
    const done = step >= script.length;
    const t = setTimeout(
      () => setStep(done ? 1 : step + 1),
      done ? 3200 : 1300,
    );
    return () => clearTimeout(t);
  }, [step]);

  const shown = script.slice(0, step);
  const visible = shown.slice(-VISIBLE);
  const applied = shown.filter((e) => e.kind === "applied").length;
  const running = step < script.length;

  return (
    <figure
      className="relative overflow-hidden rounded-[20px] border border-line bg-surface/80 shadow-lg backdrop-blur-xl"
      aria-label="Sample run of the Rolevia agent"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2.5">
            {running && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            )}
            <span
              className={`relative inline-flex size-2.5 rounded-full ${running ? "bg-accent" : "bg-fg-3"}`}
            />
          </span>
          <div>
            <p className="text-sm font-semibold">
              {running ? "Morning run in progress" : "Morning run finished"}
            </p>
            <p className="text-xs text-fg-3">Sample run</p>
          </div>
        </div>
        <p className="text-sm tabular-nums text-fg-2">
          <span className="font-semibold text-fg">{applied}</span> of 10 applied
        </p>
      </div>

      <div className="h-1 bg-surface-2">
        <div
          className="h-full bg-accent transition-[width] duration-700 ease-out"
          style={{ width: `${(applied / 10) * 100}%` }}
        />
      </div>

      <ol
        className="relative h-[340px] space-y-1 overflow-hidden p-3"
        aria-live="off"
      >
        {visible.map((e, i) => {
          const s = style[e.kind];
          const isLatest = i === visible.length - 1 && running;
          return (
            <li
              key={`${step - visible.length + i}-${e.text}`}
              className={`flex animate-[rowIn_500ms_cubic-bezier(0.16,1,0.3,1)] items-center gap-3 rounded-xl px-3 py-3 ${
                isLatest ? "bg-surface-2/70" : ""
              }`}
            >
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-lg ${s.cls}`}
              >
                <s.icon size={16} aria-hidden />
              </span>
              <p className="min-w-0 flex-1 truncate text-sm font-medium">
                {e.text}
              </p>
              <span className="shrink-0 text-xs tabular-nums text-fg-3">
                {e.meta}
              </span>
            </li>
          );
        })}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-surface to-transparent"
        />
      </ol>
    </figure>
  );
}

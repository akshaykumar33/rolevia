"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "../../ui/Reveal";

// Segments wrapped in [[ ]] are the words that changed for this role.
const variants = [
  {
    id: "payments",
    label: "Payments platform",
    text: "Owned the Node.js services and PostgreSQL schema behind [[payment processing]], including the job queues that run [[nightly settlement batches]].",
  },
  {
    id: "health",
    label: "Health tech",
    text: "Built Node.js services and PostgreSQL storage for [[patient-facing workflows]], with job queues that kept [[appointment reminders]] on time.",
  },
  {
    id: "startup",
    label: "Early-stage startup",
    text: "[[Shipped end to end]]: Node.js services, the PostgreSQL schema and the job queues, [[owning each from design to production]].",
  },
];

function render(text: string) {
  return text.split(/(\[\[.*?\]\])/).map((part, i) =>
    part.startsWith("[[") ? (
      <mark
        key={i}
        className="rounded-[4px] bg-accent-soft px-0.5 text-fg [box-decoration-break:clone]"
      >
        {part.slice(2, -2)}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function Tailoring() {
  const [active, setActive] = useState(variants[0]!.id);
  const v = variants.find((x) => x.id === active)!;

  return (
    <section className="border-y border-line bg-surface">
      <div className="container-page grid gap-14 py-24 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:py-32">
        <Reveal>
          <h2 className="max-w-[18ch] text-[clamp(2rem,1.2rem+2.4vw,3.5rem)] font-bold leading-[1.02]">
            Same experience. Told the way each job needs to hear it.
          </h2>
          <p className="mt-5 max-w-[50ch] text-fg-2">
            Rolevia reorders and rephrases what you have already done so the
            most relevant work comes first, and picks a template that suits the
            company. It never adds skills, titles or dates that are not in your
            documents.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[20px] border border-line bg-bg p-3 sm:p-4">
            <div
              role="group"
              aria-label="Choose a role"
              className="flex flex-wrap gap-1 p-1"
            >
              {variants.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-pressed={x.id === active}
                  onClick={() => setActive(x.id)}
                  className={`btn-sm btn rounded-full ${
                    x.id === active
                      ? "bg-fg text-bg"
                      : "text-fg-2 hover:bg-surface-2"
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>

            <div className="mt-3 space-y-3">
              <div className="rounded-card border border-line bg-surface p-5">
                <p className="text-xs font-medium text-fg-3">
                  From your resume
                </p>
                <p className="mt-2 text-fg-2">
                  Built backend services in Node.js and maintained the
                  team&apos;s PostgreSQL databases and job queues.
                </p>
              </div>

              <div className="rounded-card border border-accent/40 bg-surface p-5 shadow-md">
                <p className="text-xs font-medium text-accent">
                  Tailored for {v.label.toLowerCase()}
                </p>
                <p
                  key={v.id}
                  className="mt-2 animate-[rowIn_450ms_cubic-bezier(0.16,1,0.3,1)] text-[1.0625rem] leading-relaxed"
                >
                  {render(v.text)}
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-fg-3">
                  <ShieldCheck size={15} className="text-accent" aria-hidden />
                  Fact check passed. Nothing new was claimed.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import {
  Eye,
  Lock,
  PauseCircle,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { FadeIn, useSpotlight } from "../../ui/motion";

export function Safety() {
  const track = useSpotlight();
  return (
    <section id="safety" className="scroll-mt-24">
      <div className="container-page py-24 lg:py-32">
        <FadeIn>
          <h2 className="max-w-[18ch] text-[clamp(2rem,1.2rem+2.4vw,3.5rem)] font-bold leading-[1.02]">
            Your name is on every application. We act like it.
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          <FadeIn className="md:col-span-4">
            <article className="relative h-full overflow-hidden rounded-[28px] bg-accent p-8 text-accent-fg sm:p-10">
              <div
                aria-hidden
                className="absolute -right-20 -top-20 size-80 rounded-full border-[48px] border-accent-fg/10"
              />
              <div
                aria-hidden
                className="absolute -bottom-24 right-24 size-56 rounded-full border-[32px] border-accent-fg/[0.06]"
              />
              <ShieldCheck size={30} aria-hidden />
              <h3 className="mt-14 text-3xl font-bold">
                Nothing made up. Ever.
              </h3>
              <p className="mt-3 max-w-[46ch] text-lg opacity-85">
                Every tailored resume is checked against your originals. A new
                skill, title or date blocks the application and tells you why.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-fg/10 px-4 py-2 text-sm font-medium">
                <X size={14} aria-hidden />
                Blocked: &ldquo;Kubernetes&rdquo; is not in your resume
              </div>
            </article>
          </FadeIn>

          <FadeIn className="md:col-span-2" delay={0.08}>
            <Card icon={Eye} title="You approve first" onMove={track}>
              Review mode is on by default. Flip to autopilot when you trust the
              results.
            </Card>
          </FadeIn>
          <FadeIn className="md:col-span-3" delay={0.12}>
            <Card
              icon={Lock}
              title="Keys and sessions stay private"
              onMove={track}
            >
              Your AI key and portal sessions are encrypted per account and
              never shown again after you save them.
            </Card>
          </FadeIn>
          <FadeIn className="md:col-span-3" delay={0.16}>
            <Card icon={PauseCircle} title="Gentle on job sites" onMove={track}>
              Daily caps per portal, human-paced activity, and one switch that
              pauses everything.
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Card({
  icon: Icon,
  title,
  children,
  onMove,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  onMove: ReturnType<typeof useSpotlight>;
}) {
  return (
    <article
      onPointerMove={onMove}
      className="spotlight h-full rounded-[28px] border border-line bg-surface p-8 transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
        <Icon size={22} aria-hidden />
      </span>
      <h3 className="mt-10 text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-[46ch] text-fg-2">{children}</p>
    </article>
  );
}

import { Eye, Lock, PauseCircle, ShieldCheck } from "lucide-react";

export function Safety() {
  return (
    <section id="safety" className="scroll-mt-20 bg-surface-2/60">
      <div className="container-page py-20 lg:py-24">
        <h2 className="max-w-[24ch] text-2xl font-semibold sm:text-3xl">
          Your name goes on every application. We treat it that way.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <article className="card flex flex-col justify-between gap-8 bg-accent p-7 text-accent-fg md:col-span-4">
            <ShieldCheck size={28} aria-hidden />
            <div>
              <h3 className="text-lg font-semibold">Nothing made up</h3>
              <p className="mt-2 max-w-[52ch] opacity-90">
                Tailored resumes are checked against your originals before
                anything is sent. A new skill, title or date blocks the
                application and tells you why.
              </p>
            </div>
          </article>

          <article className="card p-7 md:col-span-2">
            <Eye size={22} className="text-accent" aria-hidden />
            <h3 className="mt-6 text-base font-semibold">You approve first</h3>
            <p className="mt-1 text-fg-2">
              Review mode is on by default. Switch to full autopilot when you
              trust the results.
            </p>
          </article>

          <article className="card p-7 md:col-span-3">
            <Lock size={22} className="text-accent" aria-hidden />
            <h3 className="mt-6 text-base font-semibold">
              Keys and sessions stay private
            </h3>
            <p className="mt-1 max-w-[46ch] text-fg-2">
              Your AI key and portal sessions are encrypted per account and
              never shown again after you save them.
            </p>
          </article>

          <article className="card p-7 md:col-span-3">
            <PauseCircle size={22} className="text-accent" aria-hidden />
            <h3 className="mt-6 text-base font-semibold">
              Gentle on job sites
            </h3>
            <p className="mt-1 max-w-[46ch] text-fg-2">
              Daily caps per portal and human-paced activity. One switch pauses
              everything.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

import { Eye, Lock, PauseCircle, ShieldCheck, X } from "lucide-react";
import { Reveal } from "../../ui/Reveal";

export function Safety() {
  return (
    <section id="safety" className="scroll-mt-20">
      <div className="container-page py-24 lg:py-32">
        <Reveal>
          <h2 className="max-w-[22ch] text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
            Your name goes on every application. We treat it that way.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <article className="relative h-full overflow-hidden rounded-[20px] bg-accent p-8 text-accent-fg">
              <div
                aria-hidden
                className="absolute -right-24 -top-24 size-72 rounded-full border-[40px] border-accent-fg/10"
              />
              <ShieldCheck size={28} aria-hidden />
              <h3 className="mt-10 text-xl font-semibold">Nothing made up</h3>
              <p className="mt-2 max-w-[48ch] opacity-90">
                Tailored resumes are checked against your originals before
                anything is sent. A new skill, title or date blocks the
                application and tells you why.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-fg/10 px-3 py-1.5 text-sm">
                <X size={14} aria-hidden />
                Blocked: &ldquo;Kubernetes&rdquo; is not in your resume
              </div>
            </article>
          </Reveal>

          <Reveal className="md:col-span-2" delay={80}>
            <Card icon={Eye} title="You approve first">
              Review mode is on by default. Switch to full autopilot when you
              trust the results.
            </Card>
          </Reveal>

          <Reveal className="md:col-span-3" delay={120}>
            <Card icon={Lock} title="Keys and sessions stay private">
              Your AI key and portal sessions are encrypted per account and
              never shown again after you save them.
            </Card>
          </Reveal>

          <Reveal className="md:col-span-3" delay={160}>
            <Card icon={PauseCircle} title="Gentle on job sites">
              Daily caps per portal and human-paced activity. One switch pauses
              everything.
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Eye;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="group h-full rounded-[20px] border border-line bg-surface p-8 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong">
      <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
        <Icon size={20} aria-hidden />
      </span>
      <h3 className="mt-8 text-base font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-[46ch] text-fg-2">{children}</p>
    </article>
  );
}

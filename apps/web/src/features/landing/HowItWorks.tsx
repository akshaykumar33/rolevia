import { CalendarClock, FileUp, KeyRound, Mail } from "lucide-react";

const steps = [
  {
    icon: FileUp,
    title: "Tell us who you are",
    body: "Upload your resume, a job description you like, and anything else that helps: portfolio, certificates, cover letters.",
  },
  {
    icon: KeyRound,
    title: "Connect your AI and your portals",
    body: "Add your own AI key and sign in to the job sites you use. Your sessions stay yours and are encrypted.",
  },
  {
    icon: CalendarClock,
    title: "Set the plan",
    body: "Choose how many jobs, which portals, and when. Run it once, every weekday, or every morning.",
  },
  {
    icon: Mail,
    title: "Read the report",
    body: "See every application, the resume version it used, and why anything was skipped.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-y border-line bg-surface"
    >
      <div className="container-page py-20 lg:py-24">
        <p className="text-sm font-medium text-accent">How it works</p>
        <h2 className="mt-2 max-w-[22ch] text-2xl font-semibold sm:text-3xl">
          Set it up once. It keeps working.
        </h2>
        <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {steps.map((s) => (
            <li key={s.title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <s.icon size={18} aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p className="mt-1 max-w-[42ch] text-fg-2">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

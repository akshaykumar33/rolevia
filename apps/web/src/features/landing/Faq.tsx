import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Which job sites does it work with?",
    a: "LinkedIn, Naukri, Indeed, Wellfound, and company career pages built on Greenhouse, Lever, Ashby and Workday. You choose which ones to use.",
  },
  {
    q: "Why do I need my own AI key?",
    a: "You keep control of cost and provider. Tailoring runs on your key, so you only pay for what you use and can switch providers at any time.",
  },
  {
    q: "Can my job site accounts get flagged?",
    a: "Any automation carries some risk. Rolevia uses your own signed-in session, keeps daily limits low, and paces activity like a person. Review mode lowers the risk further.",
  },
  {
    q: "Will it apply to jobs I would not want?",
    a: "Only jobs above your match threshold are considered. Anything below it is skipped and listed in your report with the reason.",
  },
  {
    q: "Can I stop it?",
    a: "Yes. Pause a single campaign or everything at once from the dashboard. Nothing runs until you resume.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="container-page scroll-mt-20 py-20 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold sm:text-3xl">Questions</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-control py-4 font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  size={18}
                  aria-hidden
                  className="shrink-0 text-fg-3 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[62ch] pb-5 text-fg-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

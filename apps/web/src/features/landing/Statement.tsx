import { ScrollFillText } from "../../ui/motion";

// Words prefixed with * render in the accent colour.
const text =
  "Same resume. Two hundred applications. Zero replies. That is not a strategy. Rolevia rewrites your story for *every *single *role, and never makes anything up.";

export function Statement() {
  return (
    <section className="container-page pb-8 pt-32 lg:pb-12 lg:pt-44">
      <ScrollFillText
        text={text}
        className="max-w-[22ch] font-display text-[clamp(2rem,1rem+3.6vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.035em] text-balance"
      />
    </section>
  );
}

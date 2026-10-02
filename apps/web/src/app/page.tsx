import { SiteHeader } from "../features/landing/SiteHeader";
import { Hero } from "../features/landing/Hero";
import { Statement } from "../features/landing/Statement";
import { HowItWorks } from "../features/landing/HowItWorks";
import { Tailoring } from "../features/landing/Tailoring";
import { Safety } from "../features/landing/Safety";
import { Faq } from "../features/landing/Faq";
import { Closing } from "../features/landing/Closing";
import { SmoothScroll } from "../ui/motion";

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-2 focus:shadow-md"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Statement />
        <HowItWorks />
        <Tailoring />
        <Safety />
        <Faq />
      </main>
      <Closing />
    </>
  );
}

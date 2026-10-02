"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Logo } from "../../ui/Logo";
import { ThemeToggle } from "../../ui/ThemeToggle";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#safety", label: "Safety" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <motion.div
        initial={false}
        animate={{
          maxWidth: scrolled ? 880 : 1152,
          backgroundColor: scrolled
            ? "color-mix(in oklab, var(--surface) 78%, transparent)"
            : "color-mix(in oklab, var(--surface) 0%, transparent)",
          borderColor: scrolled
            ? "color-mix(in oklab, var(--border) 100%, transparent)"
            : "color-mix(in oklab, var(--border) 0%, transparent)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="mx-auto flex h-14 items-center justify-between gap-4 rounded-full border px-3 pl-5 backdrop-blur-xl"
      >
        <Logo />
        <nav aria-label="Main" className="hidden items-center md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/app"
            className="btn-primary sheen h-10 rounded-full px-5"
          >
            Get started
          </Link>
        </div>
      </motion.div>
    </header>
  );
}

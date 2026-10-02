"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  LayoutGrid,
  Megaphone,
  Plug,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "../../ui/Logo";
import { ThemeToggle } from "../../ui/ThemeToggle";
import { useWorkspace } from "./store";

const nav: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/app", label: "Overview", icon: LayoutGrid },
  { href: "/app/profile", label: "Profile", icon: UserRound },
  { href: "/app/connections", label: "Connections", icon: Plug },
  { href: "/app/campaign", label: "Campaign", icon: Megaphone },
  { href: "/app/activity", label: "Activity", icon: Activity },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { profile } = useWorkspace();
  const initials =
    profile.fullName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "?";

  const isActive = (href: string) =>
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);

  return (
    <div className="min-h-[100dvh] lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="sticky top-0 hidden h-[100dvh] flex-col border-r border-line bg-surface lg:flex">
        <div className="flex h-16 items-center px-5">
          <Logo href="/app" />
        </div>
        <nav aria-label="App" className="flex-1 space-y-0.5 px-3 py-2">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-9 items-center gap-3 rounded-control px-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-fg-2 hover:bg-surface-2 hover:text-fg"
                }`}
              >
                <item.icon size={17} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 border-t border-line px-4 py-3">
          <span className="grid size-8 place-items-center rounded-full bg-surface-2 text-xs font-semibold text-fg-2">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {profile.fullName || "Your workspace"}
            </p>
            <p className="truncate text-xs text-fg-3">
              {profile.email || "Profile not set up"}
            </p>
          </div>
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-md lg:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <Logo href="/app" />
            <ThemeToggle />
          </div>
          <nav
            aria-label="App"
            className="flex gap-1 overflow-x-auto px-3 pb-2 [scrollbar-width:none]"
          >
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-8 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-medium ${
                    active ? "bg-accent-soft text-accent" : "text-fg-2"
                  }`}
                >
                  <item.icon size={15} aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main
          id="main"
          className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

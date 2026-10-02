import type { Metadata } from "next";
import { AppShell } from "../../features/workspace/AppShell";

export const metadata: Metadata = { title: "Dashboard" };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

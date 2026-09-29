import type { Metadata } from "next";
import "./globals.css";
import { BRAND_CONFIG, getBrandedTitle } from "@rolevia/config";

export const metadata: Metadata = {
  title: getBrandedTitle("System Operating Environment"),
  description: BRAND_CONFIG.missionStatement,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-base text-primary selection:bg-accent/20 selection:text-accent">
        {children}
      </body>
    </html>
  );
}

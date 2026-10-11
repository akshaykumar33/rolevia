import Link from "next/link";
import { BRAND_CONFIG } from "@rolevia/config";

export interface RoleviaMarkProps {
  size?: number;
  className?: string;
  variant?: "contained" | "glyph";
}

/**
 * RoleviaMark — Bespoke non-AI brand identity vector.
 *
 * Symbolism:
 * - Left vertical anchor: Candidate Ground Truth (verified experience, immutable credentials).
 * - Sweeping upper loop & angled kinetic leg: The "Via" (career trajectory, pathfinding vector).
 * - Internal precision aperture: The focal waypoint / destination role.
 *
 * Free of generic AI tropes (no sparkles, stars, glowing nodes, or rotating orbitals).
 */
export function RoleviaMark({
  size = 28,
  className = "",
  variant = "contained",
}: RoleviaMarkProps) {
  if (variant === "glyph") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Ground Truth Anchor Pillar */}
        <rect
          x="5.5"
          y="4"
          width="4.5"
          height="24"
          rx="2.25"
          fill="currentColor"
        />
        {/* The Trajectory Loop & Angular Forward Leg */}
        <path
          d="M9 6C9 4.9 9.9 4 11 4H18C22.4 4 26 7.4 26 11.8C26 15.2 23.5 18.1 20 18.8L25.8 26.6C26.5 27.5 25.8 28.8 24.6 28.8H20.4C19.6 28.8 18.8 28.4 18.3 27.7L13.2 20.2H10V6Z"
          fill="currentColor"
        />
        {/* Focal Waypoint Aperture */}
        <path
          d="M10 7.8H17.5C19.8 7.8 21.6 9.6 21.6 11.8C21.6 14 19.8 15.8 17.5 15.8H10V7.8Z"
          fill="var(--bg, #f2f3ee)"
        />
      </svg>
    );
  }

  // Contained variant (default in headers, cards, and UI shells)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Brand Accent Squircle Container */}
      <rect width="32" height="32" rx="8" fill="var(--accent)" />
      {/* Foundation Pillar (Ground Truth) */}
      <rect
        x="7"
        y="6.5"
        width="4"
        height="19"
        rx="2"
        fill="var(--accent-fg)"
      />
      {/* Trajectory Loop & Forward Vector */}
      <path
        d="M10 8.5C10 7.4 10.9 6.5 12 6.5H17C20.6 6.5 23.5 9.2 23.5 12.5C23.5 15.2 21.4 17.5 18.5 18.2L24.2 24.3C24.8 24.9 24.4 25.5 23.5 25.5H20C19.2 25.5 18.5 25.1 18 24.5L13.2 19.2H11V8.5Z"
        fill="var(--accent-fg)"
      />
      {/* Waypoint Aperture */}
      <path
        d="M11 10.2H16.8C18.6 10.2 20 11.2 20 12.5C20 13.8 18.6 14.8 16.8 14.8H11V10.2Z"
        fill="var(--accent)"
      />
    </svg>
  );
}

export interface LogoProps {
  href?: string;
  size?: number;
  markOnly?: boolean;
  className?: string;
}

export function Logo({
  href = "/",
  size = 28,
  markOnly = false,
  className = "",
}: LogoProps) {
  const content = (
    <>
      <RoleviaMark
        size={size}
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      />
      {!markOnly && (
        <span className="text-base font-semibold tracking-tight transition-colors group-hover:text-accent">
          {BRAND_CONFIG.displayName}
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <span
        className={`inline-flex items-center gap-2.5 rounded-control text-fg group ${className}`}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-control text-fg group ${className}`}
      aria-label={`${BRAND_CONFIG.displayName} home`}
    >
      {content}
    </Link>
  );
}

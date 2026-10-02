import Link from "next/link";
import { BRAND_CONFIG } from "@rolevia/config";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-control text-fg"
      aria-label={`${BRAND_CONFIG.displayName} home`}
    >
      <span
        aria-hidden
        className="grid size-7 place-items-center rounded-[8px] bg-accent text-sm font-semibold text-accent-fg"
      >
        R
      </span>
      <span className="text-base font-semibold tracking-tight">
        {BRAND_CONFIG.displayName}
      </span>
    </Link>
  );
}

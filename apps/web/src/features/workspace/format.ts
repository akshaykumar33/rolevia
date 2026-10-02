import type { Campaign } from "./model";

export function formatTime(hhmm: string): string {
  const [h = 0, m = 0] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function scheduleLabel(c: Campaign): string {
  switch (c.schedule) {
    case "manual":
      return "When you start it";
    case "daily":
      return `Every day at ${formatTime(c.runAt)}`;
    case "weekdays":
      return `Weekdays at ${formatTime(c.runAt)}`;
    case "weekly":
      return `Mondays at ${formatTime(c.runAt)}`;
  }
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

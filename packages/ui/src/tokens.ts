export const DESIGN_TOKENS = {
  colors: {
    dark: {
      bgBase: "#0b0f17",
      bgSurface: "#111827",
      bgSurfaceRaised: "#1f2937",
      textPrimary: "#f9fafb",
      textMuted: "#9ca3af",
      borderSubtle: "#1f2937",
      borderStrong: "#374151",
      accentPrimary: "#38bdf8",
      statusSuccess: "#10b981",
      statusWarning: "#f59e0b",
      statusDanger: "#ef4444",
    },
    light: {
      bgBase: "#ffffff",
      bgSurface: "#f8fafc",
      bgSurfaceRaised: "#f1f5f9",
      textPrimary: "#0f172a",
      textMuted: "#64748b",
      borderSubtle: "#e2e8f0",
      borderStrong: "#cbd5e1",
      accentPrimary: "#0284c7",
      statusSuccess: "#059669",
      statusWarning: "#d97706",
      statusDanger: "#dc2626",
    },
  },
  typography: {
    fontSans:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontMono: 'JetBrains Mono, "Fira Code", monospace',
  },
  spacing: {
    base: "4px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;

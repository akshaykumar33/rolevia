export const DESIGN_TOKENS = {
  colors: {
    dark: {
      bgBase: "#14100c", // Deep Cocoa
      bgSurface: "#1d1813",
      bgSurfaceRaised: "#28211b",
      textPrimary: "#f5eee6", // Warm Cream
      textMuted: "#a69485",
      borderSubtle: "rgba(245, 238, 230, 0.08)",
      borderStrong: "rgba(245, 238, 230, 0.16)",
      accentPrimary: "#f08c42", // Warm Caramel
      accentSecondary: "#c97d52",
      statusSuccess: "#4ade80",
      statusWarning: "#fbbf24",
      statusDanger: "#f87171",
    },
    light: {
      bgBase: "#f9f6f0", // Warm Parchment
      bgSurface: "#ffffff",
      bgSurfaceRaised: "#f2ede4",
      textPrimary: "#2d2218",
      textMuted: "#6e5e52",
      borderSubtle: "rgba(110, 94, 82, 0.12)",
      borderStrong: "rgba(110, 94, 82, 0.22)",
      accentPrimary: "#d46b28",
      accentSecondary: "#8c5b36",
      statusSuccess: "#2e7d4d",
      statusWarning: "#c27814",
      statusDanger: "#c94432",
    },
  },
  typography: {
    fontDisplay: '"Fraunces", "Iowan Old Style", Georgia, serif',
    fontSans:
      'Inter, Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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

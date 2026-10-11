/** @type {import('tailwindcss').Config} */
// Lets opacity modifiers like bg-accent/40 work with CSS-variable colours.
const withAlpha = (v) =>
  `color-mix(in oklab, var(${v}) calc(<alpha-value> * 100%), transparent)`;

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: withAlpha("--bg"),
        surface: withAlpha("--surface"),
        "surface-2": withAlpha("--surface-2"),
        fg: withAlpha("--text"),
        "fg-2": withAlpha("--text-2"),
        "fg-3": withAlpha("--text-3"),
        line: withAlpha("--border"),
        "line-strong": withAlpha("--border-strong"),
        accent: {
          DEFAULT: withAlpha("--accent"),
          hover: withAlpha("--accent-hover"),
          soft: withAlpha("--accent-soft"),
          fg: withAlpha("--accent-fg"),
        },
        success: {
          DEFAULT: withAlpha("--success"),
          soft: withAlpha("--success-soft"),
        },
        warning: {
          DEFAULT: withAlpha("--warning"),
          soft: withAlpha("--warning-soft"),
        },
        danger: {
          DEFAULT: withAlpha("--danger"),
          soft: withAlpha("--danger-soft"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      // Scale at ~1.25: 12 / 14 / 16 / 20 / 25 / 31 / 39 / 49
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.375rem" }],
        base: ["1rem", { lineHeight: "1.625rem" }],
        lg: ["1.25rem", { lineHeight: "1.75rem" }],
        xl: ["1.5625rem", { lineHeight: "2rem" }],
        "2xl": ["1.9375rem", { lineHeight: "2.375rem" }],
        "3xl": ["2.4375rem", { lineHeight: "2.75rem" }],
        "4xl": ["3.0625rem", { lineHeight: "3.375rem" }],
      },
      borderRadius: {
        control: "10px",
        card: "14px",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
};

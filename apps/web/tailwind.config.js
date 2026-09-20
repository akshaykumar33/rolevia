/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        "surface-raised": "var(--bg-surface-raised)",
        primary: "var(--text-primary)",
        muted: "var(--text-muted)",
        "border-subtle": "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
        accent: "var(--accent-primary)",
        success: "var(--status-success)",
        warning: "var(--status-warning)",
        danger: "var(--status-danger)",
      },
    },
  },
  plugins: [],
};

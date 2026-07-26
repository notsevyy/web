import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-out",
      },
      colors: {
        bg: "#0B1220",
        surface: "#121B2E",
        accent: "#FF9900",
        "accent-2": "#00D9C0",
        ink: "#F5F7FA",
        muted: "#8A96A8",
      },
    },
  },
  plugins: [],
};
export default config;

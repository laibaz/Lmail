import type { Config } from "tailwindcss";

// Light theme. Four brand colours (pink, mauve, purple, blue) plus ink and neutrals.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17172B",
        muted: "#5F5C75",
        line: "#E6E2EE",
        soft: "#F6F4FA",
        pink: { DEFAULT: "#DB82AF", tint: "#FBEEF4" },
        mauve: "#A466A6",
        purple: "#7458A0",
        blue: { DEFAULT: "#244697", deep: "#1A3472" },
      },
      backgroundImage: {
        brand: "linear-gradient(120deg, #DB82AF 0%, #7458A0 55%, #244697 100%)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "1280px" },
    },
  },
  plugins: [],
};
export default config;

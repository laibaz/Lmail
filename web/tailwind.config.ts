import type { Config } from "tailwindcss";

// Palette: one dark theme, violet as the brand colour, lime as the single accent.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: "#0B0B1A", 800: "#12122A", 700: "#1B1B3A" },
        violet: { DEFAULT: "#7C5CFF", soft: "#B4A4FF", deep: "#5B3DF0" },
        lime: "#C6FF3D",
        mist: "#F5F3FF",
        haze: "#A8A6C8",
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

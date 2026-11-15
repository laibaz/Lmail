import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: "#0B0B1A", 800: "#12122A", 700: "#1A1A3A", 600: "#26264F" },
        violet: { DEFAULT: "#7C5CFF", soft: "#A995FF", deep: "#5B3DF0" },
        lime: { DEFAULT: "#C6FF3D", deep: "#A6E01F" },
        blush: "#FF6B9A",
        mist: "#F5F3FF",
        haze: "#A8A6C8",
      },
      fontFamily: {
        sans: ["'Inter Variable'", "Inter", "system-ui", "sans-serif"],
        display: ["'Space Grotesk Variable'", "'Inter Variable'", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        drift: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(40px,-30px) scale(1.08)" },
          "66%": { transform: "translate(-30px,25px) scale(0.95)" },
        },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        shine: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        blink: "blink 1s step-end infinite",
        shine: "shine 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;

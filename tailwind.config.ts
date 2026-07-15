import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SHRINGAR brand palette — exact values from the approved design
        brown: {
          DEFAULT: "#5B4638",
          dark: "#4A3528",
          darker: "#3A2C22",
          soft: "#7A5A48",
        },
        copper: {
          DEFAULT: "#C98F73",
          light: "#D8B08C",
          dark: "#B0735A",
          deep: "#8B5E3C",
        },
        cream: "#FAF7F2",
        warm: "#F3ECE4",
        gold: "#E8CBA0",
        sand: "#E3C6A8",
        muted: "#8A6A58",
        mid: "#A88A78",
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', '"Playfair Display"', "serif"],
        manrope: ['var(--font-manrope)', "Manrope", "sans-serif"],
      },
      maxWidth: {
        shell: "1320px",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "none" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floaty2: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(11px)" },
        },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20px,-18px) scale(1.06)" },
          "66%": { transform: "translate(-14px,12px) scale(.96)" },
        },
        pulse: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        rise: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "12%": { opacity: ".9" },
          "100%": { transform: "translateY(-150px) scale(.4)", opacity: "0" },
        },
        petalfall: {
          "0%": { transform: "translateY(-10%) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: ".95" },
          "100%": { transform: "translateY(560px) translateX(40px) rotate(420deg)", opacity: "0" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "60%,100%": { transform: "translateX(260%) skewX(-18deg)" },
        },
        auraspin: {
          to: { transform: "rotate(360deg)" },
        },
        huedrift: {
          "0%,100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(18deg)" },
        },
        slideInRight: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp .8s cubic-bezier(.22,.61,.36,1) both",
        fadeIn: "fadeIn 1s ease both",
        floaty: "floaty 6s ease-in-out infinite",
        floaty2: "floaty2 7s ease-in-out infinite",
        blob: "blob 18s ease-in-out infinite",
        pulse: "pulse 1.8s infinite",
        shimmer: "shimmer 16s linear infinite",
        rise: "rise 6s ease-in infinite",
        petalfall: "petalfall 9s linear infinite",
        sheen: "sheen 6s ease-in-out 1.5s infinite",
        auraspin: "auraspin 30s linear infinite",
        huedrift: "huedrift 12s ease-in-out infinite",
        slideInRight: "slideInRight .35s cubic-bezier(.22,.61,.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;

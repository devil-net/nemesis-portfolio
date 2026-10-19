/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0E0E10",
        surface: "#16161A",
        "surface-muted": "#1C1C22",
        "surface-card": "#18181D",
        "tactical-orange": "#FF5500",
        "glow-orange": "#FF8800",
        "amber-glow": "#FFAA33",
        "keycap-white": "#F4F4F6",
        "text-primary": "#EDEDEF",
        "text-secondary": "#8E8E98",
        "grid-dot": "#26262B",
        "crimson-ember": "#FF2200",
        "dark-crimson": "#990000",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-sans)", "Space Grotesk", "sans-serif"],
        dossier: ["var(--font-dossier)", "Courier Prime", "monospace"],
      },
      boxShadow: {
        "orange-glow": "0 0 25px rgba(255, 85, 0, 0.4)",
        "orange-glow-sm": "0 0 12px rgba(255, 85, 0, 0.3)",
        "orange-glow-lg": "0 0 45px rgba(255, 85, 0, 0.5)",
        "ember-glow": "0 0 25px rgba(255, 34, 0, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanline": "scanline 8s linear infinite",
        "blink": "blink 1s step-start infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

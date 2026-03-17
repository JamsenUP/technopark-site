import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // акцентный синий
          dark: "#1D4ED8",
          light: "#60A5FA",
        },
        accent: "#22C55E",
        muted: "#6B7280",
        background: "#020617",
        surface: "#020617",
        border: "#1F2933",
      },
      boxShadow: {
        soft: "0 20px 40px rgba(15, 23, 42, 0.45)",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;


import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#669DF6",
        surface: {
          DEFAULT: "rgba(0,0,0,0.85)",
          light: "#222",
        },
      },
    },
  },
  plugins: [],
};

export default config;

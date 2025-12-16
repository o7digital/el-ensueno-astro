/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#f5f0e9",
        ink: "#0f1411",
        dusk: "#24332a",
        clay: "#c58a65",
        mist: "#dfe8e3",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"Sora"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        subtle: "0.04em",
      },
      boxShadow: {
        soft: "0 18px 48px -26px rgba(15, 20, 17, 0.35)",
      },
    },
  },
  plugins: [],
};

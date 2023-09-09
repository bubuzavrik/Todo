/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "425px",
      tablet: "768px",
      laptop: "1024px",
    },
    extend: {
      colors: {
        secondary: "#C3C3CC",
        overlay: "#1C1F37C9",
        primary: "#1C1F37",
        background: "#F8F9FF",
      },
    },
  },
  plugins: [],
};

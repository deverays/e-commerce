/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "kaisen-100": "#1e1e1e",
        "kaisen-200": "#111111",
        "kaisen-600": "#e7192d",
      },
      boxShadow: {
        "3xl": "0px 7px 29px 0px",
      },
      fontFamily: {
        kaisen: ["Kaisen", "sans-serif"],
        "gang-of-three": ["Gang-of-three", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        "poppins-small": ["Poppins-Small", "sans-serif"],
      },
      fontWeight: {
        bold: "600",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "641px",
        md: "769px",
        lg: "1025px",
        xl: "1281px",
        "2xl": "1537px",
      },
      colors: {
        primary: "#024E82",
      },
      fontFamily: {
        inter: ["Inter Variable", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      backgroundImage: {
        hero: "url('/images/hero.jpg')",
        checkbox: "url('/icons/check.svg')",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

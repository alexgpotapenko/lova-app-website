// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-key-600", "hover:bg-key-700", "text-white"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        key: {
          50: "#e6f8fd",
          100: "#cdeffb",
          200: "#9bdff6",
          300: "#6ad0f2",
          400: "#38c0ed",
          500: "#009acb",
          600: "#007ca3",
          700: "#005d7b",
          800: "#003f52",
          900: "#00212a",
          950: "#001418",
        },
        accent: {
          50: "#f1f8ec",
          100: "#dff1d4",
          200: "#bde3a8",
          300: "#9cd67d",
          400: "#7ac851",
          500: "#58a333",
          600: "#457f28",
          700: "#325b1d",
          800: "#203712",
          900: "#0f1408",
          950: "#0a0e05",
        },
      },
    },
  },
  plugins: [heroui()],
};
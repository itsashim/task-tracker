/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0c0d04",
        secondary: "#180f04",
        accent: "#221b08",
        background: "#090b04",
        highlight: "#2b1f09",
      },
    },
  },
  plugins: [],
};

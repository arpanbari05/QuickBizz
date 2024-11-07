/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DB4444",
        secondaryDark: "#000929",
        secondaryLight: "#2E3B5B",
      },
    },
  },
  plugins: [],
};

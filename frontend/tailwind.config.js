/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary2: "#374151",
        secondary: "#4b5563",
        secondary3: "#6b7280",
        testColor1: "#d1d5db",
      },
    },
  },
  plugins: [],
};

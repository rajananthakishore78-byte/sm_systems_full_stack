/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#0A0F0D",
          900: "#0E1613",
          800: "#141F1B",
          700: "#1C2925",
          600: "#293B35",
        },
   signal: {
     DEFAULT: "#E8963C",
     dim: "#A8651E",
     light: "#F5C27A",
   },
   alert: {
     DEFAULT: "#F2542D",
     dim: "#B33C1F",
   },
        paper: "#F4F6F4",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

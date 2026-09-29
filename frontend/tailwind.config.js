/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#FFFFFF",
          900: "#FFF7ED",
          800: "#F5F5F5",
          700: "#E5E5E5",
          600: "#A3A3A3",
        },
   signal: {
     DEFAULT: "#FF6B00",
     dim: "#C24E00",
     light: "#FF8E3D",
   },
   alert: {
     DEFAULT: "#FF6B00",
     dim: "#C24E00",
   },
        paper: "#1C1917",
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

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        skyBlue: "#4FA8DA",
        deepBlue: "#1B3F73",
        royalBlue: "#2E6DB4",
        paleBlue: "#EAF4FB",
        cream: "#F4FAFF",
        creamDark: "#E4F1FB",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        script: ["'Cormorant Garamond'", "serif"],
        sans: ["'Montserrat'", "sans-serif"],
        arabic: ["'Amiri'", "serif"],
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0) scale(0.6)", opacity: "0.9" },
          "100%": { transform: "translateY(-60px) scale(1.3)", opacity: "0" },
        },
      },
      animation: {
        wave1: "wave 0.9s ease-in-out infinite",
        wave2: "wave 0.9s ease-in-out infinite 0.15s",
        wave3: "wave 0.9s ease-in-out infinite 0.3s",
        floatUp: "floatUp 0.9s ease-out forwards",
      },
    },
  },
  plugins: [],
};
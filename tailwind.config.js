/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Lexend Deca", "sans-serif"],
      mono: ["IBM Plex Mono", "monospace"],
      retro: ["Orbitron", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#1DA1F2",
        secondary: "#14171A",
        accent: "#657786",
        background: "#E1E8ED",
        border: "#AAB8C2",
        text: "#292F33",
        pink: "#8b017a",
        "dark-pink": "#450064",
      },
    },
  },
  plugins: [],
};

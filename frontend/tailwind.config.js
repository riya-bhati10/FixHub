/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        fixhub: {
          primary: "#1F7F85",
          dark: "#0F4C5C",
          light: "#6FC2C6",
          mint: "#AEE3E6",
          bgDark: "#0E3F44",
          bgDarkAlt: "#0B3A40",
          bgCard: "#DCEBEC",
          bgWhite: "#F7FBFC",
          textDark: "#1A2E35",
          textMuted: "#5F7D83",
          textWhite: "#FFFFFF",
          borderSoft: "#B7DADB",
        },
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      animation: {
        "fixhub-scroll": "fixhub-scroll 30s linear infinite",
      },
      keyframes: {
        "fixhub-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },

  plugins: [],
};

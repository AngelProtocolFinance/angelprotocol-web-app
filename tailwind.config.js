/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      inherit: colors.inherit,

      blue: {
        d7: "#0B1A2A",
        d6: "#112840",
        d5: "#1a3f60",
        d4: "#194b73",
        d3: "#1a578a",
        d2: "#1e6dab",
        d1: "#2D89C8", //blue-400
        DEFAULT: "#54a5dc",
        l1: "#8fc4ea",
        l2: "#c4def3",
        l3: "#B8D9EF",
        l4: "#E6F1F9", //blue-100, #EAF3FA
        l5: "#F7FAFD", //blue-50
      },

      green: {
        d4: "#092a17",
        d3: "#1d5e35",
        d2: "#1f763e",
        d1: "#23964c",
        DEFAULT: "#31b861", //green-500
        l1: "#57d182",
        l2: "#8fe6ae",
        l3: "#c0f2d1",
        l4: "#dff9e8",
        l5: "#f1fcf4",
      },

      navy: {
        d4: "#183244", //navy-blue-1000
        d3: "#1f3648",
        d2: "#273f52",
        d1: "#314c5d",
        DEFAULT: "#3c5667",
        l1: "#496273", //navy-blue-400, #1D3C51/80
        l2: "#5b6f7f",
        l3: "#72828D", //navy-blue-200
        l4: "#9dabb5",
        l5: "#d4dee6",
      },

      red: {
        d4: "#9d1717",
        d3: "#c81818", //red-100, #C52828
        d2: "#e22020",
        d1: "#e22020",
        DEFAULT: "#f53e3e",
        l1: "#fc6d6d",
        l2: "#ffa2a2",
        l3: "#ffc8c8",
        l4: "#ffe1e1",
        l5: "#fef2f2",
      },

      black: "#000101",
      gray: {
        d3: "#363636",
        d2: "#545454",
        d1: "#676767",
        DEFAULT: "#999999",
        l1: "#ADADAD",
        l2: "#C8C8C8",
        l3: "#D7D7D7", //white-600
        l4: "#E7E7E7", //white-500
        l5: "#F9FBFA", //white-200
        l6: "#FFFFFF",
      },
      white: "#FFFFFF",

      //standard sdg colors
      sdg1: "#e5233d",
      sdg2: "#dda73a",
      sdg3: "#4ca146",
      sdg4: "#c5192d",
      sdg5: "#ef402c",
      sdg6: "#27bfe6",
      sdg7: "#fbc412",
      sdg8: "#a31c44",
      sdg9: "#f26a2d",
      sdg10: "#e01483",
      sdg11: "#f89d2a",
      sdg12: "#bf8d2c",
      sdg13: "#407f46",
      sdg14: "#1f97d4",
      sdg15: "#59ba48",
      sdg16: "#126a9f",
      sdg17: "#13496b",
    },

    extend: {
      fontSize: {
        "2xs": "0.625rem",
        "3xs": ["0.56rem", "0.7rem"],
        "4.5xl": "2.625rem",
      },
      fontFamily: {
        heading: ["Quicksand", "serif"],
        body: ["DM Sans", "sans-serif"],
        gochi: ["Gochi Hand", "serif"],
      },
      width: {
        "3/4": "75%",
      },
      keyframes: {
        "translate-rtl": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      borderRadius: {
        /** 32px */
        "4xl": "2rem",
        /** 56px */
        "5xl": "3.5rem",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};

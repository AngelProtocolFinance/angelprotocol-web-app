/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      inherit: colors.inherit,
      gold: "#D7B37F",
      green: {
        l4: "#eaf6ec",
        l3: "#d5eed9",
        l2: "#c0e5c6",
        l1: "#abddb3",
        DEFAULT: "#97d5a1",
        d1: "#63bf72",
        d2: "#3f9a4e",
        d3: "#2a6734",
        d4: "#15331a"
      },
      blue: {
        l4: "#d5e2f0",
        l3: "#aac5e1",
        l2: "#80a8d2",
        l1: "#568bc4",
        DEFAULT: "#3a6ea5",
        d1: "#2f5885",
        d2: "#234264",
        d3: "#172c42",
        d4: "#0c1621",
      },
      red: {
        l4: "#ffdbc2",
        l3: "#ffb885",
        l1: "#ff700a",
        l2: "#ff9447",
        DEFAULT: "#cc5500",
        d1: "#a34400",
        d2: "#7a3300",
        d3: "#522200",
        d4: "#291100"
      },
      gray: {
        l4: '#d2dbe0',
        l3: '#a5b6c2',
        l2: '#7892a3',
        l1: '#546c7c',
        DEFAULT: '#36454f',
        d1: '#2b373f',
        d2: '#20292f',
        d3: '#151c20',
        d4: '#0b0e10'
      },
      black: "#141414",
      white: "#F5F5F5",
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
        heading: ["Montserrat", "serif"],
        body: ["Open Sans", "sans-serif"],
        work: "Work Sans",
      },
      width: {
        "3/4": "75%",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};

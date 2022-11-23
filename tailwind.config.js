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

      orange: {
        d4: "#3D2600",
        d3: "#6A4100",
        d2: "#995E00",
        d1: "#C77B00",
        DEFAULT: "#F59700",
        l1: "#F9A320",
        l2: "#FFC86F",
        l3: "#FFD798",
        l4: "#FFEFD5",
        l5: "#F9F4EC",
        l6: "#FCFAF7",
      },
      blue: {
        d7: "#0D283A",
        d6: "#0F2E43",
        d5: "#143F5C",
        d4: "#12364F",
        d3: "#1E5B86",
        d2: "#226A9A",
        d1: "#2D89C8",
        DEFAULT: "#54A3D9",
        l1: "#76B2DC",
        l2: "#97C7E8",
        l3: "#B8D9EF",
        l4: "#E2EFF9",
        l5: "#EAF4FA",
      },

      green: {
        d4: "#064e3b",
        d3: "#065f46",
        d2: "#047857",
        d1: "#059669",
        DEFAULT: "#10b981",
        l1: "#34d399",
        l2: "#6ee7b7",
        l3: "#a7f3d0",
        l4: "#d1fae5",
        l5: "#ecfdf5",
      },

      bluegray: {
        d1: "#283E4D",
        DEFAULT: "#3D5F76",
      },

      red: {
        d4: "#2F0F03",
        d3: "#632006",
        d2: "#98310A",
        d1: "#CD420D",
        DEFAULT: "#F15A21",
        l1: "#F37747",
        l2: "#F6936E",
        l3: "#F8B094",
        l4: "#FBCCBB",
        l5: "#FCDACE",
      },

      black: "#000101",
      gray: {
        d3: "#272420",
        d2: "#44413C",
        d1: "#6C6760",
        DEFAULT: "#A2A3A3",
        l1: "#C4C0BB",
        l2: "#D6D6D6",
        l3: "#ECEDED",
        l4: "#F3F3F2",
        l5: "#FDFDFC",
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
        heading: ["Montserrat", "serif"],
        body: ["Open Sans", "sans-serif"],
        work: "Work Sans",
      },
      width: {
        "3/4": "75%",
      },
    },
  },
};

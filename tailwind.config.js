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
        d5: "#12364F",
        d4: "#143F5C",
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
        d4: "#1F4521",
        d3: "#306C33",
        d2: "#419345",
        d1: "#57B55C",
        DEFAULT: "#7EC682",
        l1: "#9AD39D",
        l2: "#B7DFB9",
        l3: "#D3ECD4",
        l4: "#EFF8F0",
        l5: "#FDFEFD",
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
        l1: "#B2AFA9",
        l2: "#C4C0BB",
        l3: "#D6D6D6",
        l4: "#ECEDED",
        l5: "#F3F3F2",
        l6: "#FDFDFC",
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
  plugins: [
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/line-clamp"),
  ],
};

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

      orange: {
        d4: "#7c330b",
        d3: "#983d08",
        d2: "#bb5002",
        d1: "#e27500",
        DEFAULT: "#F59700",
        l1: "#ffc01b",
        l2: "#ffd546",
        l3: "#ffe885",
        l4: "#fff3c5",
        l5: "#fffcea",
        l6: "#ffffff",
      },

      blue: {
        d7: "#0B1A2A",
        d6: "#112840",
        d5: "#1a3f60",
        d4: "#194b73",
        d3: "#1a578a",
        d2: "#1e6dab",
        d1: "#2D89C8",
        DEFAULT: "#54a5dc",
        l1: "#8fc4ea",
        l2: "#c4def3",
        l3: "#B8D9EF",
        l4: "#E6F1F9",
        l5: "#F7FAFD",
      },

      green: {
        d4: "#092a17",
        d3: "#1d5e35",
        d2: "#1f763e",
        d1: "#23964c",
        DEFAULT: "#31b861",
        l1: "#57d182",
        l2: "#8fe6ae",
        l3: "#c0f2d1",
        l4: "#dff9e8",
        l5: "#f1fcf4",
      },

      bluegray: {
        d2: "#243845",
        d1: "#283E4D",
        DEFAULT: "#3D5F76",
      },

      red: {
        d4: "#9d1717",
        d3: "#c81818",
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
        l3: "#D7D7D7",
        l4: "#E7E7E7",
        l5: "#F9FBFA",
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
      boxShadow: (theme) => ({
        focus: `0 0 5px ${theme("colors.red.DEFAULT")}`,
      }),
      fontSize: {
        "2xs": "0.625rem",
        "3xs": ["0.56rem", "0.7rem"],
        "4.5xl": "2.625rem",
      },
      fontFamily: {
        heading: ["Quicksand", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      width: {
        "3/4": "75%",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};

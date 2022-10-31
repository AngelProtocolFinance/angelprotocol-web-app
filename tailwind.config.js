const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "bright-green": "#6ED482",
        "angel-orange": "#FAAC2E",
        "angel-blue": "#3FA9F5",
        "thin-blue": "#54A3D9",
        "blue-accent": "#3385BD",
        "blue-dark": "#1a4f72",
        "angel-grey": "#4F5F6F",
        "grey-accent": "#ADB7BE",
        "white-grey": "#FAFAFA",
        "light-grey": "#EFEFEF",
        "thin-grey": "#ECEDEE",
        "black-blue": "#252626",
        "leaf-green": "#88B752",
        orange: "#F59700",
        "yellow-blue": "#22CCDD",
        "dark-red": "#8A3F30",
        "failed-red": "#FE4454",
        "light-blue": "#1b9cef",
        "bright-blue": "#64c1fc",

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

      borderColor: {
        "angel-orange": "#FAAC2E",
        "angel-blue": "#3FA9F5",
        "thin-blue": "#54A3D9",
        "light-grey": "#f5f5f5",
      },

      fontSize: {
        "2xs": ["0.56rem", "0.7rem"],
        "4.5xl": "2.625rem",
      },
      fontFamily: {
        heading: ["Montserrat", "serif"],
        body: ["Open Sans", "sans-serif"],
      },
      width: {
        "3/4": "75%",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".btn-primary": {
          backgroundColor: theme("colors.angel-orange"),
        },
        ".btn-outline-primary": {
          borderStyle: "solid",
          borderColor: theme("colors.angel-orange"),
          borderWidth: "2px",
          "&:hover": {
            backgroundColor: `${theme("colors.angel-orange")}33`,
          },
          "&:active": {
            backgroundColor: `${theme("colors.angel-orange")}b2`,
          },
          "&:disabled": {
            borderStyle: "none",
          },
        },
        ".btn-secondary": {
          backgroundColor: theme("colors.thin-blue"),
        },
        ".btn-outline-secondary": {
          borderStyle: "solid",
          borderColor: theme("colors.thin-blue"),
          borderWidth: "2px",
          "&:hover": {
            backgroundColor: `${theme("colors.thin-blue")}33`,
          },
          "&:active": {
            backgroundColor: `${theme("colors.thin-blue")}b2`,
          },
          "&:disabled": {
            borderStyle: "none",
          },
        },
      });
    }),
  ],
};

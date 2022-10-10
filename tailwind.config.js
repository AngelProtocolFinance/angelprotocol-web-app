const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        //orange
        "orange-d4": "#3C2500",
        "orange-d3": "#6A4100",
        "orange-d2": "#985E00",
        "orange-d1": "#C67A00",
        orange: "#F49600",
        "orange-l1": "#FFA81E",
        "orange-l2": "#FFC86F",
        "orange-l3": "#FFD798",
        "orange-l4": "#FFEFD5",
        "orange-l5": "#FFFAF1",

        //blue
        "blue-d5": "#0F2F42",
        "blue-d4": "#12374E",
        "blue-d3": "#1A4767",
        "blue-d2": "#31698E",
        "blue-d1": "#3185C0",
        blue: "#55A0D4",
        "blue-l1": "#76B2DC",
        "blue-l2": "#96C4E4",
        "blue-l3": "#B7D7ED",
        "blue-l4": "#D7E9F5",
        "blue-l5": "#E8F2F9",

        /**green, based on tailwind emerald shades */
        "green-d4": "#064e3b",
        "green-d3": "#065f46",
        "green-d2": "#047857",
        "green-d1": "#059669",
        green: "#10b981",
        "green-l1": "#34d399",
        "green-l2": "#6ee7b7",
        "green-l3": "#a7f3d0",
        "green-l4": "#d1fae5",
        "green-l5": "#ecfdf5",

        /**red, based on tailwind rose shades */
        "red-d4": "#881337",
        "red-d3": "#9f1239",
        "red-d2": "#be123c",
        "red-d1": "#e11d48",
        red: "#f43f5e",
        "red-l1": "#fb7185",
        "red-l2": "#fda4af",
        "red-l3": "#fecdd3",
        "red-l4": "#ffe4e6",
        "red-l5": "#fff1f2",

        black: "#000101",
        "gray-d3": "#272420",
        "gray-d2": "#45413A",
        "gray-d1": "#6C6661",
        gray: "#ADA89E",
        "gray-l1": "#C4C1BA",
        "gray-l2": "#E5E3E0",
        "gray-l3": "#F8F6F6",
        white: "#FDFCFC",

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
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".btn-primary": {
          backgroundColor: theme("colors.orange"),
        },
        ".btn-outline-primary": {
          borderStyle: "solid",
          borderColor: theme("colors.orange"),
          borderWidth: "2px",
          "&:hover": {
            backgroundColor: `${theme("colors.orange")}33`,
          },
          "&:active": {
            backgroundColor: `${theme("colors.orange")}b2`,
          },
          "&:disabled": {
            borderStyle: "none",
          },
        },
        ".btn-secondary": {
          backgroundColor: theme("colors.blue"),
        },
        ".btn-outline-secondary": {
          borderStyle: "solid",
          borderColor: theme("colors.blue"),
          borderWidth: "2px",
          "&:hover": {
            backgroundColor: `${theme("colors.blue")}33`,
          },
          "&:active": {
            backgroundColor: `${theme("colors.blue")}b2`,
          },
          "&:disabled": {
            borderStyle: "none",
          },
        },
      });
    }),
  ],
};

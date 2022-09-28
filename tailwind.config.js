const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        //orange
        orange: "#f59e0b",
        "orange-l1": "#fbbf24",
        "orange-l2": "#fcd34d",
        "orange-l3": "#fde68a",
        "orange-l4": "#fef3c7",
        "orange-l5": "#fffbeb",
        "orange-d1": "#d97706",
        "orange-d2": "#b45309",
        "orange-d3": "#92400e",
        "orange-d4": "#78350f",

        //blue
        blue: "#0ea5e9",
        "blue-l1": "#38bdf8",
        "blue-l2": "#7dd3fc",
        "blue-l3": "#bae6fd",
        "blue-l4": "#e0f2fe",
        "blue-l5": "#f0f9ff",
        "blue-d1": "#0284c7",
        "blue-d2": "#0369a1",
        "blue-d3": "#075985",
        "blue-d4": "#0c4a6e",

        /**green, based on tailwind emerald shades */
        green: "#10b981",
        "green-l1": "#34d399",
        "green-l2": "#6ee7b7",
        "green-l3": "#a7f3d0",
        "green-l4": "#d1fae5",
        "green-l5": "#ecfdf5",
        "green-d1": "#059669",
        "green-d2": "#047857",
        "green-d3": "#065f46",
        "green-d4": "#064e3b",

        /**red, based on tailwind rose shades */
        red: "#f43f5e",
        "red-l1": "#fb7185",
        "red-l2": "#fda4af",
        "red-l3": "#fecdd3",
        "red-l4": "#ffe4e6",
        "red-l5": "#fff1f2",
        "red-d1": "#e11d48",
        "red-d2": "#be123c",
        "red-d3": "#9f1239",
        "red-d4": "#881337",

        /** grayscale base on tailwind slate shades */
        white: "#f8fafc",
        black: "#0f172a",
        gray: "#94a3b8",
        "gray-l1": "#cbd5e1",
        "gray-l2": "#e2e8f0",
        "gray-l3": "#f1f5f9",
        "gray-d1": "#64748b",
        "gray-d2": "#475569",
        "gray-d3": "#1e293b",

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

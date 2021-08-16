module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      colors: {
        "white-grey-color": "#FAFAFA",
        "header-color": "#54A3D9",
        "footer-color": "#252626",
        "leaf-green-color": "#88B752",
        "orange-color": "#F59700",
        "thin-blue-color": "#54A4DA",
        "yellow-blue-color": "#22CCDD",
        "dark-red-color": "#8A3F30",
        "failed-red-color": "#EE4444",
      },
      height: {
        "fixed-content-height": "calc(100vh - 9.25rem);",
        "donate-content-height": "calc(100% - 7.5rem)",
      },
    },
    fontFamily: {
      serif:
        'montserrat, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    },
    fontSize: {
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "2xs": ["0.56rem", "0.7rem"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

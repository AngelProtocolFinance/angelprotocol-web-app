module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      gridTemplateRows: {
        dashboard: "auto 1fr auto",
      },
      gridTemplateColumns: {
        charity: "auto 1fr",
      },
      cursor: {
        grab: "grab",
        grabbing: "grabbing",
      },
      colors: {
        "white-grey": "#FAFAFA",
        "grey-light": "#f5f5f5",
        "thin-blue": "#54A3D9",
        "black-blue": "#252626",
        "leaf-green": "#88B752",
        orange: "#F59700",
        "yellow-blue": "#22CCDD",
        "dark-red": "#8A3F30",
        "failed-red": "#EE4444",
      },
      height: {
        "fixed-content-height": "calc(100vh - 9.25rem);",
        "donate-content-height": "calc(100% - 7.5rem)",
      },
      fontSize: {
        "2xs": ["0.56rem", "0.7rem"],
      },
    },
    fontFamily: {
      serif:
        'montserrat, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

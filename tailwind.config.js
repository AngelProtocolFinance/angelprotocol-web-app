module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      backgroundImage: {
        banner:
          "linear-gradient(rgba(63, 169, 245, 0.7),rgba(63, 169, 245, 0.7)), url('./assets/images/home-banner.jpg')",
      },

      cursor: {
        grab: "grab",
        grabbing: "grabbing",
      },
      colors: {
        "angel-blue": "#3FA9F5",
        "thin-blue": "#54A3D9",
        "blue-accent": "#3385bD",
        "angel-grey": "#4F5F6F",
        "grey-accent": "#ADB7BE",
        "white-grey": "#FAFAFA",
        "light-grey": "#f5f5f5",
        "thin-grey": "#ECEDEE",
        "black-blue": "#252626",
        "leaf-green": "#88B752",
        orange: "#F59700",
        "yellow-blue": "#22CCDD",
        "dark-red": "#8A3F30",
        "failed-red": "#EE4444",
      },

      fontSize: {
        "2xs": ["0.56rem", "0.7rem"],
        "4.5xl": "2.625rem",
      },
      fontFamily: {
        heading: ["Montserrat", "serif"],
        body: ["Open Sans", "sans-serif"],
      },
      height: {
        "fixed-content-height": "calc(100vh - 9.25rem);",
        "donate-content-height": "calc(100% - 7.5rem)",
        info: "28rem",
        banner: "52rem",
        specs: "52rem",
      },
      gridTemplateRows: {
        dashboard: "auto 1fr auto",
        app: "1fr auto",
        specs: "auto 1fr",
      },
      gridTemplateColumns: {
        charity: "auto 1fr",
        banner: "1fr auto",
        highlight: "auto 1fr",
      },
      maxWidth: {
        "4/5": "80%",
      },
      minHeight: {
        modal: "300px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

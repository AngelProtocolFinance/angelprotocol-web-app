module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      colors: {
        "angel-protocol-dark-blue": "#262729",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "serif"],
    },
    fontSize: {
      "2xs": ["9px", "11px"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

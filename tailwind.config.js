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
      sans: 'montserrat, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    fontSize: {
      "2xs": ["0.56rem", "0.7rem"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

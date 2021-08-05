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
      serif:
        'montserrat, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
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

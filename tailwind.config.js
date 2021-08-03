module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'montserrat': ['Montserrat', 'serif']
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'footer': '#262729',
     })
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

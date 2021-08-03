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
    }),
    fontSize: {
      small: ['9px', '11px'],
      mid: ['16px', '19px']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

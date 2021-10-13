module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss")("./tailwind.config.js"),
        require("autoprefixer"),
      ],
    },
  },
  babel: {
    //to allow use of logical assignments
    plugins: ["@babel/plugin-proposal-logical-assignment-operators"],
  },
};

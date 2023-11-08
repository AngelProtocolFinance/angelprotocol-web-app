module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint --max-warnings=0",
    "yarn vitest --bail=0 --watch=false --passWithNoTests",
    () => "tsc-files --noEmit",
  ],
  "*.{js,jsx,ts,tsx,json,css,js}": ["prettier --write"],
};

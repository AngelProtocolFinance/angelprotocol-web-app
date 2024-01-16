module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint --max-warnings=0",
    "react-app-rewired test --bail --watchAll=false --findRelatedTests --passWithNoTests",
    () => "tsc-files --noEmit",
  ],
  "*.{js,jsx,ts,tsx}": ["prettier --write"],
};

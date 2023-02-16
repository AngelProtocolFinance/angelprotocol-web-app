const nxPreset = require("@nrwl/jest/preset").default;

module.exports = {
  ...nxPreset,
  transform: {
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nrwl/react/plugins/jest",
    "^.+\\.[tj]sx?$": [
      "@swc/jest",
      { jsc: { transform: { react: { runtime: "automatic" } } } },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "./jest/__mocks__/file.js",
    "\\.(css|less)$": "./jest/__mocks__/style.js",
  },
  setupFilesAfterEnv: ["./jest/setupTests.ts"],
};

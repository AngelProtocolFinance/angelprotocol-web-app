import type { Config } from "jest";

const nxPreset = require("@nrwl/jest/preset").default;

/* eslint-disable */
const config: Config = {
  ...nxPreset,
  displayName: "angel-protocol",
  transform: {
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nrwl/react/plugins/jest",
    "^.+\\.[tj]sx?$": [
      "@swc/jest",
      { jsc: { transform: { react: { runtime: "automatic" } } } },
    ],
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/file.js",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/style.js",
  },
};

export default config;

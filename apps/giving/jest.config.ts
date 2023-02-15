import type { Config } from "jest";

/* eslint-disable */
const config: Config = {
  displayName: "giving",
  preset: "../../jest.preset.js",
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
      "<rootDir>/__mocks__/file.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/style.js",
  },
  coverageDirectory: "../../coverage/apps/giving",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};

export default config;

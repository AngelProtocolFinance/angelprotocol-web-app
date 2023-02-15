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
  coverageDirectory: "../../coverage/apps/giving",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};

export default config;

import type { Config } from "jest";

/* eslint-disable */
const config: Config = {
  displayName: "ast",
  preset: "../../configs/jest/jest.preset.js",
  setupFilesAfterEnv: ["../../configs/jest/setupTests.ts"],
  coverageDirectory: "../../coverage/apps/ast",
};

export default config;

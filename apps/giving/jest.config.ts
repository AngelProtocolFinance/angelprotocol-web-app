import type { Config } from "jest";

/* eslint-disable */
const config: Config = {
  displayName: "giving",
  preset: "../../configs/jest/jest.preset.js",
  setupFilesAfterEnv: ["../../configs/jest/setupTests.ts"],
  coverageDirectory: "../../coverage/apps/giving",
};

export default config;

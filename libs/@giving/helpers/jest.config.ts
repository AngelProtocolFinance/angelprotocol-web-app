/* eslint-disable */
import { readFileSync } from "fs";

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(
  readFileSync(`${__dirname}/.lib.swcrc`, "utf-8")
);
export default {
  displayName: "giving-helpers",
  preset: "../../../configs/jest/jest.preset.js",
  setupFilesAfterEnv: ["../../../configs/jest/setupTests.ts"],
  transform: {
    "^.+\\.[tj]s$": ["@swc/jest", swcJestConfig],
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../../coverage/libs/@giving/helpers",
};

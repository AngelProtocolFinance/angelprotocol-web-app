import type Dec from "decimal.js";
import { describe, expect, test } from "vitest";
import { prettyUsd } from "./pretty-usd";

describe("values less than $1000", () => {
  const cases: [Dec.Value, string][] = [
    ["0", "0"],
    ["0.1", "0"],
    ["1.99", "2"],
    ["999.49", "999"],
  ];

  for (const [input, expected] of cases) {
    test(`${input} -> ${expected}`, () => {
      expect(prettyUsd(input)).toBe(expected);
    });
  }
});

describe("values greater than $1000", () => {
  const cases: [Dec.Value, string][] = [
    // Thousands
    ["1000", "1K"],
    ["1100", "1.1K"],
    ["1120", "1.12K"],
    ["1234", "1.23K"],
    ["1200", "1.2K"],
    ["10000", "10K"],
    ["100000", "100K"],

    ["1000000", "1M"],
    ["1100000", "1.1M"],
    ["1234000", "1.23M"],

    // Billions
    ["1000000000", "1B"],
    ["1100000000", "1.1B"],
    ["1234000000", "1.23B"],
    ["999999.49", "1M"],
    ["999999999.49", "1B"],
  ];

  for (const [input, expected] of cases) {
    test(`${input} -> ${expected}`, () => {
      expect(prettyUsd(input)).toBe(expected);
    });
  }
});

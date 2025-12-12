import { describe, expect, it } from "vitest";
import { to_platform_values } from "./to-platform-values"; // Replace with the actual module name

describe("to_platform_values", () => {
  const test_cases = [
    {
      name: "actual = specified",
      actual: 107,
      specified: { base: 100, tip: 5, fee_allowance: 2 },
      expected: { base: 100, tip: 5, fee_allowance: 2 },
    },
    {
      name: "actual > specified",
      actual: 250,
      specified: { base: 100, tip: 5, fee_allowance: 2 },
      expected: { base: 233.64, tip: 11.68, fee_allowance: 4.67 },
    },
    {
      name: "actual < specified",
      actual: 80,
      specified: { base: 100, tip: 5, fee_allowance: 3 },
      expected: { base: 74.07, tip: 3.7, fee_allowance: 2.22 },
    },
    {
      name: "zero tip and fee allowance",
      actual: 1000,
      specified: { base: 100, tip: 0, fee_allowance: 0 },
      expected: { base: 1000, tip: 0, fee_allowance: 0 },
    },
    {
      name: "actual < specified : tip is greater than amount (custom tip)",
      actual: 100,
      specified: { base: 100, tip: 150, fee_allowance: 2 },
      expected: { base: 39.68, tip: 59.52, fee_allowance: 0.79 },
    },
  ];

  for (const { name, actual, specified, expected } of test_cases) {
    it(name, () => {
      const adjusted = to_platform_values(actual, specified);

      // Check individual components
      expect(adjusted.base).toBeCloseTo(expected.base, 2);
      expect(adjusted.tip).toBeCloseTo(expected.tip, 2);
      expect(adjusted.fee_allowance).toBeCloseTo(expected.fee_allowance, 2);

      // Ensure the sum of components equals the grant amount
      const total_result =
        adjusted.base + adjusted.tip + adjusted.fee_allowance;
      expect(total_result).toBeCloseTo(actual, 2);
    });
  }
});

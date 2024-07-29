import { describe, expect, it } from "vitest";
import { toPlatformValues } from "./toPlatformValues"; // Replace with the actual module name

describe("toPlatformValues", () => {
  const testCases = [
    {
      name: "actual = specified",
      actual: 107,
      specified: { amount: 100, tip: 5, feeAllowance: 2 },
      expected: { amount: 100, tip: 5, feeAllowance: 2 },
    },
    {
      name: "actual > specified",
      actual: 250,
      specified: { amount: 100, tip: 5, feeAllowance: 2 },
      expected: { amount: 233.64, tip: 11.68, feeAllowance: 4.67 },
    },
    {
      name: "actual < specified",
      actual: 80,
      specified: { amount: 100, tip: 5, feeAllowance: 3 },
      expected: { amount: 74.07, tip: 3.7, feeAllowance: 2.22 },
    },
    {
      name: "zero tip and fee allowance",
      actual: 1000,
      specified: { amount: 100, tip: 0, feeAllowance: 0 },
      expected: { amount: 1000, tip: 0, feeAllowance: 0 },
    },
    {
      name: "actual < specified : tip is greater than amount (custom tip)",
      actual: 100,
      specified: { amount: 100, tip: 150, feeAllowance: 2 },
      expected: { amount: 39.68, tip: 59.52, feeAllowance: 0.79 },
    },
  ];

  for (const { name, actual, specified, expected } of testCases) {
    it(name, () => {
      const adjusted = toPlatformValues(actual, specified);

      // Check individual components
      expect(adjusted.amount).toBeCloseTo(expected.amount, 2);
      expect(adjusted.tip).toBeCloseTo(expected.tip, 2);
      expect(adjusted.feeAllowance).toBeCloseTo(expected.feeAllowance, 2);

      // Ensure the sum of components equals the grant amount
      const totalResult =
        adjusted.amount + adjusted.tip + adjusted.feeAllowance;
      expect(totalResult).toBeCloseTo(actual, 2);
    });
  }
});

import { describe, expect, test } from "vitest";
import { str_id, to_atomic } from "../stripe";

describe("to_atomic", () => {
  test("converts standard 2-decimal currencies correctly", () => {
    expect(to_atomic(10.5, "USD")).toBe(1050);
    expect(to_atomic(100, "EUR")).toBe(10000);
    expect(to_atomic(1.23, "GBP")).toBe(123);
    expect(to_atomic(0.01, "CAD")).toBe(1);
    expect(to_atomic(99.99, "AUD")).toBe(9999);
  });

  test("converts zero-decimal currencies correctly", () => {
    expect(to_atomic(1000, "JPY")).toBe(1000);
    expect(to_atomic(5000, "KRW")).toBe(5000);
    expect(to_atomic(100, "VND")).toBe(100);
    expect(to_atomic(1, "CLP")).toBe(1);
    expect(to_atomic(250, "XOF")).toBe(250);
  });

  test("handles currency code case insensitivity", () => {
    expect(to_atomic(10.5, "usd")).toBe(1050);
    expect(to_atomic(10.5, "USD")).toBe(1050);
    expect(to_atomic(10.5, "UsD")).toBe(1050);
    expect(to_atomic(1000, "jpy")).toBe(1000);
  });

  test("truncates correctly after rounding", () => {
    // round_number rounds, then Math.trunc truncates the result
    expect(to_atomic(10.555, "USD")).toBe(1055);
    expect(to_atomic(10.554, "USD")).toBe(1055);
    expect(to_atomic(10.556, "USD")).toBe(1055);
  });

  test("handles zero and negative amounts", () => {
    expect(to_atomic(0, "USD")).toBe(0);
    expect(to_atomic(-10.5, "USD")).toBe(-1050);
    expect(to_atomic(-100, "JPY")).toBe(-100);
  });

  test("handles fractional cents correctly", () => {
    expect(to_atomic(10.999, "USD")).toBe(1099);
    expect(to_atomic(10.991, "USD")).toBe(1099);
    expect(to_atomic(10.001, "USD")).toBe(1000);
    expect(to_atomic(0.005, "USD")).toBe(0);
    expect(to_atomic(0.004, "USD")).toBe(0);
  });

  test("handles large amounts", () => {
    expect(to_atomic(1000000, "USD")).toBe(100000000);
    expect(to_atomic(999999.99, "EUR")).toBe(99999999);
    expect(to_atomic(1000000, "JPY")).toBe(1000000);
  });

  test("defaults to 2 decimals for unknown currencies", () => {
    expect(to_atomic(10.5, "XXX")).toBe(1050);
    expect(to_atomic(100, "UNKNOWN")).toBe(10000);
  });

  test("handles all zero-decimal currencies", () => {
    const zeroCurrencies = [
      "BIF",
      "CLP",
      "DJF",
      "GNF",
      "JPY",
      "KMF",
      "KRW",
      "MGA",
      "PYG",
      "RWF",
      "VND",
      "VUV",
      "XAF",
      "XOF",
      "XPF",
    ];
    for (const currency of zeroCurrencies) {
      expect(to_atomic(100, currency)).toBe(100);
    }
  });

  test("handles special case currencies", () => {
    // ISK - zero-decimal but represented as two-decimal (always 00)
    // To charge 5 ISK, provide amount value of 500
    expect(to_atomic(5, "ISK")).toBe(500);
    expect(to_atomic(100, "ISK")).toBe(10000);
    expect(to_atomic(1, "ISK")).toBe(100);
    expect(to_atomic(10.5, "ISK")).toBe(1000); // rounds down to 10, then * 100

    // HUF - zero-decimal for payouts, but represented as two-decimal
    // 10 HUF should be 1000, must be divisible by 100
    expect(to_atomic(10, "HUF")).toBe(1000);
    expect(to_atomic(100, "HUF")).toBe(10000);
    expect(to_atomic(10.45, "HUF")).toBe(1000); // rounds down to 10, then * 100

    // TWD - zero-decimal for payouts, but represented as two-decimal
    // 800 TWD should be 80000, must be divisible by 100
    expect(to_atomic(800, "TWD")).toBe(80000);
    expect(to_atomic(100, "TWD")).toBe(10000);
    expect(to_atomic(800.45, "TWD")).toBe(80000); // rounds down to 800, then * 100

    // UGX - zero-decimal but represented as two-decimal (always 00)
    // To charge 5 UGX, provide amount value of 500
    expect(to_atomic(5, "UGX")).toBe(500);
    expect(to_atomic(100, "UGX")).toBe(10000);
    expect(to_atomic(1, "UGX")).toBe(100);
    expect(to_atomic(10.5, "UGX")).toBe(1000); // rounds down to 10, then * 100
  });

  test("special case currencies cannot charge fractions", () => {
    // ISK and UGX can't charge fractions - they round DOWN to integer first
    expect(to_atomic(5.4, "ISK")).toBe(500); // rounds down to 5
    expect(to_atomic(5.6, "ISK")).toBe(500); // rounds down to 5
    expect(to_atomic(5.4, "UGX")).toBe(500); // rounds down to 5
    expect(to_atomic(5.6, "UGX")).toBe(500); // rounds down to 5

    // HUF and TWD also round DOWN to integers first (zero-decimal precision)
    expect(to_atomic(10.4, "HUF")).toBe(1000); // rounds down to 10
    expect(to_atomic(10.6, "HUF")).toBe(1000); // rounds down to 10
    expect(to_atomic(100.4, "TWD")).toBe(10000); // rounds down to 100
    expect(to_atomic(100.6, "TWD")).toBe(10000); // rounds down to 100
  });
});

describe("str_id", () => {
  test("returns string ID when given a string", () => {
    expect(str_id("pm_123abc")).toBe("pm_123abc");
    expect(str_id("card_xyz")).toBe("card_xyz");
  });

  test("extracts ID from object with id property", () => {
    expect(str_id({ id: "pm_123abc" })).toBe("pm_123abc");
    expect(str_id({ id: "card_xyz" })).toBe("card_xyz");
  });

  test("throws error for null input", () => {
    expect(() => str_id(null)).toThrow("invalid payment method ID: null");
  });

  test("throws error for undefined input", () => {
    // @ts-expect-error - testing runtime behavior
    expect(() => str_id(undefined)).toThrow(
      "invalid payment method ID: undefined"
    );
  });

  test("throws error for falsy values", () => {
    // @ts-expect-error - testing runtime behavior
    expect(() => str_id(0)).toThrow("invalid payment method ID: 0");
    // @ts-expect-error - testing runtime behavior
    expect(() => str_id(false)).toThrow("invalid payment method ID: false");
  });
});

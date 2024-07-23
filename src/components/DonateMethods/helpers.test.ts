import type { TDonateMethod } from "types/components";
import { describe, expect, test } from "vitest";
import { order } from "./helpers";

describe("donate methods ordering", () => {
  test("daf next to stripe when stripe comes first", () => {
    expect(order(["stripe", "stocks", "crypto", "daf"])).toEqual([
      "stripe",
      "daf",
      "stocks",
      "crypto",
    ]);
  });

  test("stripe first, then daf when daf is first, regardless of stripe position", () => {
    expect(order(["daf", "stocks", "crypto", "stripe"])).toEqual([
      "stripe",
      "daf",
      "stocks",
      "crypto",
    ]);
    expect(order(["daf", "stocks", "stripe", "crypto"])).toEqual([
      "stripe",
      "daf",
      "stocks",
      "crypto",
    ]);
    expect(order(["daf", "stripe", "stocks", "crypto"])).toEqual([
      "stripe",
      "daf",
      "stocks",
      "crypto",
    ]);
  });

  test("preserve order when daf is already next to stripe", () => {
    expect(order(["stocks", "stripe", "daf", "crypto"])).toEqual([
      "stocks",
      "stripe",
      "daf",
      "crypto",
    ]);
    expect(order(["stocks", "daf", "stripe", "crypto"])).toEqual([
      "stocks",
      "stripe",
      "daf",
      "crypto",
    ]);
  });

  test("preserve order when only stripe is present", () => {
    expect(order(["stocks", "stripe", "crypto"])).toEqual([
      "stocks",
      "stripe",
      "crypto",
    ]);
  });

  test("preserve order when neither stripe nor daf is present", () => {
    expect(order(["stocks", "crypto"])).toEqual(["stocks", "crypto"]);
  });

  test("should handle empty array", () => {
    expect(order([])).toEqual([]);
  });

  test("should handle array with only stripe and daf", () => {
    expect(order(["daf", "stripe"])).toEqual(["stripe", "daf"]);
    expect(order(["stripe", "daf"])).toEqual(["stripe", "daf"]);
  });

  test("should maintain relative positions of other elements when daf is not first", () => {
    expect(order(["stocks", "daf", "crypto", "stripe"])).toEqual([
      "stocks",
      "stripe",
      "daf",
      "crypto",
    ]);
  });

  test("should work with {id: T} input", () => {
    expect(
      order([
        //only id is used in the function
        { id: "daf" } as TDonateMethod,
        { id: "stocks" } as TDonateMethod,
        { id: "crypto" } as TDonateMethod,
        { id: "stripe" } as TDonateMethod,
      ])
    ).toEqual([
      { id: "stripe" },
      { id: "daf" },
      { id: "stocks" },
      { id: "crypto" },
    ]);
  });
});

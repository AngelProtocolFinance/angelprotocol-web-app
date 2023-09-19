import { describe, expect, test } from "vitest";
import { Tupleable } from "types/evm";
import { toTuple } from "./toTuple";

//NOTE: intended for shallow form objects only atm
describe("toTuple", () => {
  test("converts tupleable to tuple", () => {
    const obj: Tupleable = {
      //flat
      a: 0,
      b: "string",
      c: false,
      //array of primitives
      d: [0, "string", false],

      //array of obj
      f: [
        { number: 1, string: "string1", bool: false },
        { number: 2, string: "string2", bool: false },
        { number: 3, string: "string3", bool: false },
      ],

      //array of primitives + obj
      e: [0, "string", false, { number: 0, string: "string", bool: false }],
      //
    };

    expect(toTuple(obj)).toStrictEqual([
      0,
      "string",
      false,
      [0, "string", false],
      [
        [1, "string1", false],
        [2, "string2", false],
        [3, "string3", false],
      ],
      [0, "string", false, [0, "string", false]],
    ]);
  });
  test("empty object to empty array", () => {
    const empty: Tupleable = {};
    expect(toTuple(empty)).toStrictEqual([]);
  });
});

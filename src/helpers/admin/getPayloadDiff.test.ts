import { describe, expect, test } from "vitest";
import { NOT_SET, getPayloadDiff } from "./getPayloadDiff";

describe("getPayloadDiff", () => {
  test("include changes from prev to next", () => {
    expect(
      getPayloadDiff(
        //biome-ignore format:
        { a: 1, b: 2, c: 3, d: NaN },
        { a: 1, b: 2, c: 3, d: NaN }
      )
    ).toStrictEqual([]);
    expect(
      getPayloadDiff(
        { a: 1, b: 2, c: 3, d: [1], e: [1, 2], f: [1, 2] },
        { a: 4, b: 5, c: 6, d: [1, 2], e: [1], f: [1, 3] }
      )
    ).toStrictEqual([
      ["a", 1, 4],
      ["b", 2, 5],
      ["c", 3, 6],
      ["f.1", 2, 3],
      ["d.1", NOT_SET, 2],
    ]);
  });

  test("if prev !== next, include next if it's truthy (including 0, '', [] and false)", () => {
    expect(
      getPayloadDiff(
        //biome-ignore format:
        { a: 1, b: "a", c: 3, d: undefined, e: "", f: 4, g: [1], h: 5, i: NaN },
        //biome-ignore format:
        { a: 0, b: "b", c: "", d: null, e: undefined, f: false, g: [], h: NaN, i: NaN }
      )
    ).toStrictEqual([
      ["a", 1, 0],
      ["b", "a", "b"],
      ["c", 3, ""],
      ["f", 4, false],
    ]);
  });

  test("include attributes not in prev but in next, given that next is truthy (including 0, [] and false)", () => {
    expect(
      getPayloadDiff(
        //biome-ignore format:;
        {},
        {
          a: null,
          b: "b",
          c: "",
          d: 0,
          e: undefined,
          f: 0,
          g: false,
          h: [],
          i: [1],
        }
      )
    ).toStrictEqual([
      ["b", NOT_SET, "b"],
      ["d", NOT_SET, 0],
      ["f", NOT_SET, 0],
      ["g", NOT_SET, false],
      ["i.0", NOT_SET, 1],
    ]);
  });

  test("both zero in prev and next", () => {
    expect(
      getPayloadDiff(
        //prettier ignore
        { a: 0 },
        { a: 0 }
      )
    ).toStrictEqual([]);
  });
  test("prev is false", () => {
    expect(
      getPayloadDiff(
        //prettier ignore
        { a: false },
        { a: false }
      )
    ).toStrictEqual([]);
  });
  test("prev is empty array []", () => {
    expect(
      getPayloadDiff(
        //prettier ignore
        { a: [] },
        { a: [] }
      )
    ).toStrictEqual([]);
  });
  test("both the same string in prev and next", () => {
    expect(
      getPayloadDiff(
        //prettier ignore
        { a: "a" },
        { a: "a" }
      )
    ).toStrictEqual([]);
  });
  test("include diff subobjects", () => {
    expect(
      getPayloadDiff(
        {
          first: {
            a: true,
            b: "abc",
            c: 1,
            d: null,
            e: undefined,
            f: {},
            g: "a",
            h: "same",
          },
          second: {
            a: true,
            b: "abc",
            c: 1,
            d: null,
            e: undefined,
            f: {},
            g: "a",
            h: "same",
          },
        },
        {
          first: {
            a: false,
            b: "abc",
            c: 2,
            d: "a",
            e: "a",
            f: { a: "a" },
            h: "same",
          },
          second: {
            a: true,
            b: "abc",
            c: 1,
            d: null,
            e: undefined,
            f: {},
            g: "a",
            h: "same",
          },
        }
      )
    ).toStrictEqual([
      ["first.a", true, false],
      ["first.c", 1, 2],
      ["first.d", NOT_SET, "a"],
      ["first.e", NOT_SET, "a"],
      ["first.f.a", NOT_SET, "a"],
    ]);
  });
});

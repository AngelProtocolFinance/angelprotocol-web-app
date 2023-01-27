import { getPayloadDiff } from "./getPayloadDiff";

describe("getPayloadDiff", () => {
  test("include changes from prev to next", () => {
    expect(
      getPayloadDiff(
        //prettier-ignore
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 }
      )
    ).toStrictEqual({});

    expect(
      getPayloadDiff(
        //prettier-ignore
        { a: 1, b: 2, c: 3, d:[1], e: [1, 2], f: [1, 2] },
        { a: 4, b: 5, c: 6, d: [1, 2], e: [1], f: [1, 3] }
      )
    ).toStrictEqual({ a: 4, b: 5, c: 6, d: [1, 2], e: [1], f: [1, 3] });
  });

  test("if prev !== next, include next if it's truthy (including 0, '', [] and false)", () => {
    expect(
      getPayloadDiff(
        //prettier-ignore
        { a: 1, b: "a", c: 3, d:undefined, e:"", f:4, g:[1] },
        { a: 0, b: "b", c: "", d: null, e: undefined, f: false, g: [] }
      )
    ).toStrictEqual({ a: 0, b: "b", c: "", f: false, g: [] });
  });

  test("include attributes not in prev but in next, given that next is truthy (including 0, [] and false)", () => {
    expect(
      getPayloadDiff(
        //prettier-ignore
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
    ).toStrictEqual({ b: "b", d: 0, f: 0, g: false, h: [], i: [1] });
  });

  test("both zero in prev and next", () => {
    expect(
      getPayloadDiff(
        //prettier ignore
        { a: 0 },
        { a: 0 }
      )
    ).toStrictEqual({});
  });
  test("prev is false", () => {
    expect(
      getPayloadDiff(
        //prettier ignore
        { a: false },
        { a: false }
      )
    ).toStrictEqual({});
  });
  test("prev is empty array []", () => {
    expect(
      getPayloadDiff(
        //prettier ignore
        { a: [] },
        { a: [] }
      )
    ).toStrictEqual({});
  });
});

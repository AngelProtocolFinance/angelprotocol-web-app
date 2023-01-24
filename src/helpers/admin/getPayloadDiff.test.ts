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
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 }
      )
    ).toStrictEqual({ a: 4, b: 5, c: 6 });
  });

  test("if prev !== next, include next if it's truthy (including 0, '', and false)", () => {
    expect(
      getPayloadDiff(
        //prettier-ignore
        { a: 1, b: "a", c: 3, d:undefined, e:"", f:4, },
        { a: 0, b: "b", c: "", d: null, e: undefined, f: false }
      )
    ).toStrictEqual({ a: 0, b: "b", c: "", f: false });
  });

  test("include attributes not in prev but in next, given that next is truthy (including 0, and false)", () => {
    expect(
      getPayloadDiff(
        //prettier-ignore
        {},
        { a: null, b: "b", c: "", d: 0, e: undefined, f: 0, g: false }
      )
    ).toStrictEqual({ b: "b", d: 0, f: 0, g: false });
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
});

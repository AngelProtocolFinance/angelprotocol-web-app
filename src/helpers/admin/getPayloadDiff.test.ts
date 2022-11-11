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

  test("if prev !== next, include next if it's truthy (including 0)", () => {
    expect(
      getPayloadDiff(
        //prettier-ignore
        { a: 1, b: "a", c: 3, d:undefined, e:"" },
        { a: 0, b: "b", c: "", d: null, e: undefined }
      )
    ).toStrictEqual({ a: 0, b: "b" });
  });

  test("include attributes not in prev but in next, given that next is truthy (including 0)", () => {
    expect(
      getPayloadDiff(
        //prettier-ignore
        {},
        { a: null, b: "b", c: "", d: 0, e: undefined, f: 0 }
      )
    ).toStrictEqual({ b: "b", d: 0, f: 0 });
  });

  test("both zero in prev and next", () => {
    expect(getPayloadDiff({ a: 0 }, { a: 0 })).toStrictEqual({});
  });
});

import { getPayloadDiff } from "./getPayloadDiff";

describe("getPayloadDiff", () => {
  test("include changes from prev to next", () => {
    expect(
      getPayloadDiff({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })
    ).toMatchObject({});

    expect(
      getPayloadDiff(
        { a: "a", b: "b", c: "c" },
        { a: "", b: undefined, c: null }
      )
    ).toMatchObject({ a: "", b: undefined, c: null });

    expect(
      getPayloadDiff({ a: "a", b: "b", c: 5 }, { a: "x", b: "y", c: 0 })
    ).toMatchObject({ a: "x", b: "y", c: 0 });

    expect(
      getPayloadDiff(
        { a: undefined, b: undefined, c: undefined },
        { a: "", b: 0, c: null }
      )
    ).toMatchObject({ a: "", b: 0, c: null });

    expect(
      getPayloadDiff(
        { a: "", b: 0, c: null },
        { a: undefined, b: undefined, c: undefined }
      )
    ).toMatchObject({ a: undefined, b: undefined, c: undefined });

    expect(
      getPayloadDiff(
        { a: undefined, b: "", c: null },
        { a: "a", b: "b", c: "c", d: "d", e: "e" }
      )
    ).toMatchObject({ a: "a", b: "b", c: "c", d: "d", e: "e" });
  });

  test("include attributes not in prev but in next", () => {
    expect(
      getPayloadDiff(
        { a: undefined, b: "", c: null },
        { a: "a", b: "b", c: "c", d: "d", e: "e" }
      )
    ).toMatchObject({ a: "a", b: "b", c: "c", d: "d", e: "e" });
  });

  test("include non-falsy (except 0) next attributes not in prev", () => {
    expect(
      getPayloadDiff(
        { a: undefined, b: "", c: null },
        { a: "a", b: "b", c: "c", d: undefined, e: "", f: null, g: 0 }
      )
    ).toMatchObject({ a: "a", b: "b", c: "c", g: 0 });
  });
});

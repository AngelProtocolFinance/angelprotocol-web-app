import { getPayloadDiff } from "./getPayloadDiff";

type Case = {
  prev: any;
  next: any;
  expected: any;
};

describe("getPayloadDiff", () => {
  test("include changes from prev to next", () => {
    expect(
      getPayloadDiff({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })
    ).toMatchObject({});

    expect(
      getPayloadDiff({ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 })
    ).toMatchObject({ a: 4, b: 5, c: 6 });
  });

  test("prevs (excluding 0) are falsies, next (including 0) are truthies", () => {
    expect(
      getPayloadDiff({ a: undefined, b: null, c: "" }, { a: 0, b: "b", c: 3 })
    ).toMatchObject({ a: 0, b: "b", c: 3 });
  });
  test("prevs (excluding 0) are falsies, next (excluding 0) are falsies", () => {
    expect(
      getPayloadDiff(
        { a: undefined, b: null, c: "", d: 0 },
        { a: null, b: "", c: 0, d: undefined }
      )
    ).toMatchObject({ c: 0 });
  });

  test("include attributes not in prev but in next (truthies including 0)", () => {
    expect(
      getPayloadDiff(
        { a: "a", b: "b", c: "c" },
        { a: null, b: undefined, c: "", d: 0, e: undefined, f: 0 }
      )
    ).toMatchObject({ d: 0, f: 0 });
  });

  test("both zero in prev and next", () => {
    expect(getPayloadDiff({ a: 0 }, { a: 0 })).toMatchObject({});
  });

  const cases: Case[] = [
    {
      prev: {},
      next: { a: "" },
      expected: { a: "" },
    },
    {
      prev: { a: "" },
      next: {},
      expected: {},
    },
  ];

  test.each(cases)("Test case: %j", (testCase) => {
    expect(getPayloadDiff(testCase.prev, testCase.next)).toMatchObject(
      testCase.expected
    );
  });
});

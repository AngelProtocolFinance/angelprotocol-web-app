import { genDiffMeta } from "./genDiffMeta";

describe("genDiffMeta", () => {
  test("generate diff sets", () => {
    expect(genDiffMeta([["a", 2]], { a: 1 })).toEqual([["a", 1, 2]]);

    expect(
      genDiffMeta(
        [
          ["a", 1],
          ["b", 2],
          ["c", 1],
        ],
        { a: 2, b: 1, c: undefined }
      )
    ).toEqual([
      ["a", 2, 1],
      ["b", 1, 2],
    ]);
  });
});

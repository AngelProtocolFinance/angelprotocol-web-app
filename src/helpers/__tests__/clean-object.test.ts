import { describe, expect, test } from "vitest";
import { clean_object } from "../clean-object";

describe("clean_object", () => {
  test("remove blacklisted values", () => {
    const input = {
      prop1: "Hello",
      prop2: null,
      prop3: "",
      prop4: [],
      prop5: undefined,
      prop6: {},
      prop7: "World",
      prop8: [1, 2, 3],
      prop9: false,
      prop10: 0,
      prop12: { hello: "world" },
    };

    const cleaned = clean_object(input);

    expect(cleaned).toStrictEqual({
      prop1: "Hello",
      prop7: "World",
      prop8: [1, 2, 3],
      prop9: false,
      prop10: 0,
      prop12: { hello: "world" },
    });
  });
});

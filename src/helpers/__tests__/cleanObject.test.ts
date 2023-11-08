import { describe, expect, test } from "vitest";
import { cleanObject } from "../cleanObject";

describe("cleanObject", () => {
  test("remove blacklisted values", () => {
    const inputObject = {
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

    const cleanedObject = cleanObject(inputObject);

    expect(cleanedObject).toStrictEqual({
      prop1: "Hello",
      prop7: "World",
      prop8: [1, 2, 3],
      prop9: false,
      prop10: 0,
      prop12: { hello: "world" },
    });
  });
});

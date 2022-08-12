import { cleanObject } from "./cleanObject";

describe("cleanObject", () => {
  test("removes falsy values except 0", () => {
    expect(
      cleanObject({ a: undefined, b: "", c: 0, d: null, e: "hello" })
    ).toMatchObject({
      c: 0,
      e: "hello",
    });
  });
});

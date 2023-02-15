import { cleanObject } from "../cleanObject";

//NOTE: intended for shallow form objects only atm
describe("cleanObject", () => {
  test("removes falsy values except 0", () => {
    expect(
      cleanObject({ a: undefined, b: "", c: 0, d: null, e: "hello" })
    ).toStrictEqual({
      c: 0,
      e: "hello",
    });
  });
});

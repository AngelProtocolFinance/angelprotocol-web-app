import { describe, expect, test } from "vitest";
import { idParamToNum } from "../id-param-to-num";

describe("id param to number", () => {
  test("user set id path to invalid", () => {
    //user types to url invalid
    expect(idParamToNum()).toBe(0); //0 is AP_ID
    expect(idParamToNum("abcde")).toBe(0);
    expect(idParamToNum("1.123")).toBe(1);
    expect(idParamToNum("2.6123")).toBe(2);
  });
  test("valid string numbers", () => {
    expect(idParamToNum("10")).toBe(10);
    expect(idParamToNum("100")).toBe(100);
  });
});

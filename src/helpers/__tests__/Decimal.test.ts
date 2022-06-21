import Decimal from "../Decimal";

describe("Decimal", () => {
  describe("constructor", () => {
    const cases = [0, 1, "1", Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

    test.each(cases)(
      "creates a class instance with default fractionalDigits",
      (input) => {
        expect(() => new Decimal(input)).not.toThrow();
      }
    );

    test.each(cases)("creates a class instance", (input) => {
      expect(() => new Decimal(input, 6)).not.toThrow();
    });

    test.each([100.1, "100.1"])(
      "throws on fractional number passed",
      (input) => {
        expect(() => new Decimal(input)).toThrow();
      }
    );

    it("throws on too big a fractional digits", () => {
      expect(() => new Decimal(1, 101)).toThrow();
    });
  });
});

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

  describe("plus", () => {
    const cases = [
      [new Decimal(0), new Decimal(0), new Decimal(0)],
      [new Decimal(1), new Decimal(1), new Decimal(2)],
      [new Decimal(100001, 3), new Decimal(100001, 3), new Decimal(200002, 3)],
      [new Decimal(-100001, 3), new Decimal(100001, 3), new Decimal(0, 3)],
    ];

    test.each(cases)("adds numbers correctly", (a, b, expected) => {
      expect(a.plus(b)).toEqual(expected);
    });

    it("throws on different fractional digits", () => {
      const a = new Decimal(101, 1);
      const b = new Decimal(1001, 2);

      expect(() => a.plus(b)).toThrow();
    });
  });
});

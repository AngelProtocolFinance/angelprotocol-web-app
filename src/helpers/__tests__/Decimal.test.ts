import Decimal from "../Decimal";

describe("Decimal", () => {
  describe("constructor", () => {
    const cases = [0, 1, "1", Number.MAX_SAFE_INTEGER];

    test.each(cases)(
      "creates a class instance with default fractionalDigits: %s",
      (input) => {
        expect(() => new Decimal(input)).not.toThrow();
      }
    );

    test.each(cases)("creates a class instance: %s", (input) => {
      expect(() => new Decimal(input, 6)).not.toThrow();
    });

    test.each([100.1, "100.1"])(
      "throws on fractional number passed: %s",
      (input) => {
        expect(() => new Decimal(input)).toThrow();
      }
    );

    test("throws on too big a fractional digits", () => {
      expect(() => new Decimal(1, 101)).toThrow();
    });
  });

  describe("plus", () => {
    const cases = [
      { a: new Decimal(0), b: new Decimal(0), expected: new Decimal(0) },
      { a: new Decimal(1), b: new Decimal(1), expected: new Decimal(2) },
      {
        a: new Decimal(100001, 3),
        b: new Decimal(100001, 3),
        expected: new Decimal(200002, 3),
      },
    ];
    test.each(cases)(
      "$a.value.data.atomics .plus($b.value.data.atomics) === $expected.value.data.atomics",
      ({ a, b, expected }) => {
        expect(a.plus(b)).toEqual(expected);
      }
    );

    test("throws on different fractional digits", () => {
      const a = new Decimal(101, 1);
      const b = new Decimal(1001, 2);

      expect(() => a.plus(b)).toThrow();
    });
  });

  describe("minus", () => {
    const cases = [
      { a: new Decimal(0), b: new Decimal(0), expected: new Decimal(0) },
      { a: new Decimal(2), b: new Decimal(1), expected: new Decimal(1) },
      {
        a: new Decimal(100001, 3),
        b: new Decimal(100001, 3),
        expected: new Decimal(0, 3),
      },
    ];
    test.each(cases)(
      "$a.value.data.atomics .minus($b.value.data.atomics) === $expected.value.data.atomics",
      ({ a, b, expected }) => {
        expect(a.minus(b)).toEqual(expected);
      }
    );

    test("throws on different fractional digits", () => {
      const a = new Decimal(1001, 2);
      const b = new Decimal(101, 1);

      expect(() => a.minus(b)).toThrow();
    });

    test("throws on negative difference", () => {
      const a = new Decimal(1);
      const b = new Decimal(2);

      expect(() => a.minus(b)).toThrow();
    });
  });

  describe("multiply", () => {
    const cases = [
      { a: new Decimal(0), b: 1, expected: new Decimal(0) },
      { a: new Decimal(1), b: 1, expected: new Decimal(1) },
      { a: new Decimal(10001, 3), b: 2, expected: new Decimal(20002, 3) },
    ];
    test.each(cases)(
      "$a.value.data.atomics .multiply($b) === $expected.value.data.atomics",
      ({ a, b, expected }) => {
        expect(a.multiply(b)).toEqual(expected);
      }
    );

    it("throws on fractional multiplier", () => {
      const a = new Decimal(100);
      const b = 2.2;

      expect(() => a.multiply(b)).toThrow();
    });
  });

  describe("toNumber", () => {
    const cases = [
      { value: new Decimal(0), expected: 0 },
      { value: new Decimal(1), expected: 1 },
      { value: new Decimal(1001, 2), expected: 10.01 },
    ];
    test.each(cases)(
      "$value.value.data.atomics .toNumber() === $expected",
      ({ value, expected }) => {
        expect(value.toNumber()).toBe(expected);
      }
    );

    test("throws on negative number", () => {
      expect(() => new Decimal(-1001, 2).toNumber()).toThrow();
    });
  });
});

import Dec from "decimal.js";
import {
  condense,
  condenseToNum,
  condenseToStr,
  roundDown,
  roundDownToNum,
  scale,
  scaleToStr,
  toCurrency,
  toPreciseLocaleString,
} from ".";

describe("common decimal helpers", () => {
  test("condense different input types", () => {
    expect(condense("1000000").toNumber()).toBe(1);
    expect(condense("1234567").toNumber()).toBe(1.234567);
    expect(condense(1000000).toNumber()).toBe(1);
    expect(condense(1234567).toNumber()).toBe(1.234567);
    expect(condense(new Dec(1_000_000)).toNumber()).toBe(1);
    expect(condense(new Dec(1234567)).toNumber()).toBe(1.234567);
  });

  test("condense different input value", () => {
    expect(condense(1_000_000).toNumber()).toBe(1);
    expect(condense(12_345_678).toNumber()).toBe(12.345678);
    expect(condense(500_000).toNumber()).toBe(0.5);
    expect(condense(51_234).toNumber()).toBe(0.051234);
    expect(condense(51_234, 7).toNumber()).toBe(0.0051234);
    expect(condense(51_234, 8).toNumber()).toBe(0.00051234);

    expect(condenseToNum(1_000_000)).toBe(1);
    expect(condenseToNum(12_345_678)).toBe(12.345678);
    expect(condenseToNum(500_000)).toBe(0.5);
    expect(condenseToNum(51_234)).toBe(0.051234);
    expect(condenseToNum(51_234, 7)).toBe(0.0051234);
    expect(condenseToNum(51_234, 8)).toBe(0.00051234);

    expect(condenseToStr(1_000_000)).toBe("1");
    expect(condenseToStr(12_345_678)).toBe("12.345678");
    expect(condenseToStr(500_000)).toBe("0.5");
    expect(condenseToStr(51_234)).toBe("0.051234");
    expect(condenseToStr(51_234, 7)).toBe("0.0051234");
    expect(condenseToStr(51_234, 8)).toBe("0.00051234");
  });

  test("scale different input types", () => {
    expect(scale("1").toString()).toBe("1000000");
    expect(scale("1.234567").toString()).toBe("1234567");
    expect(scale(1).toString()).toBe("1000000");
    expect(scale(1.234567).toString()).toBe("1234567");
    expect(scale(new Dec(1)).toString()).toBe("1000000");
    expect(scale(new Dec(1.234567)).toString()).toBe("1234567");

    expect(scaleToStr("1")).toBe("1000000");
    expect(scaleToStr("1.234567")).toBe("1234567");
    expect(scaleToStr(1)).toBe("1000000");
    expect(scaleToStr(1.234567)).toBe("1234567");
    expect(scaleToStr(new Dec(1))).toBe("1000000");
    expect(scaleToStr(new Dec(1.234567))).toBe("1234567");
  });

  test("scale different input value", () => {
    expect(scale(1).toString()).toBe("1000000");
    expect(scale(12.345678).toString()).toBe("12345678");
    expect(scale(0.5).toString()).toBe("500000");
    expect(scale(0.051234).toString()).toBe("51234");
    expect(scale(0.051234, 7).toString()).toBe("512340");
    expect(scale(0.051234, 8).toString()).toBe("5123400");
  });

  test("round down", () => {
    expect(roundDown(1.23456789, 0)).toBe("1");
    expect(roundDown(1.23456789, 1)).toBe("1.2");
    expect(roundDown(1.23456789, 2)).toBe("1.23");
    expect(roundDown(1.23456789, 3)).toBe("1.234");
    expect(roundDown(1.23456789, 4)).toBe("1.2345");
    expect(roundDown(1.23456789, 5)).toBe("1.23456");

    expect(roundDownToNum(1.23456789, 0)).toBe(1);
    expect(roundDownToNum(1.23456789, 1)).toBe(1.2);
    expect(roundDownToNum(1.23456789, 2)).toBe(1.23);
    expect(roundDownToNum(1.23456789, 3)).toBe(1.234);
    expect(roundDownToNum(1.23456789, 4)).toBe(1.2345);
    expect(roundDownToNum(1.23456789, 5)).toBe(1.23456);
  });

  test("to currency: truncating lt 1K", () => {
    expect(toCurrency(934.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(934, 0)
    );
    expect(toCurrency(934.23456789, 1, true)).toBe(
      toPreciseLocaleString(934.2, 1)
    );
    expect(toCurrency(934.23456789, 2, true)).toBe(
      toPreciseLocaleString(934.23, 2)
    );
    expect(toCurrency(934.23456789, 4, true)).toBe(
      toPreciseLocaleString(934.2345, 4)
    );
  });

  test("to currency: truncating gt 1k", () => {
    expect(toCurrency(1234.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1, 0) + "K"
    );
    expect(toCurrency(1234.23456789, 1, true)).toBe(
      toPreciseLocaleString(1.2, 1) + "K"
    );
    expect(toCurrency(1234.23456789, 2, true)).toBe(
      toPreciseLocaleString(1.23, 2) + "K"
    );
    expect(toCurrency(1234.23456789, 4, true)).toBe(
      toPreciseLocaleString(1.2342, 4) + "K"
    );
  });

  test("to currency: truncating gt 1M", () => {
    expect(toCurrency(1_234_567.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1, 0) + "M"
    );
    expect(toCurrency(1_234_567.23456789, 1, true)).toBe(
      toPreciseLocaleString(1.2, 1) + "M"
    );
    expect(toCurrency(1_234_567.23456789, 2, true)).toBe(
      toPreciseLocaleString(1.23, 2) + "M"
    );
    expect(toCurrency(1_234_567.23456789, 4, true)).toBe(
      toPreciseLocaleString(1.2345, 4) + "M"
    );

    expect(toCurrency(1_234_567.23456789, 0, false)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1_234_567, 0)
    );
    expect(toCurrency(1_234_567.23456789, 1, false)).toBe(
      toPreciseLocaleString(1_234_567.2, 1)
    );
    expect(toCurrency(1_234_567.23456789, 2, false)).toBe(
      toPreciseLocaleString(1_234_567.23, 2)
    );
    expect(toCurrency(1_234_567.23456789, 4, false)).toBe(
      toPreciseLocaleString(1_234_567.2345, 4)
    );
  });

  test("to currency: truncating gt 1B", () => {
    expect(toCurrency(1_234_567_891.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1, 0) + "B"
    );
    expect(toCurrency(1_234_567_891.23456789, 1, true)).toBe(
      toPreciseLocaleString(1.2, 1) + "B"
    );
    expect(toCurrency(1_234_567_891.23456789, 2, true)).toBe(
      toPreciseLocaleString(1.23, 2) + "B"
    );
    expect(toCurrency(1_234_567_891.23456789, 4, true)).toBe(
      toPreciseLocaleString(1.2345, 4) + "B"
    );

    expect(toCurrency(1_234_567_891.23456789, 0, false)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1_234_567_891, 0)
    );
    expect(toCurrency(1_234_567_891.23456789, 1, false)).toBe(
      toPreciseLocaleString(1_234_567_891.2, 1)
    );
    expect(toCurrency(1_234_567_891.23456789, 2, false)).toBe(
      toPreciseLocaleString(1_234_567_891.23, 2)
    );
    expect(toCurrency(1_234_567_891.23456789, 4, false)).toBe(
      toPreciseLocaleString(1_234_567_891.2345, 4)
    );
  });
});

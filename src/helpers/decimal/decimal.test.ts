import Dec, { Decimal } from "decimal.js";
import { describe, expect, test } from "vitest";
import {
  condense,
  condenseToNum,
  condenseToStr,
  humanize,
  roundDown,
  roundDownToNum,
  scale,
  scaleToStr,
  toPreciseLocaleString,
} from ".";

describe("common decimal helpers", () => {
  test("condense different input types", () => {
    expect(condense("1000000")).toMatchObject(new Decimal(1));
    expect(condense("1234567")).toMatchObject(new Decimal(1.234567));
    expect(condense(1000000)).toMatchObject(new Decimal(1));
    expect(condense(1234567)).toMatchObject(new Decimal(1.234567));
    expect(condense(new Dec(1_000_000))).toMatchObject(new Decimal(1));
    expect(condense(new Dec(1234567))).toMatchObject(new Decimal(1.234567));
  });

  test("condense different input value", () => {
    expect(condense(1_000_000)).toMatchObject(new Decimal(1));
    expect(condense(12_345_678)).toMatchObject(new Decimal(12.345678));
    expect(condense(500_000)).toMatchObject(new Decimal(0.5));
    expect(condense(51_234)).toMatchObject(new Decimal(0.051234));
    expect(condense(51_234, 7)).toMatchObject(new Decimal(0.0051234));
    expect(condense(51_234, 8)).toMatchObject(new Decimal(0.00051234));

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
    expect(scale("1")).toMatchObject(new Decimal("1000000"));
    expect(scale("1.234567")).toMatchObject(new Decimal("1234567"));
    expect(scale(1)).toMatchObject(new Decimal("1000000"));
    expect(scale(1.234567)).toMatchObject(new Decimal("1234567"));
    expect(scale(new Dec(1))).toMatchObject(new Decimal("1000000"));
    expect(scale(new Dec(1.234567))).toMatchObject(new Decimal("1234567"));

    expect(scaleToStr("1")).toBe("1000000");
    expect(scaleToStr("1.234567")).toBe("1234567");
    expect(scaleToStr(1)).toBe("1000000");
    expect(scaleToStr(1.234567)).toBe("1234567");
    expect(scaleToStr(new Dec(1))).toBe("1000000");
    expect(scaleToStr(new Dec(1.234567))).toBe("1234567");
  });

  test("scale different input value", () => {
    expect(scale(1)).toMatchObject(new Decimal("1000000"));
    expect(scale(12.345678)).toMatchObject(new Decimal("12345678"));
    expect(scale(0.5)).toMatchObject(new Decimal("500000"));
    expect(scale(0.051234)).toMatchObject(new Decimal("51234"));
    expect(scale(0.051234, 7)).toMatchObject(new Decimal("512340"));
    expect(scale(0.051234, 8)).toMatchObject(new Decimal("5123400"));
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
    expect(humanize(934.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(934, 0),
    );
    expect(humanize(934.23456789, 1, true)).toBe(
      toPreciseLocaleString(934.2, 1),
    );
    expect(humanize(934.23456789, 2, true)).toBe(
      toPreciseLocaleString(934.23, 2),
    );
    expect(humanize(934.23456789, 4, true)).toBe(
      toPreciseLocaleString(934.2345, 4),
    );
  });

  test("to currency: truncating gt 1k", () => {
    expect(humanize(1234.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1, 0) + "K",
    );
    expect(humanize(1234.23456789, 1, true)).toBe(
      toPreciseLocaleString(1.2, 1) + "K",
    );
    expect(humanize(1234.23456789, 2, true)).toBe(
      toPreciseLocaleString(1.23, 2) + "K",
    );
    expect(humanize(1234.23456789, 4, true)).toBe(
      toPreciseLocaleString(1.2342, 4) + "K",
    );
  });

  test("to currency: truncating gt 1M", () => {
    expect(humanize(1_234_567.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1, 0) + "M",
    );
    expect(humanize(1_234_567.23456789, 1, true)).toBe(
      toPreciseLocaleString(1.2, 1) + "M",
    );
    expect(humanize(1_234_567.23456789, 2, true)).toBe(
      toPreciseLocaleString(1.23, 2) + "M",
    );
    expect(humanize(1_234_567.23456789, 4, true)).toBe(
      toPreciseLocaleString(1.2345, 4) + "M",
    );

    expect(humanize(1_234_567.23456789, 0, false)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1_234_567, 0),
    );
    expect(humanize(1_234_567.23456789, 1, false)).toBe(
      toPreciseLocaleString(1_234_567.2, 1),
    );
    expect(humanize(1_234_567.23456789, 2, false)).toBe(
      toPreciseLocaleString(1_234_567.23, 2),
    );
    expect(humanize(1_234_567.23456789, 4, false)).toBe(
      toPreciseLocaleString(1_234_567.2345, 4),
    );
  });

  test("to currency: truncating gt 1B", () => {
    expect(humanize(1_234_567_891.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1, 0) + "B",
    );
    expect(humanize(1_234_567_891.23456789, 1, true)).toBe(
      toPreciseLocaleString(1.2, 1) + "B",
    );
    expect(humanize(1_234_567_891.23456789, 2, true)).toBe(
      toPreciseLocaleString(1.23, 2) + "B",
    );
    expect(humanize(1_234_567_891.23456789, 4, true)).toBe(
      toPreciseLocaleString(1.2345, 4) + "B",
    );

    expect(humanize(1_234_567_891.23456789, 0, false)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1_234_567_891, 0),
    );
    expect(humanize(1_234_567_891.23456789, 1, false)).toBe(
      toPreciseLocaleString(1_234_567_891.2, 1),
    );
    expect(humanize(1_234_567_891.23456789, 2, false)).toBe(
      toPreciseLocaleString(1_234_567_891.23, 2),
    );
    expect(humanize(1_234_567_891.23456789, 4, false)).toBe(
      toPreciseLocaleString(1_234_567_891.2345, 4),
    );
  });
});

import { describe, expect, test } from "vitest";
import { humanize, rd, rd2num, toPreciseLocaleString } from "./utils";

describe("common decimal helpers", () => {
  test("round down", () => {
    expect(rd(1.23456789, 0)).toBe("1");
    expect(rd(1.23456789, 1)).toBe("1.2");
    expect(rd(1.23456789, 2)).toBe("1.23");
    expect(rd(1.23456789, 3)).toBe("1.234");
    expect(rd(1.23456789, 4)).toBe("1.2345");
    expect(rd(1.23456789, 5)).toBe("1.23456");

    expect(rd2num(1.23456789, 0)).toBe(1);
    expect(rd2num(1.23456789, 1)).toBe(1.2);
    expect(rd2num(1.23456789, 2)).toBe(1.23);
    expect(rd2num(1.23456789, 3)).toBe(1.234);
    expect(rd2num(1.23456789, 4)).toBe(1.2345);
    expect(rd2num(1.23456789, 5)).toBe(1.23456);
  });

  test("to currency: truncating lt 1K", () => {
    expect(humanize(934.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(934, 0)
    );
    expect(humanize(934.23456789, 1, true)).toBe(
      toPreciseLocaleString(934.2, 1)
    );
    expect(humanize(934.23456789, 2, true)).toBe(
      toPreciseLocaleString(934.23, 2)
    );
    expect(humanize(934.23456789, 4, true)).toBe(
      toPreciseLocaleString(934.2345, 4)
    );
  });

  test("to currency: truncating gt 1k", () => {
    expect(humanize(1234.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      `${toPreciseLocaleString(1, 0)}K`
    );
    expect(humanize(1234.23456789, 1, true)).toBe(
      `${toPreciseLocaleString(1.2, 1)}K`
    );
    expect(humanize(1234.23456789, 2, true)).toBe(
      `${toPreciseLocaleString(1.23, 2)}K`
    );
    expect(humanize(1234.23456789, 4, true)).toBe(
      `${toPreciseLocaleString(1.2342, 4)}K`
    );
  });

  test("to currency: truncating gt 1M", () => {
    expect(humanize(1_234_567.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      `${toPreciseLocaleString(1, 0)}M`
    );
    expect(humanize(1_234_567.23456789, 1, true)).toBe(
      `${toPreciseLocaleString(1.2, 1)}M`
    );
    expect(humanize(1_234_567.23456789, 2, true)).toBe(
      `${toPreciseLocaleString(1.23, 2)}M`
    );
    expect(humanize(1_234_567.23456789, 4, true)).toBe(
      `${toPreciseLocaleString(1.2345, 4)}M`
    );

    expect(humanize(1_234_567.23456789, 0, false)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1_234_567, 0)
    );
    expect(humanize(1_234_567.23456789, 1, false)).toBe(
      toPreciseLocaleString(1_234_567.2, 1)
    );
    expect(humanize(1_234_567.23456789, 2, false)).toBe(
      toPreciseLocaleString(1_234_567.23, 2)
    );
    expect(humanize(1_234_567.23456789, 4, false)).toBe(
      toPreciseLocaleString(1_234_567.2345, 4)
    );
  });

  test("to currency: truncating gt 1B", () => {
    expect(humanize(1_234_567_891.23456789, 0, true)).toBe(
      //toLocalString output may vary depending on machine
      `${toPreciseLocaleString(1, 0)}B`
    );
    expect(humanize(1_234_567_891.23456789, 1, true)).toBe(
      `${toPreciseLocaleString(1.2, 1)}B`
    );
    expect(humanize(1_234_567_891.23456789, 2, true)).toBe(
      `${toPreciseLocaleString(1.23, 2)}B`
    );
    expect(humanize(1_234_567_891.23456789, 4, true)).toBe(
      `${toPreciseLocaleString(1.2345, 4)}B`
    );

    expect(humanize(1_234_567_891.23456789, 0, false)).toBe(
      //toLocalString output may vary depending on machine
      toPreciseLocaleString(1_234_567_891, 0)
    );
    expect(humanize(1_234_567_891.23456789, 1, false)).toBe(
      toPreciseLocaleString(1_234_567_891.2, 1)
    );
    expect(humanize(1_234_567_891.23456789, 2, false)).toBe(
      toPreciseLocaleString(1_234_567_891.23, 2)
    );
    expect(humanize(1_234_567_891.23456789, 4, false)).toBe(
      toPreciseLocaleString(1_234_567_891.2345, 4)
    );
  });
});

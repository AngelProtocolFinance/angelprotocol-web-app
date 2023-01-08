import { TokenWithAmount as TWA } from "types/slices";
import getBreakdown from "./getBreakdown";

type TestToken = Pick<TWA, "amount" | "gift">;
type Result = ReturnType<typeof getBreakdown>;

describe("getBreakdown test", () => {
  test("no giftcard balance", () => {
    const token: TestToken = { amount: "100" };
    expect(getBreakdown(token as TWA)).toStrictEqual<Result>({
      fromBal: 100,
      fromGift: 0,
    });
  });
  test("gift balance to cover portion of donation", () => {
    const token: TestToken = { amount: "100", gift: 20 };
    expect(getBreakdown(token as TWA)).toStrictEqual<Result>({
      fromBal: 80,
      fromGift: 20,
    });
  });
  test("donation doesn't consume all giftcard balance", () => {
    const token: TestToken = { amount: "20", gift: 100 };
    expect(getBreakdown(token as TWA)).toStrictEqual<Result>({
      fromBal: 0,
      fromGift: 20,
    });
  });
  test("donation consumes all giftcard balance", () => {
    const token: TestToken = { amount: "100", gift: 100 };
    expect(getBreakdown(token as TWA)).toStrictEqual<Result>({
      fromBal: 0,
      fromGift: 100,
    });
  });
  test("user balance to supplement shortage of giftcard balance", () => {
    const token: TestToken = { amount: "120", gift: 100 };
    expect(getBreakdown(token as TWA)).toStrictEqual<Result>({
      fromBal: 20,
      fromGift: 100,
    });
  });
});

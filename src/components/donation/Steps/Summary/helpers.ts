import { PROCESSING_RATES } from "constants/common";
import type { DonationDetails } from "../types";

export const processingFee = (details: DonationDetails): number => {
  if (details.method === "crypto") {
    return feeFn({
      amount: +details.token.amount,
      rate: PROCESSING_RATES.crypto,
      flat: 0,
    });
  }

  if (details.method === "daf") {
    return feeFn({
      amount: +details.amount,
      rate: PROCESSING_RATES.chariot,
      flat: 0,
    });
  }

  if (details.method === "stocks") return 0;

  details.method satisfies "stripe";

  /** @see https://stripe.com/pricing */
  return feeFn({
    amount: +details.amount,
    rate: PROCESSING_RATES.stripe,
    flat: 0.3 /** 30cents */,
  });
};

interface Input {
  /** total amount */
  amount: number;
  /** rate: 0 - 1*/
  rate: number;
  /** flat:denomination same as amount */
  flat: number;
}

function feeFn(input: Input, prev = 0, iterations = 0): number {
  const { amount, rate, flat } = input;
  const fee = (amount + prev ?? 0) * rate + flat;

  const diff = fee - prev;

  //base case
  if (diff < 0.01) return fee;
  if (iterations > 10) return fee;

  return feeFn(input, fee, iterations + 1);
}

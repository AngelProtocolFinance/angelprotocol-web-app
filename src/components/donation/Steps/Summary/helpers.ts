import { PROCESSING_RATES } from "constants/common";
import type { DonationDetails } from "../types";

export const processingFee = (details: DonationDetails): number => {
  if (details.method === "stocks") return 0;

  if (details.method === "crypto") {
    return fee(+details.token.amount, PROCESSING_RATES.crypto);
  }

  if (details.method === "daf") {
    return fee(+details.amount, PROCESSING_RATES.chariot);
  }

  details.method satisfies "stripe";
  /** @see https://stripe.com/pricing */
  const { currency, amount } = details;
  return fee(+amount, PROCESSING_RATES.stripe, 0.3 * currency.rate);
};

function fee(amount: number, rate: number, flat = 0): number {
  /**
   * fee(1) = amount * rate + flat
   * fee(2) = (amount + fee(1)) * rate + flat
   * fee(3) = (amount + fee(2)) * rate + flat
   * i.e. F₍ₙ₎ = a · ∑ᵏ⁼¹ⁿ (rᵏ) + f · ∑ᵏ⁼⁰ⁿ⁻¹ (rᵏ)
   * which converges to this formula: n approaches infinity
   */
  return (amount * rate + flat) / (1 - rate);
}

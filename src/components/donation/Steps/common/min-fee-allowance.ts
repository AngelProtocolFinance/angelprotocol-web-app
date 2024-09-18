import { PROCESSING_RATES } from "constants/common";
import type { DonationDetails } from "../types";

export const minFeeAllowance = (
  details: DonationDetails,
  tip: number
): number => {
  const [amnt, rate, flat] = (() => {
    switch (details.method) {
      case "crypto":
        return [+details.token.amount, PROCESSING_RATES.crypto, 0];
      case "daf":
        return [+details.amount, PROCESSING_RATES.chariot, 0];
      case "stripe":
        /** @see https://stripe.com/pricing */
        return [
          +details.amount,
          PROCESSING_RATES.stripe,
          PROCESSING_RATES.stripe_flat * details.currency.rate,
        ];
      default: {
        details.method satisfies "stocks";
        return [0, 0, 0];
      }
    }
  })();

  if (details.method === "stocks") return 0;
  return allowance(amnt + tip, rate, flat);
};

function allowance(amount: number, rate: number, flat = 0): number {
  /**
   * fee(1) = amount * rate + flat
   * fee(2) = (amount + fee(1)) * rate + flat
   * fee(3) = (amount + fee(2)) * rate + flat
   * i.e. F₍ₙ₎ = a · ∑ᵏ⁼¹ⁿ (rᵏ) + f · ∑ᵏ⁼⁰ⁿ⁻¹ (rᵏ)
   * which converges to this formula: n approaches infinity
   */
  return (amount * rate + flat) / (1 - rate);
}

console.log(allowance(98.75982905982904 + 16.789170940170944, 0.029));

import { PROCESSING_RATES } from "constants/common";
import { min_fee_allowance as fn } from "helpers/donation";
import type { DonationDetails } from "../types";

export const min_fee_allowance = (
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
  return fn(amnt + tip, rate, flat);
};

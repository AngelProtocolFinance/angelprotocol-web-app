import { PROCESSING_RATES } from "constants/common";
import type { DonationDetails } from "../types";

export const processingFee = (details: DonationDetails): number => {
  if (details.method === "crypto") {
    return +details.token.amount * PROCESSING_RATES.crypto;
  }

  if (details.method !== "stripe") return 0;

  /** @see https://stripe.com/pricing */
  const fixedFeeUnits = 0.3 /** 30cents */ * details.currency.rate;
  return PROCESSING_RATES.stripe * +details.amount + fixedFeeUnits;
};

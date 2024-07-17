import { chains } from "constants/chains";
import { PROCESSING_RATES } from "constants/common";
import type { ChainID } from "types/chain";
import type { DonateMethodId } from "types/lists";

export const processingFee = (
  amount: number,
  platform: Extract<DonateMethodId, "stripe"> | ChainID
) =>
  amount *
  (platform === "stripe"
    ? PROCESSING_RATES.stripe
    : chains[platform].processingRate);

import type { Except } from "type-fest";
import type { ChainID } from "types/chain";
import type { CryptoDonationDetails } from "../../types";

export type MaybeEmptyChainId = ChainID | "";

export type DonateValues = Except<
  CryptoDonationDetails,
  "method" | "chainId"
> & {
  chainId: MaybeEmptyChainId;
};

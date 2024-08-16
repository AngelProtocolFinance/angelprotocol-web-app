import type { Except } from "type-fest";
import type { Chain } from "types/chain";
import type { CryptoDonationDetails } from "../../types";

export type MaybeEmptyChainId = Chain.Id.All | "";

export type DonateValues = Except<CryptoDonationDetails, "method"> & {
  chainId: MaybeEmptyChainId;
};

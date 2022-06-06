import { WalletController } from "@terra-money/wallet-provider";
import { chainOptions } from "constants/chainOptions";

/**
 *  initialize controller: usage outside component or hook
 *  note: be sure that consumer checks if wallet is connected
 *  */
export const { post: postTerraTx } = new WalletController({
  ...chainOptions,
});

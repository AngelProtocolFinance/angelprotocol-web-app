import { CreateTxOptions } from "@terra-money/terra.js";
import {
  TxResult,
  WalletController,
  getChainOptions,
} from "@terra-money/wallet-provider";

/**
 *  initialize controller: usage outside component or hook
 *  note: be sure that consumer checks if wallet is connected
 *  */

export default async function postTerraTx(
  tx: CreateTxOptions,
  terraAddress?: string | undefined
): Promise<TxResult> {
  const chainOptions = await getChainOptions();
  const { post: postTerraTx } = new WalletController({
    ...chainOptions,
  });

  return postTerraTx(tx, terraAddress);
}

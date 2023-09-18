import { CreateTxOptions } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Timeout, TxFailed, UserDenied } from "@terra-money/wallet-provider";
import { SubmittedTx, TxResult } from "types/tx";
import { logger } from "../../logger";

export async function sendTerraTx(
  wallet: ConnectedWallet,
  tx: CreateTxOptions
): Promise<TxResult> {
  try {
    const { result, success } = await wallet.post(tx);

    const submitted: SubmittedTx = {
      hash: result.txhash,
      chainID: wallet.network.chainID,
    };
    if (!success) {
      return { error: "Transaction submitted but failed", tx: submitted };
    }
    return { ...submitted, data: null };
  } catch (err) {
    logger.error(err);
    if (err instanceof UserDenied) {
      return { error: "Transaction not signed" };
    }
    if (err instanceof Timeout) {
      return {
        error: "Timeout: user failed to approve transaction within time limit",
      };
    }
    if (err instanceof TxFailed) {
      return {
        error: "Transaction submitted but failed",
        tx: err.txhash
          ? {
              hash: err.txhash,
              chainID: wallet.network.chainID,
            }
          : undefined,
      };
    }
    return { error: "Error encountered while sending transaction" };
  }
}

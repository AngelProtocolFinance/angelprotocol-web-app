import {
  CosmosTxSimulationFail,
  LogApplicationUpdateError,
  LogDonationFail,
  TxResultFail,
  UnexpectedStateError,
  WalletDisconnectedError,
} from "@/errors/errors";
import { logger } from "@/helpers";
import { GENERIC_ERROR_MESSAGE } from "@ap/constants";
import { TimeoutError } from "@cosmjs/stargate";
import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";
import { TxError } from "./types";

export default function handleTxError(
  error: any,
  prompt: (state: TxError) => void
) {
  logger.error(error);

  if (error instanceof WalletDisconnectedError) {
    prompt({ error: error.message });
  } else if (error instanceof UserDenied) {
    prompt({ error: "Transaction aborted" });
  } else if (error instanceof CreateTxFailed) {
    prompt({ error: "Failed to create transaction" });
  } else if (error instanceof TxFailed) {
    prompt({ error: "Transaction failed" });
  } else if (error instanceof TxResultFail) {
    prompt({
      error: error.message,
      tx: { hash: error.txHash, chainID: error.chain.chain_id },
    });
  } else if (error instanceof LogDonationFail) {
    prompt({
      error: error.message,
      tx: { hash: error.txHash, chainID: error.chainId },
    });
  } else if (error instanceof LogApplicationUpdateError) {
    prompt({
      error: error.message,
    });
  } else if (error instanceof Timeout || error instanceof TimeoutError) {
    prompt({ error: error.message });
  } else if (error instanceof TxUnspecifiedError) {
    prompt({ error: GENERIC_ERROR_MESSAGE });
  } else if (error instanceof UnexpectedStateError) {
    prompt({ error: error.message });
  } else if (error instanceof CosmosTxSimulationFail) {
    prompt({ error: error.message });
    //any error we are not sure the contents of should just be defaulted to `unknown`
    //to avoid dumping to user long Error.message
  } else {
    prompt({ error: GENERIC_ERROR_MESSAGE });
  }
}

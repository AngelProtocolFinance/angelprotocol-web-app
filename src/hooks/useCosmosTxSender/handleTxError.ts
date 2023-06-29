import { TxError } from "./types";
import { logger } from "helpers";
import {
  BroadcastError,
  CosmosTxSimulationFail,
  LogApplicationUpdateError,
  LogDonationFail,
  TxResultFail,
  TxTimeout,
  UnexpectedStateError,
  WalletDisconnectedError,
} from "errors/errors";
import { GENERIC_ERROR_MESSAGE } from "constants/common";

export default function handleTxError(
  error: any,
  prompt: (state: TxError) => void
) {
  logger.error(error);

  if (error instanceof WalletDisconnectedError) {
    prompt({ error: error.message });
  } else if (error instanceof TxResultFail) {
    prompt({
      error: error.message,
      tx: { hash: error.txHash, chainID: error.chain.chain_id },
    });
  } else if (error instanceof TxTimeout) {
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
  } else if (error instanceof UnexpectedStateError) {
    prompt({ error: error.message });
  } else if (error instanceof BroadcastError) {
    prompt({ error: error.message });
  } else if (error instanceof CosmosTxSimulationFail) {
    prompt({ error: error.message });
    //any error we are not sure the contents of should just be defaulted to `unknown`
    //to avoid dumping to user long Error.message
  } else {
    prompt({ error: GENERIC_ERROR_MESSAGE });
  }
}

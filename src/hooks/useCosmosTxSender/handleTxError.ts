import { TimeoutError } from "@cosmjs/stargate";
import { TxError } from "./types";
import { logger } from "helpers";
import {
  CosmosTxSimulationFail,
  TxResultFail,
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
  } else if (error instanceof TimeoutError) {
    prompt({ error: error.message });
  } else if (error instanceof CosmosTxSimulationFail) {
    prompt({ error: error.message });
    //any error we are not sure the contents of should just be defaulted to `unknown`
    //to avoid dumping to user long Error.message
  } else {
    prompt({ error: GENERIC_ERROR_MESSAGE });
  }
}

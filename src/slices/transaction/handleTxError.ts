import { StageUpdater } from "slices/transaction/types";
import { TimeoutError } from "types/cosmos";
import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "types/terra";
import { logger } from "helpers";
import {
  CosmosTxSimulationFail,
  LogApplicationUpdateError,
  LogDonationFail,
  TxResultFail,
  UnexpectedStateError,
  WalletDisconnectedError,
} from "errors/errors";

export default function handleTxError(error: any, handler: StageUpdater) {
  logger.error(error);

  if (error instanceof WalletDisconnectedError) {
    handler({ step: "error", message: error.message });
  } else if (error instanceof UserDenied) {
    handler({ step: "error", message: "Transaction aborted" });
  } else if (error instanceof CreateTxFailed) {
    handler({ step: "error", message: "Failed to create transaction" });
  } else if (error instanceof TxFailed) {
    handler({ step: "error", message: "Transaction failed" });
  } else if (error instanceof TxResultFail) {
    handler({
      step: "error",
      message: error.message,
      txHash: error.txHash,
      chainId: error.chain.chain_id,
    });
  } else if (error instanceof LogDonationFail) {
    handler({
      step: "error",
      message: error.message,
      txHash: error.txHash,
    });
  } else if (error instanceof LogApplicationUpdateError) {
    handler({
      step: "error",
      message: error.message,
    });
  } else if (error instanceof Timeout || error instanceof TimeoutError) {
    handler({ step: "error", message: error.message });
  } else if (error instanceof TxUnspecifiedError) {
    handler({ step: "error", message: "Unspecified error occured" });
  } else if (error instanceof UnexpectedStateError) {
    handler({ step: "error", message: error.message });
  } else if (error instanceof CosmosTxSimulationFail) {
    handler({ step: "error", message: error.message });
    //any error we are not sure the contents of should just be defaulted to `unknown`
    //to avoid dumping to user long Error.message
  } else {
    handler({ step: "error", message: "Unknown error occured" });
  }
}

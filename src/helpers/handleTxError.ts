import { TimeoutError } from "@cosmjs/stargate";
import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";
import { StageUpdater } from "slices/transaction/types";
import { LogDonationFail } from "helpers/logDonation";
import logger from "helpers/logger";
import {
  LogApplicationUpdateError,
  TxResultFail,
  UnexpectedStateError,
} from "errors/errors";

export default function handleTxError(error: any, handler: StageUpdater) {
  logger.error(error);

  if (error instanceof UserDenied) {
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
      chainId: error.chainId,
    });
  } else if (error instanceof LogDonationFail) {
    handler({
      step: "error",
      message:
        "Failed to log your donation for receipt purposes. Kindly send an email to support@angelprotocol.io",
      txHash: error.txHash,
      chainId: error.chainId,
    });
  } else if (error instanceof LogApplicationUpdateError) {
    handler({
      step: "error",
      message: "Failed to log the Poll ID of your proposal.",
      chainId: error.chainId,
    });
  } else if (error instanceof Timeout || error instanceof TimeoutError) {
    handler({ step: "error", message: error.message });
  } else if (error instanceof TxUnspecifiedError) {
    handler({ step: "error", message: "Unspecified error occured" });
  } else if (error instanceof UnexpectedStateError) {
    handler({ step: "error", message: error.message });
  } else if (error instanceof Error) {
    handler({
      step: "error",
      message: error.message || "Unknown error occured",
    });
  } else {
    handler({ step: "error", message: "Unknown error occured" });
  }
}

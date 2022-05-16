import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";
import { StageUpdator } from "@types-slice/transaction";
import { LogDonationFail } from "helpers/logDonation";
import {
  LogApplicationUpdateError,
  TxResultFail,
  WalletDisconnectError,
} from "errors/errors";

export default function handleTerraError(error: any, handler: StageUpdator) {
  if (error instanceof UserDenied) {
    handler({ step: "error", message: "Transaction aborted" });
  } else if (error instanceof WalletDisconnectError) {
    handler({ step: "error", message: "Wallet is not connected" });
  } else if (error instanceof CreateTxFailed) {
    handler({ step: "error", message: "Failed to create transaction" });
  } else if (error instanceof TxFailed) {
    handler({ step: "error", message: "Transaction failed" });
  } else if (error instanceof TxResultFail) {
    handler({
      step: "error",
      message: "Timeout: failed to wait for transaction result.",
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
  } else if (error instanceof Timeout) {
    handler({ step: "error", message: "Transaction timeout" });
  } else if (error instanceof TxUnspecifiedError) {
    handler({ step: "error", message: "Unspecified error occured" });
  } else {
    handler({ step: "error", message: "Unknown error occured" });
  }
}

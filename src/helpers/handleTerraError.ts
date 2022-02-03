import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { Disconnected, TxResultFail } from "contracts/Errors";
import { StageUpdator, Step } from "services/transaction/types";

export default function handleTerraError(error: any, handler: StageUpdator) {
  if (error instanceof UserDenied) {
    handler({ step: Step.error, message: "Transaction aborted" });
  } else if (error instanceof Disconnected) {
    handler({ step: Step.error, message: "Wallet is not connected" });
  } else if (error instanceof CreateTxFailed) {
    handler({ step: Step.error, message: "Failed to create transaction" });
  } else if (error instanceof TxFailed) {
    handler({ step: Step.error, message: "Transaction failed" });
  } else if (error instanceof TxResultFail) {
    handler({
      step: Step.error,
      message:
        "Timeout: failed to wait for transaction result. If you need a receipt, you can request one by going to your donation history",
      txHash: error.txHash,
      chainId: error.chainId as chainIDs,
    });
  } else if (error instanceof Timeout) {
    handler({ step: Step.error, message: "Transaction timeout" });
  } else if (error instanceof TxUnspecifiedError) {
    handler({ step: Step.error, message: "Unspecified error occured" });
  } else {
    handler({ step: Step.error, message: "Unknown error occured" });
  }
}

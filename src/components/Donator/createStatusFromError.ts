import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";
import { Disconnected, TxResultFail } from "contracts/Errors";
import { Steps, Status } from "./types";

export default function createStatusFromError(error: unknown): Status {
  if (error instanceof UserDenied) {
    return { step: Steps.error, message: "Transaction aborted" };
  } else if (error instanceof Disconnected) {
    return { step: Steps.error, message: "Wallet is not connected" };
  } else if (error instanceof CreateTxFailed) {
    return { step: Steps.error, message: "Failed to create transaction" };
  } else if (error instanceof TxFailed) {
    return { step: Steps.error, message: "Transaction failed" };
  } else if (error instanceof TxResultFail) {
    return {
      step: Steps.no_result,
      message: "Failed to get transaction details",
    };
  } else if (error instanceof Timeout) {
    return { step: Steps.error, message: "Transaction timeout" };
  } else if (error instanceof TxUnspecifiedError) {
    return { step: Steps.error, message: "Unknown error occured" };
  } else {
    return {
      step: Steps.error,
      message: "Unknown error occured",
    };
  }
}

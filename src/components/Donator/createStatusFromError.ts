import {
  CreateTxFailed,
  Timeout,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";
import { Steps, Status } from "./types";

export default function createStatusFromError(error: unknown): Status {
  if (error instanceof UserDenied) {
    return { step: Steps.error, message: "Transaction aborted" };
  } else if (error instanceof CreateTxFailed) {
    return { step: Steps.error, message: "Transaction error" };
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

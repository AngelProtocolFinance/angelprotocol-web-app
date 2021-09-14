import {
  CreateTxFailed,
  Timeout,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-dev/wallet-types";
import { Status, Result } from "./types";

export default function handleError(error: unknown): Result {
  if (error instanceof UserDenied) {
    return { status: Status.error, message: "Transaction aborted" };
  } else if (error instanceof CreateTxFailed) {
    return { status: Status.error, message: "Transaction error" };
  } else if (error instanceof Timeout) {
    return { status: Status.error, message: "Transaction timeout" };
  } else if (error instanceof TxUnspecifiedError) {
    return { status: Status.error, message: "Unknown error occured" };
  } else {
    return {
      status: Status.error,
      message: "Unknown error occured",
    };
  }
}

import {
  CreateTxFailed,
  Timeout,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-dev/wallet-types";
import { Status, ErrorMsg } from "./Donator";

export default function handleError(error: unknown): ErrorMsg {
  if (error instanceof UserDenied) {
    return { status: Status.canceled, message: "Transaction aborted" };
  } else if (error instanceof CreateTxFailed) {
    return { status: Status.failed, message: "Transaction Failed" };
  } else if (error instanceof Timeout) {
    return { status: Status.failed, message: "Transaction timeout" };
  } else if (error instanceof TxUnspecifiedError) {
    return { status: Status.failed, message: "Unknown error occured" };
  } else {
    return {
      status: Status.failed,
      message: "Unknown error occured",
    };
  }
}

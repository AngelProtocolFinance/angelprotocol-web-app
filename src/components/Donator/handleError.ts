import {
  CreateTxFailed,
  Timeout,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-dev/wallet-types";
import { donateStatus, ErrorMsg } from "./Donator";

export default function handleError(error: unknown): ErrorMsg {
  if (error instanceof UserDenied) {
    return { status: donateStatus.canceled, message: "Transaction aborted" };
  } else if (error instanceof CreateTxFailed) {
    return { status: donateStatus.failed, message: "Transaction Failed" };
  } else if (error instanceof Timeout) {
    return { status: donateStatus.failed, message: "Transaction timeout" };
  } else if (error instanceof TxUnspecifiedError) {
    return { status: donateStatus.failed, message: "Unknown error occured" };
  } else {
    return {
      status: donateStatus.failed,
      message: "Unknown error occured",
    };
  }
}

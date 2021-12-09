import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";
import { Disconnected, TxResultFail } from "contracts/Errors";
import { ErrorHandler } from "components/Donater/types";

export default function handleTerraError(error: any, handler: ErrorHandler) {
  if (error instanceof UserDenied) {
    handler("Transaction aborted");
  } else if (error instanceof Disconnected) {
    handler("Wallet is not connected");
  } else if (error instanceof CreateTxFailed) {
    handler("Failed to create transaction");
  } else if (error instanceof TxFailed) {
    handler("Transaction failed");
  } else if (error instanceof TxResultFail) {
    handler("Timeout: failed to get transaction result", error.url);
  } else if (error instanceof Timeout) {
    handler("Transaction timeout");
  } else if (error instanceof TxUnspecifiedError) {
    handler("Unspecified error occured");
    //uknown error
  } else {
    handler("Unknown error occured");
  }
}

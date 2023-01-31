import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";

interface EIPError extends Error {
  //applicable to both EIP1193 & EIP1474
  code: number;
  data?: unknown;
}

const APP_FAILURE =
  "App failed to process your transaction. Please get in touch with support@angelprotocol.io";

function isEIP1193Error(error: unknown): error is EIPError {
  return typeof error === "object" && error !== null && "code" in error;
}

// export const handleError = (...handlers: ErrorHandler[]) =>
//   handlers.reduce((prev, curr) => (err, cb) => prev(err, cb, curr));

export function handleError(
  error: unknown,
  callback: (message: string | { message: string; hash: string }) => void
) {
  //handle EIP errors
  if (isEIP1193Error(error)) {
    switch (error.code) {
      //https://eips.ethereum.org/EIPS/eip-1193#provider-errors
      case 4001:
        return callback("User rejected request");

      //wallet is not connected to chain
      case 4900:
      case 4901:

      //https://eips.ethereum.org/EIPS/eip-1474#error-codes
      // EIP 1474 prior to submission
      case -32700:
      case -32600:
      case -32601:
      case -32602:
        //TODO: report to sentry
        return callback(APP_FAILURE);

      case -32603:
        //TODO: report to sentry
        return callback(
          "Server can't process your transaction. Please try again later."
        );
      default:
    }
  }

  /** handle terra error */
  if (error instanceof UserDenied) {
    return callback("User rejected request");
  }
  if (error instanceof Timeout) {
    return callback("Timeout: user failed to approve transaction");
  }

  //report to sentry:
  if (error instanceof TxFailed) {
    return callback(
      error.txhash
        ? { message: "Transaction submitted but failed", hash: error.txhash }
        : "Transaction submitted but failed"
    );
  }

  //report to sentry:
  if (error instanceof TxUnspecifiedError || error instanceof CreateTxFailed) {
    return callback(APP_FAILURE);
  }

  //report to sentry
  if (error instanceof Error) {
    return callback(error.message);
  }

  //report to sentry
  callback("Unknown error occurred");
}

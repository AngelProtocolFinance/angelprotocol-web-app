import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";

type ErrorHandler = (
  error: unknown,
  callback: (message: string | { message: string; hash: string }) => void,
  next?: ErrorHandler
) => void;

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

export const handleEIPError: ErrorHandler = (error, callback, next) => {
  if (!isEIP1193Error(error)) {
    next?.(error, callback);
    return;
  }
  switch (error.code) {
    //https://eips.ethereum.org/EIPS/eip-1193#provider-errors
    case 4001:
      callback("User rejected request");
      break;

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
      callback(APP_FAILURE);
      break;

    case -32603:
      //TODO: report to sentry
      callback(
        "Server can't process your transaction. Please try again later."
      );
      break;
    default:
      if (next) {
        next(error, callback);
      } else {
        //TODO: report to sentry
        callback("Wallet encountered an uknown error");
      }
  }
};

export const handleTerraError: ErrorHandler = (err, callback, next) => {
  if (err instanceof UserDenied) {
    callback("User rejected request");
  } else if (err instanceof Timeout) {
    callback("Transaction is submitted but not yet confirmed");
  } else if (err instanceof TxFailed) {
    callback(
      err.txhash
        ? { message: "Transaction submitted but failed", hash: err.txhash }
        : "Transaction submitted but failed"
    );
  } else if (
    err instanceof TxUnspecifiedError ||
    err instanceof CreateTxFailed
  ) {
    callback(APP_FAILURE);
  } else {
    if (next) {
      next(err, callback);
    } else {
      //TODO: report to sentry
      callback("Wallet encountered an uknown error");
    }
  }
};

export function handleError(...handlers: ErrorHandler[]): ErrorHandler {
  return (error, callback, next) => {
    const [handler, ...rest] = handlers;
    if (handler) {
      handler(error, callback, handleError(...rest));
    } else {
      next?.(error, callback);
    }
  };
}

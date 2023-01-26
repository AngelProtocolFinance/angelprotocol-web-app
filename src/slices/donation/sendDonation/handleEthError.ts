import { logger } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";

/** TODO: use this with sendDonation */
export default function handleEthError(error: any, handler: any) {
  logger.error(error);

  switch (error?.code) {
    //https://eips.ethereum.org/EIPS/eip-1193#provider-errors
    case 4001:
      handler({ step: "error", message: "Transaction cancelled" });
      break;
    case 4900:
    case 4901:
      handler({ step: "error", message: "WalletDisconnectError" });
      break;
    //https://eips.ethereum.org/EIPS/eip-1474#error-codes
    case 32603:
      handler({
        step: "error",
        message: GENERIC_ERROR_MESSAGE,
      });
  }
}

type ErrorHandler = (
  error: unknown,
  callback: (message: string) => void,
  next?: ErrorHandler
) => void;

interface EIPError extends Error {
  //applicable to both EIP1193 & EIP1474
  code: number;
  data?: unknown;
}

function isEIP1193Error(error: unknown): error is EIPError {
  return typeof error === "object" && error !== null && "code" in error;
}

const handleEIPError: ErrorHandler = (error, callback, next) => {
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
      callback(
        "App failed to process your transaction. Please get in touch with support@angelprotocol.io"
      );
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
        callback("Wallet encountered an uknown error");
      }
  }
};

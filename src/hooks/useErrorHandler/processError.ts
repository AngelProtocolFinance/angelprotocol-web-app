import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";
import { APError } from "./types";
import { logger } from "helpers";
import { chainIds } from "constants/chains";
import {
  APP_FETCH_FAIL,
  APP_TX_FAIL,
  AWS_FETCH_FAIL,
  GENERIC_ERROR,
} from "./constants";

export function processError(error: unknown, source: string): APError {
  logger.error(error);

  //handle EIP errors
  if (isEIP1193Error(error)) {
    switch (error.code) {
      //https://eips.ethereum.org/EIPS/eip-1193#provider-errors
      case 4001:
        return { type: "tx", message: "User rejected request" };

      case 4900: //wallet is not connected to chain
      case 4901:
      case -32700: //https://eips.ethereum.org/EIPS/eip-1474#error-codes
      case -32600: //EIP 1474 prior to submission
      case -32601:
      case -32602:
        return {
          type: "tx",
          message: APP_TX_FAIL,
          report: `EIP ERROR CODE: ${error.code} SOURCE: ${source}`,
        };

      case -32603:
        return {
          type: "tx",
          message:
            "Server can't process your transaction. Please try again later.",
          report: `EIP ERROR CODE: ${error.code} SOURCE: ${source}`,
        };
    }
  }

  /** handle binance extension error */
  if (isBinanceError(error)) {
    if (/rejected by user/i.test(error.error)) {
      return { type: "tx", message: "User rejected request" };
    }

    return { type: "tx", message: APP_TX_FAIL, report: error.error };
  }

  /** handle terra error */
  if (error instanceof UserDenied) {
    return { type: "tx", message: "User rejected request" };
  }
  if (error instanceof Timeout) {
    return {
      type: "tx",
      message: "Timeout: user failed to approve transaction within time limit",
    };
  }
  if (error instanceof TxFailed) {
    return {
      type: "tx",
      message: "Transaction submitted but failed",
      report: error.toString(),
      tx: error.txhash
        ? {
            hash: error.txhash,
            chainId: chainIds.terra,
          }
        : undefined,
    };
  }

  if (error instanceof TxUnspecifiedError || error instanceof CreateTxFailed) {
    return { type: "tx", message: APP_TX_FAIL, report: error.toString() };
  }

  /** handle RTK fetch errors */
  if (isFetchBaseQueryError(error)) {
    switch (error.status) {
      case "FETCH_ERROR":
        return {
          type: "generic",
          message: APP_FETCH_FAIL,
          report: error.error,
        };
      case "PARSING_ERROR":
        return {
          type: "generic",
          message: AWS_FETCH_FAIL,
          report: error.error,
        };
      case "TIMEOUT_ERROR":
        return {
          type: "generic",
          message: "Timeout: Please try again later.",
          report: error.error,
        };
      //show custom errors from queryFn
      case "CUSTOM_ERROR":
        return { type: "generic", message: error.error };

      //typeof status === number
      default: {
        if (typeof error.data === "string") {
          return { type: "generic", message: error.data };
        }
        if (hasMessage(error.data)) {
          return { type: "generic", message: error.data.message };
        }
        /**
         * doesn't matter what status:
         * if AWS doesn't give any details about it,
         * just show general error.
         */

        return {
          type: "generic",
          message: AWS_FETCH_FAIL,
          report: `STATUS: ${error.status} SOURCE: ${source}}`,
        };
      }
    }
  }

  /** keplr errors are generic Error */
  if (error instanceof Error) {
    if (/request rejected/i.test(error.message)) {
      return { type: "tx", message: "User rejected request" };
    }

    return {
      type: "generic",
      message: error.message,
      report: error.cause?.message || error.stack,
    };
  }

  return {
    type: "generic",
    message: GENERIC_ERROR,
    report: `STATUS:unknown SOURCE:${source}`,
  };
}

export interface EIPError extends Error {
  //applicable to both EIP1193 & EIP1474
  code: number;
  data?: unknown;
}

type BinanceError = {
  error: string;
  method: string;
};

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export function hasMessage(data?: unknown): data is { message: string } {
  return typeof data === "object" && data !== null && "message" in data;
}

export function isEIP1193Error(error: unknown): error is EIPError {
  return typeof error === "object" && error !== null && "code" in error;
}

export function isBinanceError(error: unknown): error is BinanceError {
  return typeof error === "object" && error !== null && "error" in error;
}

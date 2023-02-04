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

export function processError(error: unknown): APError {
  logger.error(error);

  if (typeof error === "string") {
    return error;
  }

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
        return { type: "tx", message: APP_TX_FAIL };

      case -32603:
        return {
          type: "tx",
          message:
            "Server can't process your transaction. Please try again later.",
        };
    }
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
      tx: error.txhash
        ? { hash: error.txhash, chainId: chainIds.terra }
        : undefined,
    };
  }

  if (error instanceof TxUnspecifiedError || error instanceof CreateTxFailed) {
    return { type: "tx", message: APP_TX_FAIL };
  }

  /** handle RTK fetch errors */
  if (isFetchBaseQueryError(error)) {
    switch (error.status) {
      case "FETCH_ERROR":
        return { type: "aws", message: APP_FETCH_FAIL };
      case "PARSING_ERROR":
        return { type: "aws", message: AWS_FETCH_FAIL };
      case "TIMEOUT_ERROR":
        return { type: "aws", message: "Timeout: Please try again later." };
      //show custom errors from queryFn
      case "CUSTOM_ERROR":
        return { type: "aws", message: error.error };

      //typeof status === number
      default: {
        if (typeof error.data === "string") {
          return { type: "aws", message: error.data };
        }
        if (hasMessage(error.data)) {
          return { type: "aws", message: error.data.message };
        }
        /**
         * doesn't matter what status:
         * if AWS doesn't give any details about it,
         * just show general error.
         */
        return { type: "aws", message: AWS_FETCH_FAIL };
      }
    }
  }

  /** keplr errors are generic Error */
  if (error instanceof Error) {
    return error.message;
  }

  return GENERIC_ERROR;
}

export interface EIPError extends Error {
  //applicable to both EIP1193 & EIP1474
  code: number;
  data?: unknown;
}

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

import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-money/wallet-provider";
import { Opener } from "contexts/ModalContext";
import Prompt, { TxPrompt } from "components/Prompt";
import { logger } from "helpers";
import { chainIds } from "constants/chains";

interface EIPError extends Error {
  //applicable to both EIP1193 & EIP1474
  code: number;
  data?: unknown;
}

const APP_TX_FAIL =
  "App failed to process your transaction. Please get in touch with support@angelprotocol.io";

function isEIP1193Error(error: unknown): error is EIPError {
  return typeof error === "object" && error !== null && "code" in error;
}

export function useErrorHandler(showModal: Opener) {
  function handleError(error: unknown | string) {
    logger.error(error);

    if (typeof error === "string") {
      return showModal(Prompt, { children: error, type: "error" });
    }

    //handle EIP errors
    if (isEIP1193Error(error)) {
      switch (error.code) {
        //https://eips.ethereum.org/EIPS/eip-1193#provider-errors
        case 4001:
          return showModal(TxPrompt, { error: "User rejected request" });

        //wallet is not connected to chain
        case 4900:
        case 4901:

        //https://eips.ethereum.org/EIPS/eip-1474#error-codes
        // EIP 1474 prior to submission
        case -32700:
        case -32600:
        case -32601:
        case -32602:
          return showModal(TxPrompt, { error: APP_TX_FAIL });

        case -32603:
          return showModal(TxPrompt, {
            error:
              "Server can't process your transaction. Please try again later.",
          });
        default:
      }
    }

    /** handle terra error */
    if (error instanceof UserDenied) {
      return showModal(TxPrompt, { error: "User rejected request" });
    }
    if (error instanceof Timeout) {
      return showModal(TxPrompt, {
        error: "Timeout: user failed to approve transaction",
      });
    }
    if (error instanceof TxFailed) {
      return showModal(TxPrompt, {
        error: "Transaction submitted but failed",
        ...(error.txhash
          ? { hash: error.txhash, chainID: chainIds.terra }
          : {}),
      });
    }

    if (
      error instanceof TxUnspecifiedError ||
      error instanceof CreateTxFailed
    ) {
      return showModal(TxPrompt, { error: APP_TX_FAIL });
    }

    if (error instanceof Error) {
      return showModal(Prompt, { children: error.message, type: "error" });
    }

    showModal(Prompt, { children: "Unknown error occured", type: "error" });
  }

  return handleError;
}

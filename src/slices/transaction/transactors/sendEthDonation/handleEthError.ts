import { errors } from "ethers";
import { StageUpdater } from "slices/transaction/types";
import { logger } from "helpers";

export default function handleEthError(error: any, handler: StageUpdater) {
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
    case errors.SERVER_ERROR:
      handler({
        step: "error",
        message: "Error connecting to server. Please try again later.",
      });
      break;
    case errors.TIMEOUT:
      handler({
        step: "error",
        message: "Transaction timed out.",
      });
      break;
    case errors.ACTION_REJECTED:
      handler({
        step: "error",
        message: "Transaction cancelled.",
      });
      break;
    default:
      handler({
        step: "error",
        message: "Unknown error occured.",
      });
  }
}

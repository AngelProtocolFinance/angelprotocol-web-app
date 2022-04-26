import { errors } from "ethers";
import { StageUpdator } from "@types-slice/transaction";

export default function handleEthError(error: any, handler: StageUpdator) {
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
    default:
      handler({
        step: "error",
        message: "Unknown error occured.",
      });
  }
  return;
}

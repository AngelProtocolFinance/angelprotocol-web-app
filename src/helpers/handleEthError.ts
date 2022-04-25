import { errors } from "ethers";
import { StageUpdator, Step } from "types/slices/transaction";

export default function handleEthError(error: any, handler: StageUpdator) {
  switch (error?.code) {
    //https://eips.ethereum.org/EIPS/eip-1193#provider-errors
    case 4001:
      handler({ step: Step.error, message: "Transaction cancelled" });
      break;
    case 4900:
    case 4901:
      handler({ step: Step.error, message: "WalletDisconnectError" });
      break;
    //https://eips.ethereum.org/EIPS/eip-1474#error-codes
    case 32603:
    case errors.SERVER_ERROR:
      handler({
        step: Step.error,
        message: "Error connecting to server. Please try again later.",
      });
      break;
    case errors.TIMEOUT:
      handler({
        step: Step.error,
        message: "Transaction timed out.",
      });
      break;
    default:
      handler({
        step: Step.error,
        message: "Unknown error occured.",
      });
  }
  return;
}

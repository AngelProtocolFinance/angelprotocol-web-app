import { errors } from "ethers";
import { ErrorHandler } from "./types";

export default function displayEthError(error: any, handler: ErrorHandler) {
  console.error(error);
  switch (error?.code) {
    //https://eips.ethereum.org/EIPS/eip-1193#provider-errors
    case 4001:
      handler("Transaction cancelled");
      break;
    case 4900:
    case 4901:
      handler("Disconnected");
      break;
    //https://eips.ethereum.org/EIPS/eip-1474#error-codes
    case 32603:
    case errors.SERVER_ERROR:
      handler("Error connecting to server. Please try again later.");
      break;
    case errors.TIMEOUT:
      handler("Transaction timed out.");
      break;
    default:
      //other errors
      handler("Unknown error occured");
  }
  return;
}

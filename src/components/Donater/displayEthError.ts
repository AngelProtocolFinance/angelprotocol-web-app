import { Opener } from "components/Nodal/types";
import { errors } from "ethers";
import ErrPop, { Props as ErrProp } from "./ErrPop";

export default function displayEthError(error: any, prompter: Opener) {
  console.error(error);
  switch (error?.code) {
    //https://eips.ethereum.org/EIPS/eip-1193#provider-errors
    case 4001:
      prompter<ErrProp>(ErrPop, { desc: "Transaction cancelled" });
      break;
    case 4900:
    case 4901:
      prompter<ErrProp>(ErrPop, { desc: "Disconnected" });
      break;
    //https://eips.ethereum.org/EIPS/eip-1474#error-codes
    case 32603:
    case errors.SERVER_ERROR:
      prompter<ErrProp>(ErrPop, {
        desc: "Error connecting to server. Please try again later.",
      });
      break;
    case errors.TIMEOUT:
      prompter<ErrProp>(ErrPop, {
        desc: "Transaction timed out.",
      });
      break;
    default:
      //other errors
      prompter<ErrProp>(ErrPop, {
        desc: "Unknown error occured",
      });
  }
  return;
}

import { Opener } from "components/Nodal/types";
import ErrPop, { Props as ErrProp } from "./ErrPop";

export default function displaySolError(error: any, prompter: Opener) {
  console.error(error);
  switch (error?.code) {
    //https://eips.ethereum.org/EIPS/eip-1193#provider-errors
    case 4001:
      prompter<ErrProp>(ErrPop, { desc: "Transaction cancelled" });
      break;
    case -32603:
      prompter<ErrProp>(ErrPop, {
        desc: "Error connecting to server. Please try again later.",
      });
      break;
    default:
      prompter<ErrProp>(ErrPop, {
        desc: "Unknown error occured",
      });
  }
  return;
}

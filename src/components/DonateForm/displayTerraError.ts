import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  UserDenied,
} from "@terra-dev/wallet-types";
import { Opener } from "components/Nodal/types";
import { Disconnected, TxResultFail } from "contracts/Errors";
import ErrPop, { Props as ErrProp } from "../Donater/ErrPop";

export default function displayTerraError(error: any, prompter: Opener) {
  if (error instanceof UserDenied) {
    prompter<ErrProp>(ErrPop, { desc: "Transaction aborted" });
  } else if (error instanceof Disconnected) {
    prompter<ErrProp>(ErrPop, { desc: "Wallet is not connected" });
  } else if (error instanceof CreateTxFailed) {
    prompter<ErrProp>(ErrPop, { desc: "Failed to create transaction" });
  } else if (error instanceof TxFailed) {
    prompter<ErrProp>(ErrPop, { desc: "Transaction failed" });
  } else if (error instanceof TxResultFail) {
    prompter<ErrProp>(ErrPop, {
      desc: "Timeout: failed to get transaction result",
      url: error.url,
    });
  } else if (error instanceof Timeout) {
    prompter<ErrProp>(ErrPop, { desc: "Transaction timeout" });
  } else if (error instanceof TxUnspecifiedError) {
    prompter<ErrProp>(ErrPop, { desc: "Uknown error occured" });
    //uknown error
  } else {
    prompter<ErrProp>(ErrPop, { desc: "Uknown error occured" });
  }
}

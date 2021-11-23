import { TimeoutError } from "@cosmjs/stargate";
import { Opener } from "components/Nodal/types";
import { denoms } from "constants/currency";
import { chains } from "contracts/types";
import ErrPop, { Props as ErrProps } from "./ErrPop";

export default function displayKeplrError(
  error: any,
  prompter: Opener,
  denom: denoms
) {
  console.error(error);
  if (error instanceof TimeoutError) {
    const url =
      denom === denoms.uatom
        ? `https://www.mintscan.io/cosmos/txs/${error.txId}`
        : `https://finder.terra.money/${chains.mainnet}/tx/${error.txId}`;
    prompter<ErrProps>(ErrPop, {
      desc: "Transaction timed out",
      url,
    });
  } else {
    prompter<ErrProps>(ErrPop, {
      desc: "Something went wrong",
    });
  }
}

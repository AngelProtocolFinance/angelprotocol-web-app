import { TimeoutError } from "@cosmjs/stargate";
import { denoms } from "constants/currency";
import { chainIDs } from "contracts/types";
import { ErrorHandler } from "./types";

export default function handleKeplrError(
  error: any,
  handler: ErrorHandler,
  denom: denoms
) {
  console.error(error);

  if (error instanceof TimeoutError) {
    const url =
      denom === denoms.uatom
        ? `https://www.mintscan.io/cosmos/txs/${error.txId}`
        : `https://finder.extraterrestrial.money/${chainIDs.mainnet}/tx/${error.txId}`;

    handler("Transaction timed out", url);
  } else {
    handler("Something wen't wrong");
  }
}

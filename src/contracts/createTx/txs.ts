import { toTuple } from "helpers";
import { TxArgs, TxType } from "types/tx";
import { erc20 } from "../evm/ERC20";

export const txs: { [T in TxType]: (args: TxArgs<T>) => string } = {
  // //// ERC20 ////
  "erc20.transfer": (transfer) =>
    erc20.encodeFunctionData("transfer", toTuple(transfer)),
  "erc20.approve": (allowance) =>
    erc20.encodeFunctionData("approve", toTuple(allowance)),
};

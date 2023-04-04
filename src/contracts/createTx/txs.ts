import { TxArgs, TxTypes } from "./types";
import { erc20 } from "contracts/evm/ERC20";
import { multisig } from "contracts/evm/multisig";
import { toTuple } from "helpers";
import { accounts } from "../evm/Account";

export const txs: { [T in TxTypes]: (args: TxArgs<T>) => string } = {
  // //// ACCOUNTS ////
  "accounts.create-endowment": (aif) =>
    accounts.encodeFunctionData("createEndowment", [toTuple(aif)]),
  "accounts.update-controller": (update) =>
    accounts.encodeFunctionData("updateEndowmentController", [toTuple(update)]),

  // //// MULTISIG ////
  "multisig.submit-transaction": (tx) =>
    multisig.encodeFunctionData("submitTransaction", toTuple(tx)),
  "multisig.add-owner": ({ address }) =>
    multisig.encodeFunctionData("addOwner", [address]),
  "multisig.confirm-tx": ({ id }) =>
    multisig.encodeFunctionData("confirmTransaction", [id]),

  // //// ERC20 ////
  "erc20.transfer": (transfer) =>
    erc20.encodeFunctionData("transfer", toTuple(transfer)),
};

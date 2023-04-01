import { TxArgs, TxTypes } from "./types";
import { addOwner, submitTransaction } from "contracts/evm/multisig";
import { toTuple } from "helpers";
import { accounts } from "../evm/Account";

export const txs: { [T in TxTypes]: (args: TxArgs<T>) => string } = {
  "accounts.create-endowment": (aif) =>
    accounts.encodeFunctionData("createEndowment", [toTuple(aif)]),
  "accounts.update-controller": (update) =>
    accounts.encodeFunctionData("updateEndowmentController", [toTuple(update)]),
  "multisig.submit-transaction": (tx) => submitTransaction.encode(tx),
  "multisig.add-owner": (newOwner) => addOwner.encode(newOwner),
};

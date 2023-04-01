import { TxArgs, TxTypes } from "./types";
import { addOwner, submitTransaction } from "contracts/evm/multisig";
import { createEndowment, updateController } from "../evm/Account";

export const txs: { [T in TxTypes]: (args: TxArgs<T>) => string } = {
  "accounts.create-endowment": (aif) => createEndowment.encode(aif),
  "accounts.update-controller": (updates) => updateController.encode(updates),
  "multisig.submit-transaction": (tx) => submitTransaction.encode(tx),
  "multisig.add-owner": (newOwner) => addOwner.encode(newOwner),
};

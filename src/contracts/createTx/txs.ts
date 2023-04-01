import { TxPayload, TxTypes } from "./types";
import { createEndowment } from "../evm/Account";

export const txs: { [T in TxTypes]: (payload: TxPayload<T>) => string } = {
  "accounts.create-endowment": (aif) => createEndowment.encode(aif),
  "accounts.update-controller": () => "",
  "multisig.submit-transaction": () => "",
  "multisig.add-owner": () => "",
};

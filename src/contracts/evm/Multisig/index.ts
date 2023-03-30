import { Interface } from "@ethersproject/abi";
import type { BigNumber } from "@ethersproject/bignumber";
import { Tupleable } from "types/evm";
import { toTuple } from "helpers";
import abi from "./abi.json";

const iface = new Interface(abi);
const getOwnersFn = iface.getFunction("getOwners");
const getConfirmationsFn = iface.getFunction("getConfirmations");
const getTransactionsIDs = iface.getFunction("getTransactionIds");

export const owners = {
  data: iface.encodeFunctionData(getOwnersFn, []),
  decode: (result: string): string[] =>
    iface.decodeFunctionResult(getOwnersFn, result)[0],
};

export const confirmations = {
  encode: (id: number) => iface.encodeFunctionData(getConfirmationsFn, [id]),
  decode: (result: string): string[] =>
    iface.decodeFunctionResult(getConfirmationsFn, result)[0],
};

interface PageOptions extends Tupleable {
  from: number;
  to: number;
  pending: boolean;
  executed: boolean;
}
export const transactionIds = {
  encode: (options: PageOptions) =>
    iface.encodeFunctionData(getTransactionsIDs, toTuple(options)),
  decode: (result: string): BigNumber[] =>
    iface.decodeFunctionResult(getTransactionsIDs, result)[0],
};

import { Interface } from "@ethersproject/abi";
import type { BigNumber } from "@ethersproject/bignumber";
import { Tupleable } from "types/evm";
import { toTuple } from "helpers";
import abi from "./abi.json";

const iface = new Interface(abi);
const ownersQuery = iface.getFunction("getOwners");
const confirmationsQuery = iface.getFunction("getConfirmations");
const transactionIDsQuery = iface.getFunction("getTransactionIds");

export const owners = {
  data: iface.encodeFunctionData(ownersQuery, []),
  decode: (result: string): string[] =>
    iface.decodeFunctionResult(ownersQuery, result)[0],
};

export const confirmations = {
  encode: (id: number) => iface.encodeFunctionData(confirmationsQuery, [id]),
  decode: (result: string): string[] =>
    iface.decodeFunctionResult(confirmationsQuery, result)[0],
};

interface PageOptions extends Tupleable {
  from: number;
  to: number;
  pending: boolean;
  executed: boolean;
}
export const transactionIds = {
  encode: (options: PageOptions) =>
    iface.encodeFunctionData(transactionIDsQuery, toTuple(options)),
  decode: (result: string): BigNumber[] =>
    iface.decodeFunctionResult(transactionIDsQuery, result)[0],
};

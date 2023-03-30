import { Interface } from "@ethersproject/abi";
import abi from "./abi.json";

const iface = new Interface(abi);
const getOwnersFn = iface.getFunction("getOwners");
const getConfirmationsFn = iface.getFunction("getConfirmations");

export const owners = {
  data: iface.encodeFunctionData(getOwnersFn, []),
  decode(result: string): string[] {
    return iface.decodeFunctionResult(getOwnersFn, result)[0];
  },
};

export const confirmations = {
  encode: (id: number) => iface.encodeFunctionData(getConfirmationsFn, [id]),
  decode(result: string): string[] {
    return iface.decodeFunctionResult(getConfirmationsFn, result)[0];
  },
};

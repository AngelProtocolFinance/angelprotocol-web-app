import { Interface } from "@ethersproject/abi";
import abi from "./abi.json";

const iface = new Interface(abi);
const getOwnersFn = iface.getFunction("getOwners");

export const owners = {
  data: iface.encodeFunctionData(getOwnersFn, []),
  decode(result: string): string[] {
    return iface.decodeFunctionResult(getOwnersFn, result)[0];
  },
};

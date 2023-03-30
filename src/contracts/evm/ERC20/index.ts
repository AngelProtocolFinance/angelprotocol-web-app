import { Interface } from "@ethersproject/abi";
import type { BigNumberish } from "@ethersproject/bignumber";
import abi from "./abi.json";

const iface = new Interface(abi);
const balanceQuery = iface.getFunction("balanceOf");
const transferFn = iface.getFunction("transfer");

export const balanceOf = {
  encode(address: string) {
    return iface.encodeFunctionData(balanceQuery, [address]);
  },
  parse(result: string) {
    const [balance] = iface.decodeFunctionResult(balanceQuery, result);

    //just convert to string, let consumer condense
    return (balance as BigNumberish).toString();
  },
};

export const transfer = {
  encode(to: string, amount: string) {
    return iface.encodeFunctionData(transferFn, [to, amount]);
  },
};

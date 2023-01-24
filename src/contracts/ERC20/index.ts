import { Interface } from "@ethersproject/abi";
import type { BigNumberish } from "@ethersproject/bignumber";
import abi from "./abi.json";

const encoder = new Interface(abi);
const balanceOfFn = encoder.getFunction("balanceOf");
const transferFn = encoder.getFunction("transfer");

export const balanceOf = {
  encode(address: string) {
    return encoder.encodeFunctionData(balanceOfFn, [address]);
  },
  parse(result: string) {
    const { balance } = encoder.decodeFunctionResult(balanceOfFn, result);

    //just convert to string, let consumer condense
    return (balance as BigNumberish).toString();
  },
};

export const transfer = {
  encode(to: string, amount: string) {
    return encoder.encodeFunctionData(transferFn, [to, amount]);
  },
};

import { Interface } from "@ethersproject/abi";
import { formatUnits } from "@ethersproject/units";
import ERC20ABI from "abi/ERC20.json";

const encoder = new Interface(ERC20ABI);
const balanceOfFn = encoder.getFunction("balanceOf");

export const balanceOf = {
  encode(address: string) {
    return encoder.encodeFunctionData(balanceOfFn, [address]);
  },
  parse(result: string) {
    const { balance } = encoder.decodeFunctionResult(balanceOfFn, result);
    //just convert from hex to string number, let consumer condense
    return formatUnits(balance, 0);
  },
};

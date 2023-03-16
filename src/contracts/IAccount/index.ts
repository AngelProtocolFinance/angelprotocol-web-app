import { Interface } from "@ethersproject/abi";
import { NewAIF } from "types/polygon/account";
import abi from "./abi.json";

const encoder = new Interface(abi);
const createEndowmentFn = encoder.getFunction("createEndowment");

export const createEndowment = {
  encode(aif: NewAIF) {
    return encoder.encodeFunctionData(createEndowmentFn, [aif]);
  },
  parse(result: string) {
    const decoded = encoder.decodeFunctionResult(createEndowmentFn, result);
    console.log(decoded);
    //just convert to string, let consumer condense
    // return (balance as BigNumberish).toString();
  },
};

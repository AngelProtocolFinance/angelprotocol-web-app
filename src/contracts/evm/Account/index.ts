import { Interface } from "@ethersproject/abi";
import { Tuple } from "types/evm";
import abi from "./abi.json";

const encoder = new Interface(abi);
//FUTURE: append abi with new methods
const createEndowmentFn = encoder.getFunction("createEndowment");

export const createEndowment = {
  encode(aif: Tuple) {
    return encoder.encodeFunctionData(createEndowmentFn, [aif]);
  },
  parse(result: string) {
    const decoded = encoder.decodeFunctionResult(createEndowmentFn, result);
    console.log(decoded);
  },
};

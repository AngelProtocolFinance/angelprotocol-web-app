import { Interface } from "@ethersproject/abi";
import abi from "./abi.json";

const encoder = new Interface(abi);
const createEndowmentFn = encoder.getFunction("createEndowment");

export const createEndowment = {
  encode(aif: any[]) {
    return encoder.encodeFunctionData(createEndowmentFn, [aif]);
  },
  parse(result: string) {
    const decoded = encoder.decodeFunctionResult(createEndowmentFn, result);
    console.log(decoded);
  },
};

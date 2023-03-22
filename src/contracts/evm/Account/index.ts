import { Interface } from "@ethersproject/abi";
import { NewAIF } from "types/contracts/evm";
import { toTuple } from "helpers";
import abi from "./abi.json";

const encoder = new Interface(abi);
//FUTURE: append abi with new methods
const createEndowmentFn = encoder.getFunction("createEndowment");
export const endowmentCreatedTopic = encoder.getEventTopic("EndowmentCreated");

export const createEndowment = {
  encode(aif: NewAIF) {
    return encoder.encodeFunctionData(createEndowmentFn, [toTuple(aif)]);
  },
  parse(result: string) {
    const decoded = encoder.decodeFunctionResult(createEndowmentFn, result);
    console.log(decoded);
  },
};

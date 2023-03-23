import { Interface } from "@ethersproject/abi";
import { NewAIF } from "types/contracts/evm";
import { toTuple } from "helpers";
import abi from "./abi.json";

const iface = new Interface(abi);
//FUTURE: append abi with new methods
const createEndowmentFn = iface.getFunction("createEndowment");
export const endowmentCreatedTopic = iface.encodeFilterTopics(
  "EndowmentCreated",
  []
);

export const createEndowment = {
  encode(aif: NewAIF) {
    return iface.encodeFunctionData(createEndowmentFn, [toTuple(aif)]);
  },
};

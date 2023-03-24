import { Interface } from "@ethersproject/abi";
import type { BigNumber } from "@ethersproject/bignumber";
import { NewAIF } from "types/contracts/evm";
import { TxLog } from "types/evm";
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
  log(logs: TxLog[]) {
    const topic = iface.getEventTopic("EndowmentCreated");
    const log = logs.find((log) => log.topics.includes(topic));
    if (!log) return null;
    const [id] = iface.decodeEventLog("EndowmentCreated", log.data, log.topics);
    return (id as BigNumber).toString();
  },
};

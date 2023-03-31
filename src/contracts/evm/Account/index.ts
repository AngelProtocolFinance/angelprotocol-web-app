import { Interface } from "@ethersproject/abi";
import type { BigNumber } from "@ethersproject/bignumber";
import {
  DecodedEndowment,
  DecodedEndowmentState,
} from "services/juno/queryContract/decoded-types";
import { NewAIF } from "types/contracts/evm";
import { TxLog } from "types/evm";
import { toTuple } from "helpers";
import abi from "./abi";

const iface = new Interface(abi);
//FUTURE: append abi with new methods

// ///// EVENTS /////
const endowmentCreatedEvent = iface.getEvent("EndowmentCreated");

// ////// METHODS /////
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
    const topic = iface.getEventTopic(endowmentCreatedEvent);
    const log = logs.find((log) => log.topics.includes(topic));
    if (!log) return null;
    const [id] = iface.decodeEventLog(
      endowmentCreatedEvent,
      log.data,
      log.topics
    );
    return (id as BigNumber).toString();
  },
};

// ////// QUERIES /////
const endowDetailsQuery = iface.getFunction("queryEndowmentDetails");
export const endowmentDetails = {
  encode(id: number) {
    return iface.encodeFunctionData(endowDetailsQuery, [id]);
  },
  decode(result: string): DecodedEndowment {
    return iface.decodeFunctionResult(endowDetailsQuery, result)[0];
  },
};

const endowStateQuery = iface.getFunction("queryState");
export const endowState = {
  encode(id: number) {
    return iface.encodeFunctionData(endowStateQuery, [id]);
  },
  decode(result: string): DecodedEndowmentState {
    return iface.decodeFunctionResult(endowStateQuery, result)[0];
  },
};

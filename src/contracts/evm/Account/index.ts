import { Interface } from "@ethersproject/abi";
import type { BigNumber } from "@ethersproject/bignumber";
import {
  EndowmentResponse,
  StateResponse,
} from "services/contract/queryContract/decoded-types";
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
const endowDetailsFn = iface.getFunction("queryEndowmentDetails");
export const endowmentDetails = {
  encode(id: number) {
    return iface.encodeFunctionData(endowDetailsFn, [id]);
  },
  decode(result: string): EndowmentResponse {
    return iface.decodeFunctionResult(endowDetailsFn, result)[0];
  },
};

const endowStateFn = iface.getFunction("queryState");
export const endowState = {
  encode(id: number) {
    return iface.encodeFunctionData(endowStateFn, [id]);
  },
  decode(result: string): StateResponse {
    return iface.decodeFunctionResult(endowStateFn, result)[0];
  },
};

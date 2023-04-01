import { Interface } from "@ethersproject/abi";
import type { BigNumber } from "@ethersproject/bignumber";
import {
  DecodedEndowment,
  DecodedEndowmentState,
} from "services/juno/queryContract/decoded-types";
import { SettingsControllerUpdate } from "types/contracts";
import { NewAIF } from "types/contracts/evm";
import { TxLog } from "types/evm";
import { toTuple } from "helpers";
import { abi } from "./abi";

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
  encode: (aif: NewAIF) =>
    iface.encodeFunctionData(createEndowmentFn, [toTuple(aif)]),
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

export const updateController = {
  encode: (update: SettingsControllerUpdate) =>
    iface.encodeFunctionData("updateEndowmentController", [toTuple(update)]),
};

// ////// QUERIES /////
const endowDetailsQuery = iface.getFunction("queryEndowmentDetails");
export const endowmentDetails = {
  encode: (id: number) => iface.encodeFunctionData(endowDetailsQuery, [id]),
  decode: (result: string): DecodedEndowment =>
    iface.decodeFunctionResult(endowDetailsQuery, result)[0],
};

const endowStateQuery = iface.getFunction("queryState");
export const endowState = {
  encode: (id: number) => iface.encodeFunctionData(endowStateQuery, [id]),
  decode(result: string): DecodedEndowmentState {
    return iface.decodeFunctionResult(endowStateQuery, result)[0];
  },
};

import { Interface } from "@ethersproject/abi";
import { TxLog } from "types/evm";
import abi from "./abi.json";

const iface = new Interface(abi);

const confirmTransactionFn = iface.getFunction("confirmTransaction");
const executeTransactionFn = iface.getFunction("executeTransaction");
const revokeTransactionFn = iface.getFunction("revokeTransaction");

export const executionTopic = iface.encodeFilterTopics("Execution", []);
export const executionFailureTopic = iface.encodeFilterTopics(
  "ExecutionFailure",
  []
);

export const confirmTransaction = {
  encode(transactionId: number) {
    return iface.encodeFunctionData(confirmTransactionFn, [transactionId]);
  },
};

export const executeTransaction = {
  encode(transactionId: number) {
    return iface.encodeFunctionData(executeTransactionFn, [transactionId]);
  },
  processLogs(logs: TxLog[]) {
    const execTopic = iface.getEventTopic("Execution");
    const execLog = logs.find((log) => log.topics.includes(execTopic));
    if (!!execLog) {
      return "execution";
    }
    const execFailTopic = iface.getEventTopic("ExecutionFailure");
    const execFailLog = logs.find((log) => log.topics.includes(execFailTopic));
    if (!!execFailLog) {
      throw new Error("ExecutionFailure");
    }

    throw new Error("Not enough confirmations");
  },
};

export const revokeTransaction = {
  encode(transactionId: number) {
    return iface.encodeFunctionData(revokeTransactionFn, [transactionId]);
  },
};

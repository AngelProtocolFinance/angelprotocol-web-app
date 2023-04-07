import { Interface } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { TxLog } from "types/evm";
import abi from "./abi.json";

const iface = new Interface(abi);

const confirmTransactionFn = iface.getFunction("confirmTransaction");
const executeTransactionFn = iface.getFunction("executeTransaction");

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

    if (!execLog) {
      return null;
    }

    const [id] = iface.decodeEventLog(
      "Execution",
      execLog.data,
      execLog.topics
    );
    return (id as BigNumber).toString();
  },
};

import { Interface } from "@ethersproject/abi";
import type { BigNumber } from "@ethersproject/bignumber";
import { TxLog } from "types/evm";
import abi from "./abi.json";

const iface = new Interface(abi);
const submitTransactionFn = iface.getFunction("submitTransaction");
export const confirmationTopic = iface.encodeFilterTopics("Confirmation", []);

export const submitTransaction = {
  encode(
    title: string,
    description: string,
    targetAddress: string,
    value: number,
    data: string
  ) {
    return iface.encodeFunctionData(submitTransactionFn, [
      title,
      description,
      targetAddress,
      value,
      data,
    ]);
  },
  log(logs: TxLog[]) {
    const topic = iface.getEventTopic("Confirmation");
    const log = logs.find((log) => log.topics.includes(topic));
    if (!log) return null;
    const [, txId] = iface.decodeEventLog("Confirmation", log.data, log.topics);
    return (txId as BigNumber).toString();
  },
};

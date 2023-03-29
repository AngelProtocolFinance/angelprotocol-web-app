import { Interface } from "@ethersproject/abi";
import type { BigNumber } from "@ethersproject/bignumber";
import { TxLog } from "types/evm";
import abi from "./abi.json";

const iface = new Interface(abi);
//FUTURE: append abi with new methods
const proposeFn = iface.getFunction("propose");
export const lockedWithdrawInitiatedTopic = iface.encodeFilterTopics(
  "LockedWithdrawInitiated",
  []
);

export const propose = {
  encode(
    endowId: number,
    beneficiary: string,
    tokenAddresses: string[],
    amounts: number[]
  ) {
    return iface.encodeFunctionData(proposeFn, [
      endowId,
      beneficiary,
      tokenAddresses,
      amounts,
    ]);
  },
  log(logs: TxLog[]) {
    const topic = iface.getEventTopic("LockedWithdrawInitiated");
    const log = logs.find((log) => log.topics.includes(topic));
    if (!log) return null;
    const [id] = iface.decodeEventLog(
      "LockedWithdrawInitiated",
      log.data,
      log.topics
    );
    return (id as BigNumber).toString();
  },
};

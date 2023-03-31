import { Interface } from "@ethersproject/abi";
import abi from "./abi.json";

const iface = new Interface(abi);

const confirmTransactionFn = iface.getFunction("confirmTransaction");

export const confirmationTopic = iface.encodeFilterTopics("Confirmation", []);

export const confirmTransaction = {
  encode(transactionId: number) {
    return iface.encodeFunctionData(confirmTransactionFn, [transactionId]);
  },
};

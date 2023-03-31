import { Interface } from "@ethersproject/abi";
import abi from "./abi.json";

const iface = new Interface(abi);

const confirmTransactionFn = iface.getFunction("confirmTransaction");
const revokeTransactionFn = iface.getFunction("revokeTransaction");

export const confirmationTopic = iface.encodeFilterTopics("Confirmation", []);
export const revocationTopic = iface.encodeFilterTopics("Revocation", []);

export const confirmTransaction = {
  encode(transactionId: number) {
    return iface.encodeFunctionData(confirmTransactionFn, [transactionId]);
  },
};

export const revokeTransaction = {
  encode(transactionId: number) {
    return iface.encodeFunctionData(revokeTransactionFn, [transactionId]);
  },
};

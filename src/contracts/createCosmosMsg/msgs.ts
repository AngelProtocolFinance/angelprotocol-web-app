import { objToBase64 } from "helpers";
import type { MsgSendType, MsgTypes, TxArgs } from "./types";

export const msgs: {
  [T in Exclude<MsgTypes, MsgSendType>]: (args: TxArgs<T>) => object;
} = {
  "cw20.transfer": (args) => ({
    transfer: args,
  }),
  "cw20.send": ({ amount, contract, msg }) => ({
    amount,
    contract,
    msg: objToBase64(msg),
  }),
};

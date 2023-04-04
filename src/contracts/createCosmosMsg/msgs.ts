import { MsgSendType, MsgTypes, TxArgs } from "./types";
import { toBase64 } from "helpers";

export const msgs: {
  [T in Exclude<MsgTypes, MsgSendType>]: (args: TxArgs<T>) => object;
} = {
  "cw20.transfer": (args) => ({
    transfer: args,
  }),
  "cw20.send": ({ amount, contract, msg }) => ({
    amount,
    contract,
    msg: toBase64(msg),
  }),
};

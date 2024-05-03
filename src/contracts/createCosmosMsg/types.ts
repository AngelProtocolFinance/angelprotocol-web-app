import type { Coin } from "types/cosmos";

type NativeTransfer = {
  amount: string;
  denom: string;
};

type CW20Send = {
  amount: string;
  contract: string;
  msg: object;
};

type Msg<T> = {
  args: T;
  funds?: Coin[];
};

const _msg_send = "recipient.send" as const;
export type MsgSendType = typeof _msg_send;

type Msgs = {
  [_msg_send]: Msg<NativeTransfer>;
  "cw20.transfer": Msg<{ amount: string; recipient: string }>;
  "cw20.send": Msg<CW20Send>;
};

export type MsgTypes = keyof Msgs;
export type TxArgs<T extends MsgTypes> = Msgs[T]["args"];

export type MsgOptions<T extends MsgTypes> = T extends `${infer C}.${string}`
  ? //for juno no hardcoded-contracts
    { [key in C]: string } & Msgs[T]["args"]
  : Msgs[T]["args"];

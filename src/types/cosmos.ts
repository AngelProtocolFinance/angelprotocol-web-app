import type { Keplr, StdSignature } from "@keplr-wallet/types";

type RequiredDoc = Required<Parameters<Keplr["signDirect"]>[2]>;
export type SignDoc = {
  [K in keyof RequiredDoc]: Exclude<RequiredDoc[K], null>;
};

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export type WCSignature = StdSignature;

export type WCSignAminoRes = {
  signature: WCSignature;
  // signDoc: no need, just return the same doc for broadcasting
};

export type WCSignDirectRes = {
  signature: WCSignature;
  //signDoc - no need, just return the same doc for broadcasting
};

interface Attribute {
  readonly key: string;
  readonly value: string;
}
interface Event {
  readonly type: string;
  readonly attributes: readonly Attribute[];
}
export interface Log {
  readonly msg_index: number;
  readonly log: string;
  readonly events: readonly Event[];
}
export type TxResponse = {
  txhash: string;
  code: number;
  logs: Log[];
  raw_log: string;
};
type BroadcastError = {
  code: number;
  message: string;
  details: unknown[];
};
export type BroadcastSuccess = { tx_response: TxResponse };

export type BroadcastRes = BroadcastSuccess | BroadcastError;

export type SimulateRes = {
  gas_info: {
    gas_wanted: string;
    gas_used: string;
  };
};

export type JSONAny<T> = {
  "@type": string;
} & T;

export type JSONAccount = JSONAny<{
  account_number: string;
  //address:string
  pub_key: JSONAny<{ key: string }>;
  sequence: string;
}>;

export function isBroadcastError(res: BroadcastRes): res is BroadcastError {
  return !(res as BroadcastSuccess).tx_response;
}

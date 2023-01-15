import type { Keplr } from "@keplr-wallet/types";

// from type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
export type { Coin } from "@keplr-wallet/proto-types/cosmos/base/v1beta1/coin";

export type SignDoc = Parameters<Keplr["signDirect"]>[2];

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

export type BroadcastResponse = {
  tx_response: TxResponse;
};

export type SimulateRes = {
  gas_info: {
    gas_wanted: string;
    gas_used: string;
  };
};

type JSONAny<T> = {
  "@type": string;
} & T;

export type JSONAccount = JSONAny<{
  account_number: string;
  //address:string
  pub_key: JSONAny<{ key: string }>;
  sequence: string;
}>;

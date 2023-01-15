// from type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
export type Msg<T> = { typeUrl: string; value: T };

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

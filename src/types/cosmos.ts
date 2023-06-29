import type { Keplr, StdSignature } from "@keplr-wallet/types";

type RequiredDoc = Required<Parameters<Keplr["signDirect"]>[2]>;
export type SignDoc = {
  [K in keyof RequiredDoc]: Exclude<RequiredDoc[K], null>;
};

export type WCSignature = StdSignature;

export type WCSignAminoRes = {
  signature: WCSignature;
  // signDoc: no need, just return the same doc for broadcasting
};

export type WCSignDirectRes = {
  signature: WCSignature;
  //signDoc - no need, just return the same doc for broadcasting
};

export type KeplrWC = Pick<Keplr, "signAmino" | "signDirect">;

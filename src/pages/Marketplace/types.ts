import { chainIds, chains } from "constants/chains";

export const typeURLs = {
  //derived from cosmjs-types directory
  executeContract: "/cosmwasm.wasm.v1.MsgExecuteContract",
  authInfo: "/cosmos.tx.v1beta1.AuthInfo",
  pubKey: "/cosmos.crypto.secp256k1.PubKey",
  //included by default in registry
  txbody: "/cosmos.tx.v1beta1.TxBody",
  sendNative: "/cosmos.bank.v1beta1.MsgSend",
} as const;

export const JUNO_LCD = chains[chainIds.juno].lcd;

type JSONAny<T> = {
  "@type": string;
} & T;

export type JSONAccount = JSONAny<{
  // account_number:string
  //address:string
  pub_key: JSONAny<{ key: string }>;
  sequence: string;
}>;

export function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return window.btoa(bin.join(""));
}

export function bytesFromBase64(b64: string): Uint8Array {
  const bin = window.atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

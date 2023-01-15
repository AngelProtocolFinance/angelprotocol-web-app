export const typeURLs = {
  /**
   * derived from proto-types path
   * sample: import { MsgExecuteContract } from "@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx
   * /cosmwasm/wasm/v1/tx -> /cosmwasm.wasm.v1.MsgExecuteContract (from tx file)
   */
  executeContract: "/cosmwasm.wasm.v1.MsgExecuteContract",
  sendNative: "/cosmos.bank.v1beta1.MsgSend",
} as const;

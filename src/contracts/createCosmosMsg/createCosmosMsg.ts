import { toUtf8 } from "@cosmjs/encoding";
import { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx";
import { MsgExecuteContract } from "@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx";
import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { msgs } from "./msgs";
import type { MsgOptions, MsgSendType, MsgTypes } from "./types";

export default function createCosmosMsg<T extends MsgTypes>(
  sender: string,
  type: T,
  options: MsgOptions<T>
): Any {
  if (type === "recipient.send") {
    const opts = options as MsgOptions<MsgSendType>;
    return {
      typeUrl: typeURLs.sendNative,
      value: MsgSend.encode({
        fromAddress: sender,
        toAddress: opts.recipient,
        amount: [
          {
            denom: opts.denom,
            amount: opts.amount,
          },
        ],
      }).finish(),
    };
  }

  const [contractKey] = type.split(".");
  const { [contractKey]: contract, funds, ...args } = options as any;
  const content = msgs[type as Exclude<MsgTypes, MsgSendType>](args);

  return {
    typeUrl: typeURLs.executeContract,
    value: MsgExecuteContract.encode({
      contract: contract,
      sender,
      msg: toUtf8(JSON.stringify(content)),
      funds,
    }).finish(),
  };
}

const typeURLs = {
  /**
   * derived from proto-types path
   * sample: import { MsgExecuteContract } from "@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx
   * /cosmwasm/wasm/v1/tx -> /cosmwasm.wasm.v1.MsgExecuteContract (from tx file)
   */
  executeContract: "/cosmwasm.wasm.v1.MsgExecuteContract",
  sendNative: "/cosmos.bank.v1beta1.MsgSend",
} as const;

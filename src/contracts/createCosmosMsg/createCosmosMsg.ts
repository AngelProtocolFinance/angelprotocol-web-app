import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { toUtf8 } from "@cosmjs/encoding";
import { MsgSendEncodeObject } from "@cosmjs/stargate";
import {
  EmbeddedBankMsg,
  EmbeddedWasmMsg,
  MsgOptions,
  MsgSendType,
  MsgTypes,
} from "./types";
import { toBase64 } from "helpers";
import { msgs } from "./msgs";

export default function createCosmosMsg<T extends MsgTypes>(
  sender: string,
  type: T,
  options: MsgOptions<T>
): MsgSendEncodeObject | MsgExecuteContractEncodeObject {
  if (type === "recipient.send") {
    const opts = options as MsgOptions<MsgSendType>;
    return {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: sender,
        toAddress: opts.recipient,
        amount: [
          {
            denom: opts.denom,
            amount: opts.amount,
          },
        ],
      },
    };
  }

  const [contractKey] = type.split(".");
  const { [contractKey]: contract, funds, ...args } = options as any;
  const content = msgs[type as Exclude<MsgTypes, MsgSendType>](args);

  return {
    typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
    value: {
      contract: contract,
      sender: sender,
      msg: toUtf8(JSON.stringify(content)),
      funds,
    },
  };
}

export function embedMsg<T extends MsgTypes>(
  type: T,
  options: MsgOptions<T>
): EmbeddedBankMsg | EmbeddedWasmMsg {
  if (type === "recipient.send") {
    const opts = options as MsgOptions<MsgSendType>;
    return {
      bank: {
        send: {
          to_address: opts.recipient,
          amount: [{ denom: opts.denom, amount: opts.amount }],
        },
      },
    };
  }

  const [key] = type.split(".");
  const { [key]: to, funds, ...args } = options as any;
  const content = msgs[type as Exclude<MsgTypes, MsgSendType>](args);

  return {
    wasm: {
      execute: {
        contract_addr: to,
        funds,
        msg: toBase64(content),
      },
    },
  };
}

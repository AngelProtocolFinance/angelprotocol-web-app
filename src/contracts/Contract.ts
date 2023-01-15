import type { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx";
import type { MsgExecuteContract } from "@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/contracts";
import { Coin, Msg } from "types/cosmos";
import { CosmosWallet } from "contexts/WalletContext";
import { toBase64, toU8a } from "helpers";
import { typeURLs } from "constants/cosmos";
import { junoDenom } from "constants/tokens";

export default class Contract {
  wallet: CosmosWallet;

  constructor(wallet: CosmosWallet) {
    this.wallet = wallet;
  }
  //for on-demand query, use RTK where possible
  async query<T>(to: string, message: Record<string, unknown>) {
    const jsonObject = await this.wallet.client.queryContractSmart(to, message);
    return JSON.parse(jsonObject) as T;
  }

  createExecuteContractMsg(
    to: string,
    msg: object,
    funds: Coin[] = []
  ): Msg<MsgExecuteContract> {
    return {
      typeUrl: typeURLs.executeContract,
      value: {
        contract: to,
        sender: this.wallet.address,
        msg: toU8a(JSON.stringify(msg)),
        funds,
      },
    };
  }

  createTransferNativeMsg(
    scaledAmount: string,
    recipient: string,
    denom = junoDenom as string
  ): Msg<MsgSend> {
    return {
      typeUrl: typeURLs.sendNative,
      value: {
        fromAddress: this.wallet.address,
        toAddress: recipient,
        amount: [
          {
            denom,
            amount: scaledAmount,
          },
        ],
      },
    };
  }

  createEmbeddedWasmMsg(
    to: string,
    msg: object,
    funds: Coin[] = []
  ): EmbeddedWasmMsg {
    return {
      wasm: {
        execute: {
          contract_addr: to,
          funds,
          msg: toBase64(msg),
        },
      },
    };
  }

  createEmbeddedBankMsg(funds: Coin[], to: string): EmbeddedBankMsg {
    return {
      bank: {
        send: {
          to_address: to,
          amount: funds,
        },
      },
    };
  }
}

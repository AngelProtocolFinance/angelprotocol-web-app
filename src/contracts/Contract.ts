import { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx";
import { MsgExecuteContract } from "@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx";
import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/contracts";
import { Coin } from "types/cosmos";
import { CosmosWallet } from "contexts/WalletContext";
import { toBase64, toU8a } from "helpers";
import { Chain, chains } from "constants/chains";
import { typeURLs } from "constants/cosmos";
import { junoDenom } from "constants/tokens";

export default class Contract {
  wallet: CosmosWallet;
  chain: Chain;

  constructor(wallet: CosmosWallet) {
    this.wallet = wallet;
    this.chain = chains[wallet.chainId];
  }

  createExecuteContractMsg(to: string, msg: object, funds: Coin[] = []): Any {
    return {
      typeUrl: typeURLs.executeContract,
      value: MsgExecuteContract.encode({
        contract: to,
        sender: this.wallet.address,
        msg: toU8a(JSON.stringify(msg)),
        funds,
      }).finish(),
    };
  }

  createTransferNativeMsg(
    scaledAmount: string,
    recipient: string,
    denom = junoDenom as string
  ): Any {
    return {
      typeUrl: typeURLs.sendNative,
      value: MsgSend.encode({
        fromAddress: this.wallet.address,
        toAddress: recipient,
        amount: [
          {
            denom,
            amount: scaledAmount,
          },
        ],
      }).finish(),
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

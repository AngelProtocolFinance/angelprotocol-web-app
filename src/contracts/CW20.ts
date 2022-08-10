import { Coin } from "@cosmjs/proto-signing";
import { ContractQueryArgs } from "services/types";
import { EmbeddedBankMsg } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { scaleToStr, toBase64 } from "helpers";
import Contract from "./Contract";

export default class CW20 extends Contract {
  balance: (address: string) => ContractQueryArgs;
  info: ContractQueryArgs;

  constructor(wallet: WalletState | undefined, cw20ContractAddr: string) {
    super(wallet, cw20ContractAddr);

    this.info = {
      address: this.contractAddress,
      msg: {
        token_info: {},
      },
    };

    this.balance = (address) => ({
      address: this.contractAddress,
      msg: { balance: { address } },
    });
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

  createEmbeddedTransferMsg(amount: number, recipient: string) {
    return this.createEmbeddedWasmMsg([], {
      transfer: {
        //convert to uamount
        amount: scaleToStr(amount),
        recipient,
      },
    });
  }

  createTransferMsg(amount: number, recipient: string) {
    return this.createExecuteContractMsg({
      transfer: {
        //convert to uamount
        amount: scaleToStr(amount),
        recipient,
      },
    });
  }

  createSendMsg(
    amount: number | string,
    msgReceiverAddr: string,
    msg: object //base64 encoded msg
  ) {
    return this.createExecuteContractMsg({
      send: {
        //convert to uamount
        amount: scaleToStr(amount),
        contract: msgReceiverAddr,
        msg: toBase64(msg),
      },
    });
  }
}

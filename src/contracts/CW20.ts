import { CosmosWallet } from "contexts/Wallet";
import { scaleToStr, toBase64 } from "helpers";
import Contract from "./Contract";

export default class CW20 extends Contract {
  address: string;

  constructor(wallet: CosmosWallet, address: string) {
    super(wallet);
    this.address = address;
  }

  createEmbeddedTransferMsg(scaledAmount: string, recipient: string) {
    return this.createEmbeddedWasmMsg(this.address, {
      transfer: {
        amount: scaledAmount,
        recipient,
      },
    });
  }

  createTransferMsg(scaledAmount: string, recipient: string) {
    return this.createExecuteContractMsg(this.address, {
      transfer: {
        amount: scaledAmount,
        recipient,
      },
    });
  }

  createSendMsg(
    amount: number | string,
    msgReceiverAddr: string,
    msg: object //base64 encoded msg
  ) {
    return this.createExecuteContractMsg(this.address, {
      send: {
        //convert to uamount
        amount: scaleToStr(amount),
        contract: msgReceiverAddr,
        msg: toBase64(msg),
      },
    });
  }
}

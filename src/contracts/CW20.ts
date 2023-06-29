import { WalletState } from "contexts/WalletContext";
import { objToBase64, scaleToStr } from "helpers";
import Contract from "./Contract";

export default class CW20 extends Contract {
  address: string;

  constructor(wallet: WalletState | undefined, address: string) {
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
        msg: objToBase64(msg),
      },
    });
  }
}

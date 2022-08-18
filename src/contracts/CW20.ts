import { WalletState } from "contexts/WalletContext/WalletContext";
import { scaleToStr, toBase64 } from "helpers";
import Contract from "./Contract";

export default class CW20 extends Contract {
  address: string;

  constructor(wallet: WalletState | undefined, address: string) {
    super(wallet);
    this.address = address;
  }

  createEmbeddedTransferMsg(amount: number, recipient: string) {
    return this.createEmbeddedWasmMsg(this.address, {
      transfer: {
        //convert to uamount
        amount: scaleToStr(amount),
        recipient,
      },
    });
  }

  createTransferMsg(amount: number, recipient: string) {
    return this.createExecuteContractMsg(this.address, {
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

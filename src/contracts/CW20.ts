import { VerifiedChain } from "contexts/ChainGuard";
import { scaleToStr, toBase64 } from "helpers";
import Contract from "./Contract";

export default class CW20 extends Contract {
  address: string;

  constructor(chain: VerifiedChain, address: string) {
    super(chain);
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

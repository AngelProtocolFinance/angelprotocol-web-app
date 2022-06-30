import { MsgExecuteContract } from "@terra-money/terra.js";
import { ContractQueryArgs } from "services/types";
import { scaleAmount } from "helpers/amountFormatters";
import toBase64 from "helpers/toBase64";
import Contract from "./Contract";

export default class CW20 extends Contract {
  cw20ContractAddr: string;
  balance: (address: string) => ContractQueryArgs;
  info: ContractQueryArgs;

  constructor(cw20ContractAddr: string, walletAddr?: string) {
    super(walletAddr);
    this.cw20ContractAddr = cw20ContractAddr;

    this.info = {
      address: this.cw20ContractAddr,
      msg: {
        token_info: {},
      },
    };

    this.balance = (address) => ({
      address: this.cw20ContractAddr,
      msg: { balance: { address } },
    });
  }

  createEmbeddedTransferMsg(amount: number, recipient: string) {
    return this.createEmbeddedWasmMsg([], this.cw20ContractAddr, {
      transfer: {
        //convert to uamount
        amount: scaleAmount(amount),
        recipient,
      },
    });
  }

  createTransferMsg(amount: number, recipient: string) {
    return new MsgExecuteContract(this.walletAddr, this.cw20ContractAddr, {
      transfer: {
        //convert to uamount
        amount: scaleAmount(amount),
        recipient,
      },
    });
  }

  createSendMsg(
    amount: number | string,
    msgReceiverAddr: string,
    msg: object //base64 encoded msg
  ) {
    return this.createContractMsg(this.walletAddr!, this.cw20ContractAddr, {
      send: {
        //convert to uamount
        amount: scaleAmount(amount),
        contract: msgReceiverAddr,
        msg: toBase64(msg),
      },
    });
  }
}

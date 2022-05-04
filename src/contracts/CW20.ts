import { Dec, MsgExecuteContract } from "@terra-money/terra.js";
import { ContractQueryArgs } from "services/terra/types";
import { WalletProxy } from "providers/WalletProvider";
import Contract from "./Contract";

// import { denoms } from "constants/currency";

export default class CW20 extends Contract {
  cw20ContractAddr: string;
  balance: (address: string) => ContractQueryArgs;
  info: ContractQueryArgs;

  constructor(cw20ContractAddr: string, wallet?: WalletProxy) {
    super(wallet);
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
    return this.createdEmbeddedWasmMsg([], this.cw20ContractAddr, {
      transfer: {
        //convert to uamount
        amount: new Dec(amount).mul(1e6).toInt().toString(),
        recipient,
      },
    });
  }

  createSendMsg(
    amount: number | string,
    msgReceiverAddr: string,
    msg: object //base64 encoded msg
  ): MsgExecuteContract {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.cw20ContractAddr, {
      send: {
        //convert to uamount
        amount: new Dec(amount).mul(1e6).toInt().toString(),
        contract: msgReceiverAddr,
        msg: btoa(JSON.stringify(msg)),
      },
    });
  }
}

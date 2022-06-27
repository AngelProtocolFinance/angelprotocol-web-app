import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { ContractQueryArgs } from "services/types";
import { EmbeddedBankMsg } from "types/server/contracts";
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

  createEmbeddedBankMsg(funds: Coin.Data[], to: string): EmbeddedBankMsg {
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
    return this.createdEmbeddedWasmMsg([], this.cw20ContractAddr, {
      transfer: {
        //convert to uamount
        amount: new Decimal(amount).mul(1e6).divToInt(1).toString(),
        recipient,
      },
    });
  }

  createTransferMsg(amount: number, recipient: string) {
    return new MsgExecuteContract(this.walletAddr!, this.cw20ContractAddr, {
      transfer: {
        //convert to uamount
        amount: new Decimal(amount).mul(1e6).divToInt(1).toString(),
        recipient,
      },
    });
  }

  createSendMsg(
    amount: number | string,
    msgReceiverAddr: string,
    msg: object //base64 encoded msg
  ): MsgExecuteContract {
    return new MsgExecuteContract(this.walletAddr!, this.cw20ContractAddr, {
      send: {
        //convert to uamount
        amount: new Decimal(amount).mul(1e6).divToInt(1).toString(),
        contract: msgReceiverAddr,
        msg: toBase64(msg),
      },
    });
  }
}

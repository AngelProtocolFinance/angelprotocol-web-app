import { Coin, Dec, MsgExecuteContract } from "@terra-money/terra.js";
import { contracts } from "constants/contracts";
import { denoms } from "constants/currency";
import { sc } from "constants/sc";
import { WalletProxy } from "providers/WalletProvider";
import Contract from "./Contract";

export default class Indexfund extends Contract {
  fund_id?: number;
  address: string;
  //contract address
  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet?: WalletProxy, fund_id?: number) {
    super(wallet);
    this.fund_id = fund_id;
    this.address = contracts[this.chainID][sc.index_fund];
  }

  async createDepositMsg(UST_amount: number | string, splitToLiquid?: number) {
    this.checkWallet(); //throws error when no wallet
    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    return new MsgExecuteContract(
      this.walletAddr!,
      this.address,
      {
        deposit: {
          fund_id: this.fund_id,
          split: `${splitToLiquid}`,
        },
      },
      [new Coin(denoms.uusd, micro_UST_Amount)]
    );
  }
}

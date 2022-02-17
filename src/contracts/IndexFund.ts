import {
  Coin,
  CreateTxOptions,
  Dec,
  MsgExecuteContract,

  // StdFee,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { denoms } from "constants/currency";
import { sc } from "constants/sc";
import Contract from "./Contract";
import { Donors } from "./types";

export default class Indexfund extends Contract {
  fund_id?: number;
  address: string;
  //contract address
  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet?: ConnectedWallet, fund_id?: number) {
    super(wallet);
    this.fund_id = fund_id;
    this.address = contracts[this.chainID][sc.index_fund];
  }

  async getFundDonations() {
    return await this.query<Donors>(this.address, {
      active_fund_donations: {},
    });
  }

  async createDepositTx(
    UST_amount: number | string,
    splitToLiquid?: number
  ): Promise<CreateTxOptions> {
    this.checkWallet(); //throws error when no wallet
    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    const depositMsg = new MsgExecuteContract(
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
    const fee = await this.estimateFee([depositMsg]);
    // const fee = new StdFee(2500000, [new Coin(Denoms.UUSD, 1.5e6)]);
    return { msgs: [depositMsg], fee };
  }

  //will add more transactions in the future
}

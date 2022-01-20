import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import { BalanceData, Holdings, sc, Swap } from "./types";

export default class Charity extends Contract {
  anchorAddress: string;
  endowmentAddress: string;

  constructor(endowmentAddress: string, wallet?: ConnectedWallet) {
    super(wallet);
    this.anchorAddress = contracts[this.chainID][sc.anchor];
    this.endowmentAddress = endowmentAddress;
  }

  async getEndowmentBalanceData(): Promise<BalanceData> {
    const endowmentBal: Holdings = await this.getHoldings();

    const rateQuery = await this.query<Swap>(this.anchorAddress, {
      exchange_rate: { input_denom: "uust" },
    });

    const exchangeRate = Number(rateQuery.exchange_rate);
    const locked =
      (Number(endowmentBal.locked_cw20[0].amount!) * exchangeRate) / 1e6;
    const liquid =
      (Number(endowmentBal.liquid_cw20[0].amount!) * exchangeRate) / 1e6;

    return { locked, liquid };
  }

  private async getHoldings() {
    const result = await this.query<Holdings>(this.endowmentAddress, {
      balance: {},
    });
    return result;
  }
}

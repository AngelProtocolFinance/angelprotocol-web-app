import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { denoms } from "constants/currency";
import Contract from "./Contract";
import { EndowmentBalanceData, Holdings, sc, Swap } from "./types";

export default class Charity extends Contract {
  anchorAddress: string;
  endowmentAddress: string;

  constructor(endowmentAddress: string, wallet?: ConnectedWallet) {
    super(wallet);
    this.anchorAddress = contracts[this.chainID][sc.anchor];
    this.endowmentAddress = endowmentAddress;
  }

  async getEndowmentBalanceData() {
    const anchorRateData = await this.getAnchorRateData();
    const holdings = await this.getHoldings();
    const data = this.calculateBalanceData(anchorRateData, holdings);

    return data;
  }

  private async getAnchorRateData() {
    const result = await this.query<Swap>(this.anchorAddress, {
      exchange_rate: { input_denom: denoms.uusd },
    });
    return result;
  }

  private async getHoldings() {
    const result = await this.query<Holdings>(this.endowmentAddress, {
      balance: {},
    });
    return result;
  }

  private calculateBalanceData(
    anchorRateData: Swap,
    holdings: Holdings
  ): EndowmentBalanceData {
    const exchangeRate = Number(anchorRateData.exchange_rate);
    // we divide by 1e6 to convert UUST to UST
    const locked =
      (Number(holdings.locked_cw20[0].amount!) * exchangeRate) / 1e6;
    const liquid =
      (Number(holdings.liquid_cw20[0].amount!) * exchangeRate) / 1e6;

    return { locked, liquid };
  }
}

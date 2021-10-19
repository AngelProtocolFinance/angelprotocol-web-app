import { ConnectedWallet } from "@terra-money/wallet-provider";
import Querier from "./Querier";
import IndexFundSC from "../IndexFund";
import { Donors, TCAList } from "contracts/types";

export default class IndexFund extends Querier {
  source: string;
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.source = IndexFundSC.indexFundAddresses[this.chainID];
  }

  async getFundDonations() {
    return await this.query<Donors>(this.source, { active_fund_donations: {} });
  }

  async getTCAList() {
    const result = await this.query<TCAList>(this.source, { tca_list: {} });
    return result.tca_members;
  }
}

import { AccAddress, Dec } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { AccountDetails, Holdings } from "contracts/types";
import Vault from "./Vault";
import Querier from "./Querier";

export default class Account extends Querier {
  address: AccAddress;
  constructor(address: AccAddress, wallet?: ConnectedWallet) {
    super(wallet);
    this.address = address;
  }

  async getHoldings() {
    return await this.query<Holdings>(this.address, { balance: {} });
  }

  async getDetails() {
    return await this.query<AccountDetails>(this.address, { endowment: {} });
  }

  async getBalance() {
    const holdings = await this.getHoldings();
    const { locked_cw20, liquid_cw20 } = holdings;
    //get total locked
    const queries_locked = locked_cw20.map((holding) => {
      const vault = new Vault(holding.address, this.wallet);
      return vault.getUSTValue(holding.amount);
    });
    const queries_liq = liquid_cw20.map((holding) => {
      const vault = new Vault(holding.address, this.wallet);
      return vault.getUSTValue(holding.amount);
    });

    //whole thing fails if one fails
    const results_locked = await Promise.all(queries_locked);
    const results_liq = await Promise.all(queries_liq);

    const total_locked = results_locked
      .reduce((prev, curr) => {
        return prev.add(curr);
      }, new Dec(0))
      .div(1e6);

    //get total liquid

    const total_liq = results_liq
      .reduce((prev, curr) => {
        return prev.add(curr);
      }, new Dec(0))
      .div(1e6);

    const overall = total_locked.add(total_liq);

    return {
      address: this.address,
      total_liq: total_liq.toNumber(),
      total_locked: total_locked.toNumber(),
      overall: overall.toNumber(),
    };
  }
}

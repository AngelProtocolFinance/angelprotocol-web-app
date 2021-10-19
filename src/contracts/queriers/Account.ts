import { AccAddress, Dec } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import {
  AccountDetails,
  Holding,
  Holdings,
  OwnedBalance,
} from "contracts/types";
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

  async sumHoldings(holdings: Holding[]) {
    const queries = holdings.map((holding) => {
      const vault = new Vault(holding.address);
      return vault.getUSTValue(holding.amount);
    });

    //one vault don't resolve, mark failed
    const result = await Promise.all(queries);
    const sum = result
      .reduce((prev, curr) => {
        return prev.add(curr);
      }, new Dec(0))
      .div(1e6);

    return sum;
  }

  async getBalance(): Promise<OwnedBalance> {
    const holdings = await this.getHoldings();
    const { locked_cw20, liquid_cw20 } = holdings;
    const total_locked = await this.sumHoldings(locked_cw20);
    const total_liq = await this.sumHoldings(liquid_cw20);
    const overall = total_locked.add(total_liq);
    return {
      address: this.address,
      total_liq: total_liq.toNumber(),
      total_locked: total_locked.toNumber(),
      overall: overall.toNumber(),
    };
  }
}

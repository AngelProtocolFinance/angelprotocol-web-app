import { AccAddress, Dec } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Swap } from "contracts/types";
import Querier from "./Querier";

export default class Vault extends Querier {
  address: AccAddress;
  constructor(address: AccAddress, wallet?: ConnectedWallet) {
    super(wallet);
    this.address = address;
  }
  async getExchangeRate(denom: string) {
    return await this.query<Swap>(this.address, {
      exchange_rate: { input_denom: denom },
    });
  }

  async getUSTValue(amount: string) {
    const rate = await this.getExchangeRate("uust");
    return new Dec(rate.exchange_rate).mul(new Dec(amount));
  }
}

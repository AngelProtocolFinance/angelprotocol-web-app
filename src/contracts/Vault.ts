import { AccAddress, Dec } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import Contract from "./Contract";
import { Swap } from "./types";

export default class Vault extends Contract {
  address: AccAddress;
  constructor(vaultAddr: AccAddress, wallet?: ConnectedWallet) {
    super(wallet);
    this.address = vaultAddr;
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

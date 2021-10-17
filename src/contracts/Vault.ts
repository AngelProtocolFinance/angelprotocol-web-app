import { Dec } from "@terra-money/terra.js";
import Contract from "./Contract";
import { Holding, Swap } from "./types";

export default class Vault extends Contract {
  static async getUSTValue(
    holding: Holding,
    chainID?: string,
    url?: string
  ): Promise<Dec> {
    const swap = await this.queryContract<Swap>(chainID, url, holding.address, {
      exchange_rate: { input_denom: "uusd" },
    });
    return new Dec(swap.exchange_rate).mul(new Dec(holding.amount));
  }
}

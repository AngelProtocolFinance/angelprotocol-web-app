import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import Contract from "./Contract";
import { Endowments, SplitRes } from "./types";

export default class Registrar extends Contract {
  address: string;
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = contracts[this.chainID][sc.registrar];
  }
  async getConfig() {
    const result = await this.query<SplitRes>(this.address, {
      config: {},
    });
    return result.split_to_liquid;
  }

  async getEndowmentList() {
    const result = await this.query<Endowments>(this.address, {
      endowment_list: {},
    });
    return result.endowments;
  }
}

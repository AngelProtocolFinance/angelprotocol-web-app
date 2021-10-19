import { ConnectedWallet } from "@terra-money/wallet-provider";
import Querier from "./Querier";
import RegistrarSC from "../Registrar";
import { Endowments, SplitRes } from "contracts/types";

export default class Registrar extends Querier {
  source: string;
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.source = RegistrarSC.scAddresses[this.chainID];
  }

  async getConfig() {
    const result = await this.query<SplitRes>(this.source, {
      config: {},
    });
    return result.split_to_liquid;
  }

  async getEndowmentList() {
    const result = await this.query<Endowments>(this.source, {
      endowment_list: {},
    });
    return result.endowments;
  }
}

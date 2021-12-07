import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import { sc } from "./types";

interface LBPPair {
  start_time: number;
  end_time: number;
  contract_addr: string;
  asset_infos: any[];
}

export default class LBP extends Contract {
  address: string;
  //contract address

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = contracts[this.chainID][sc.lbp];
  }

  async getLBPs() {
    const pairs = await this.query<LBPPair>(this.address, {
      pairs: {},
    });

    return pairs;
  }
}

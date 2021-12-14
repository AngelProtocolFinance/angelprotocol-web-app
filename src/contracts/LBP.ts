import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import { sc } from "./types";

export default class LBP extends Contract {
  factory_address: string;
  token_address: string;
  pair_address: string;
  router_adddress: string;
  lp_address: string;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.factory_address = contracts[this.chainID][sc.lbp_factory];
    this.token_address = contracts[this.chainID][sc.lbp_token];
    this.pair_address = contracts[this.chainID][sc.lbp_pair];
    this.router_adddress = contracts[this.chainID][sc.lbp_router];
    this.lp_address = contracts[this.chainID][sc.lbp_lp];
  }
}

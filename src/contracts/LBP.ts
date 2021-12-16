import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import { sc } from "./types";

export default class LBP extends Contract {
  factory_address: string;
  pair_address: string;
  router_adddress: string;
  lp_address: string;
  halo_token_address: string;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.halo_token_address = contracts[this.chainID][sc.halo_token];
    this.factory_address = contracts[this.chainID][sc.lbp_factory];
    this.router_adddress = contracts[this.chainID][sc.lbp_router];
    this.pair_address = contracts[this.chainID][sc.lbp_pair];
    this.lp_address = contracts[this.chainID][sc.lbp_lp];
    this.getSimulation = this.getSimulation.bind(this);
    this.getReverseSimulation = this.getReverseSimulation.bind(this);
  }

  async getSimulation(amount: string) {
    const result = await this.query<any>(this.pair_address, {
      simulation: {
        offer_asset: {
          info: {
            native_token: {
              denom: "uusd",
            },
          },
          amount: amount,
        },
        block_time: Math.round(new Date().getTime() / 1000 + 10),
      },
    });
    return result;
  }

  async getReverseSimulation(amount: string, contract_addr: string) {
    const result = await this.query<any>(this.pair_address, {
      reverse_simulation: {
        ask_asset: {
          info: {
            token: {
              contract_addr: contract_addr,
            },
          },
          amount: amount,
        },
        block_time: Math.round(new Date().getTime() / 1000 + 10),
      },
    });
    return result;
  }
}

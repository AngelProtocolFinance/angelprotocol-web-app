import { Coin, Dec, MsgExecuteContract } from "@terra-money/terra.js";
import { denoms } from "types/denoms";
import { sc } from "types/sc";
import { ContractQueryArgs } from "types/services/terra";
import { Simulation } from "types/services/terra/lp";
import { WalletProxy } from "providers/WalletProvider";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class LP extends Contract {
  factory_address: string;
  pair_address: string;
  router_adddress: string;
  lp_address: string;
  halo_address: string;

  simul: ContractQueryArgs;
  pool: ContractQueryArgs;
  pairInfo: ContractQueryArgs;

  constructor(wallet?: WalletProxy) {
    super(wallet);
    this.factory_address = contracts[this.chainID][sc.loop_factory];
    this.pair_address = contracts[this.chainID][sc.loop_haloust_pair];
    this.router_adddress = contracts[this.chainID][sc.loop_router];
    this.lp_address = contracts[this.chainID][sc.loop_haloust_lp];
    this.halo_address = contracts[this.chainID][sc.halo_token];

    //query args
    this.simul = {
      address: this.pair_address,
      msg: {
        simulation: {
          offer_asset: {
            info: {
              native_token: {
                denom: denoms.uusd,
              },
            },
            amount: "1000000",
          },
          block_time: Math.round(new Date().getTime() / 1000 + 10),
        },
      },
    };

    this.pool = { address: this.pair_address, msg: { pool: {} } };

    this.pairInfo = {
      address: this.pair_address,
      msg: {
        pair: {
          asset_infos: [
            { token: { contract_addr: this.lp_address } },
            { native_token: { denom: denoms.uusd } },
          ],
        },
      },
    };
  }

  //simul on demand
  async pairSimul(offer_amount: number, from_native: boolean) {
    const offer_uamount = new Dec(offer_amount).mul(1e6).toInt().toString();
    const offer_asset = from_native
      ? {
          native_token: {
            denom: denoms.uusd,
          },
        }
      : {
          token: {
            contract_addr: this.halo_address,
          },
        };

    const result = await this.query<Simulation>(this.pair_address, {
      simulation: {
        offer_asset: {
          info: offer_asset,
          amount: offer_uamount,
        },
        block_time: Math.round(new Date().getTime() / 1000 + 10),
      },
    });
    return result;
  }

  createBuyMsg(
    ust_amount: number,
    belief_price: string, //"e.g '0.05413'"
    max_spread: string //"e.g 0.02 for 0.02%"
  ) {
    this.checkWallet();
    const uust_amount = new Dec(ust_amount).mul(1e6).toInt().toString();
    return new MsgExecuteContract(
      this.walletAddr!,
      this.pair_address,
      {
        swap: {
          offer_asset: {
            info: {
              native_token: {
                denom: denoms.uusd,
              },
            },
            amount: uust_amount,
          },
          belief_price,
          max_spread,
          // to: Option<HumanAddr>
        },
      },
      [new Coin(denoms.uusd, uust_amount)]
    );
  }

  createSellMsg(
    halo_amount: number,
    belief_price: string, //"e.g '0.05413'"
    max_spread: string //"e.g 0.02 for 0.02%"
  ) {
    this.checkWallet();
    const uhalo_amount = new Dec(halo_amount).mul(1e6).toInt().toString();
    return new MsgExecuteContract(this.walletAddr!, this.halo_address, {
      send: {
        contract: this.pair_address,
        amount: uhalo_amount,
        msg: btoa(
          JSON.stringify({
            swap: { belief_price, max_spread },
          })
        ),
      },
    });
  }
}

export interface L extends LP {}
export type T = typeof LP;

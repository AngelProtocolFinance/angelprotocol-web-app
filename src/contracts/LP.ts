import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { ContractQueryArgs } from "services/types";
import { Simulation } from "types/server/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class LP extends Contract {
  pair_address: string;
  lp_address: string;
  halo_address: string;
  simul: ContractQueryArgs;

  constructor(walletAddr?: string) {
    super(walletAddr);
    this.pair_address = contracts.loop_haloust_pair;
    this.lp_address = contracts.loop_haloust_lp;
    this.halo_address = contracts.halo_token;

    //query args
    this.simul = {
      address: this.pair_address,
      msg: {
        simulation: {
          offer_asset: {
            info: {
              native_token: {
                denom: "uusd",
              },
            },
            amount: "1000000",
          },
          block_time: Math.round(new Date().getTime() / 1000 + 10),
        },
      },
    };
  }

  //simul on demand
  async pairSimul(offer_amount: number, from_native: boolean) {
    const offer_uamount = new Decimal(offer_amount)
      .mul(1e6)
      .divToInt(1)
      .toString();
    const offer_asset = from_native
      ? {
          native_token: {
            denom: "uusd",
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
    const uust_amount = new Decimal(ust_amount).mul(1e6).divToInt(1).toString();
    return new MsgExecuteContract(
      this.walletAddr!,
      this.pair_address,
      {
        swap: {
          offer_asset: {
            info: {
              native_token: {
                denom: "uusd",
              },
            },
            amount: uust_amount,
          },
          belief_price,
          max_spread,
          // to: Option<HumanAddr>
        },
      },
      [new Coin("uusd", uust_amount)]
    );
  }

  createSellMsg(
    halo_amount: number,
    belief_price: string, //"e.g '0.05413'"
    max_spread: string //"e.g 0.02 for 0.02%"
  ) {
    const uhalo_amount = new Decimal(halo_amount)
      .mul(1e6)
      .divToInt(1)
      .toString();
    return new MsgExecuteContract(this.walletAddr!, this.halo_address, {
      send: {
        contract: this.pair_address,
        amount: uhalo_amount,
        msg: Buffer.from(
          JSON.stringify({
            swap: { belief_price, max_spread },
          })
        ).toString("base64"),
      },
    });
  }
}

export interface L extends LP {}
export type T = typeof LP;

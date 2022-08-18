import Decimal from "decimal.js";
import { Simulation } from "types/server/contracts";
import { contracts } from "constants/contracts";
import CW20 from "./CW20";
import Contract from "./Contract";

export default class LP extends Contract {
  private static address = contracts.loop_haloust_pair;
  //simul on demand
  async pairSimul(offer_amount: number, from_native: boolean) {
    const offer_uamount = new Decimal(offer_amount)
      .mul(1e6)
      .divToInt(1)
      .toString();
    const offer_asset = from_native
      ? {
          native_token: {
            denom: this.wallet?.chain.native_currency.token_id,
          },
        }
      : {
          token: {
            contract_addr: contracts.halo_token,
          },
        };

    const result = await this.query<Simulation>(LP.address, {
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
    juno_amount: number,
    belief_price: string, //"e.g '0.05413'"
    max_spread: string //"e.g 0.02 for 0.02%"
  ) {
    const ujuno_amount = new Decimal(juno_amount)
      .mul(1e6)
      .divToInt(1)
      .toString();

    // we should never allow creating messages without a connected wallet
    const denom = this.wallet!.chain.native_currency.token_id;

    return this.createExecuteContractMsg(
      LP.address,
      {
        swap: {
          offer_asset: {
            info: {
              native_token: {
                denom,
              },
            },
            amount: ujuno_amount,
          },
          belief_price,
          max_spread,
        },
      },
      [{ denom, amount: ujuno_amount }]
    );
  }

  createSellMsg(
    halo_amount: number,
    belief_price: string, //"e.g '0.05413'"
    max_spread: string //"e.g 0.02 for 0.02%"
  ) {
    const halo = new CW20(this.wallet, contracts.halo_token);
    return halo.createSendMsg(halo_amount, LP.address, {
      swap: {
        belief_price,
        max_spread,
      },
    });
  }
}

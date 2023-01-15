import { scaleToStr } from "helpers";
import { contracts } from "constants/contracts";
import { junoDenom } from "constants/tokens";
import CW20 from "./CW20";
import Contract from "./Contract";

export default class LP extends Contract {
  private static address = contracts.loop_haloust_pair;

  createBuyMsg(
    juno_amount: number,
    belief_price: string, //"e.g '0.05413'"
    max_spread: string //"e.g 0.02 for 0.02%"
  ) {
    // we should never allow creating messages without a connected wallet
    const denom = junoDenom;

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
            amount: scaleToStr(juno_amount),
          },
          belief_price,
          max_spread,
        },
      },
      [{ denom, amount: scaleToStr(juno_amount) }]
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

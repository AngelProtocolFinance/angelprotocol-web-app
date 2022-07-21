import Decimal from "decimal.js";
import { ContractQueryArgs } from "services/types";
import { Simulation } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import toBase64 from "helpers/toBase64";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class LP extends Contract {
  simul: ContractQueryArgs;

  constructor(wallet: WalletState | undefined) {
    super(wallet, contracts.loop_haloust_pair);

    //query args
    this.simul = {
      address: this.contractAddress,
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
            contract_addr: contracts.halo_token,
          },
        };

    const result = await this.query<Simulation>({
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
    const uhalo_amount = new Decimal(halo_amount)
      .mul(1e6)
      .divToInt(1)
      .toString();

    const haloContract = new Contract(this.wallet, contracts.halo_token);

    return haloContract.createExecuteContractMsg({
      send: {
        contract: this.contractAddress,
        amount: uhalo_amount,
        msg: toBase64({
          swap: {
            belief_price,
            max_spread,
          },
        }),
      },
    });
  }
}

export interface L extends LP {}
export type T = typeof LP;

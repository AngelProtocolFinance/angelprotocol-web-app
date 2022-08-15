import {
  AggregatedQuery,
  ContractQueryArgs,
  MultiContractQueryArgs,
} from "services/types";
import { Airdrops } from "types/server/aws";
import { queryObject } from "services/juno/queryContract/queryObjects";
import { WalletState } from "contexts/WalletContext/WalletContext";
import toBase64 from "helpers/toBase64";
import { contracts } from "constants/contracts";
import Airdrop from "./Airdrop";
import Registrar from "./Registrar";

export default class Multicall {
  registrarContract: Registrar;
  airdropContract: Airdrop;
  balanceAndRates: (endowmentAddr: string) => MultiContractQueryArgs;
  airDropInquiries: (airdrops: Airdrops) => MultiContractQueryArgs;

  constructor(wallet: WalletState | undefined) {
    this.registrarContract = new Registrar(wallet);
    this.airdropContract = new Airdrop(wallet);

    this.balanceAndRates = (endowmentAddr) => ({
      address: contracts.multicall,
      msg: this.constructAggregatedQuery([
        { address: endowmentAddr, msg: queryObject.accBalance },
        this.registrarContract.vaultsRate,
      ]),
    });

    this.airDropInquiries = (airdrops) => ({
      address: contracts.multicall,
      msg: this.constructAggregatedQuery(
        airdrops.map((airdrop) =>
          this.airdropContract.isAirDropClaimed(airdrop.stage)
        )
      ),
    });
  }

  constructAggregatedQuery(queries: ContractQueryArgs[]): AggregatedQuery {
    return {
      aggregate: {
        queries: queries.map((query) => ({
          address: query.address,
          data: toBase64(query.msg),
        })),
      },
    };
  }
}

export interface MC extends Multicall {}
export type M = typeof Multicall;

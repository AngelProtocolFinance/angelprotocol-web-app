import {
  AggregatedQuery,
  ContractQueryArgs,
  MultiContractQueryArgs,
} from "services/types";
import { Airdrops } from "types/server/aws";
import { WalletState } from "contexts/WalletContext/WalletContext";
import toBase64 from "helpers/toBase64";
import { contracts } from "constants/contracts";
import Account from "./Account";
import Airdrop from "./Airdrop";
import Registrar from "./Registrar";

export default class Multicall {
  address: string;
  registrarContract: Registrar;
  airdropContract: Airdrop;
  balanceAndRates: (endowmentAddr: string) => MultiContractQueryArgs;
  airDropInquiries: (airdrops: Airdrops) => MultiContractQueryArgs;

  constructor(wallet?: WalletState) {
    this.address = contracts.multicall;
    this.registrarContract = new Registrar(wallet);
    this.airdropContract = new Airdrop(wallet);

    this.balanceAndRates = (endowmentAddr) => ({
      address: this.address,
      msg: this.constructAggregatedQuery([
        new Account(endowmentAddr, wallet).balance,
        this.registrarContract.vaultsRate,
      ]),
    });

    this.airDropInquiries = (airdrops) => ({
      address: this.address,
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

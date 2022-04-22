import { chainIDs } from "types/chainIDs";
import { sc } from "types/sc";
import { Airdrops } from "types/server/aws";
import {
  AggregatedQuery,
  ContractQueryArgs,
  MultiContractQueryArgs,
} from "types/services/terra";
import { WalletProxy } from "providers/WalletProvider";
import { contracts } from "constants/contracts";
import Account from "./Account";
import Halo from "./Halo";
import Registrar from "./Registrar";

export default class Multicall {
  wallet?: WalletProxy;
  address: string;
  registrarContract: Registrar;
  haloContract: Halo;
  balanceAndRates: (endowmentAddr: string) => MultiContractQueryArgs;
  airDropInquiries: (airdrops: Airdrops) => MultiContractQueryArgs;

  constructor(wallet?: WalletProxy) {
    this.wallet = wallet;
    this.address = contracts[wallet?.network.chainID as chainIDs][sc.multicall];
    this.registrarContract = new Registrar(wallet);
    this.haloContract = new Halo(wallet);

    this.balanceAndRates = (endowmentAddr) => ({
      address: this.address,
      msg: this.constructAggregatedQuery([
        this.getAccountContract(endowmentAddr).balance,
        this.registrarContract.vaultsRate,
      ]),
    });

    this.airDropInquiries = (airdrops) => ({
      address: this.address,
      msg: this.constructAggregatedQuery(
        airdrops.map((airdrop) =>
          this.haloContract.isAirDropClaimed(airdrop.stage)
        )
      ),
    });
  }

  constructAggregatedQuery(queries: ContractQueryArgs[]): AggregatedQuery {
    return {
      aggregate: {
        queries: queries.map((query) => ({
          address: query.address,
          data: btoa(JSON.stringify(query.msg)),
        })),
      },
    };
  }

  getAccountContract(endowmentAddr: string) {
    return new Account(endowmentAddr, this.wallet);
  }
}

export interface MC extends Multicall {}
export type M = typeof Multicall;

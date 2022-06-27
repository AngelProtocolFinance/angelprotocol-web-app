import {
  AggregatedQuery,
  ContractQueryArgs,
  MultiContractQueryArgs,
} from "services/types";
import { Airdrops } from "types/server/aws";
import toBase64 from "helpers/toBase64";
import { contracts } from "constants/contracts";
import Account from "./Account";
import Airdrop from "./Airdrop";
import Gov from "./Gov";
import Registrar from "./Registrar";

export default class Multicall {
  walletAddr?: string;
  address: string;
  registrarContract: Registrar;
  govContract: Gov;
  airdropContract: Airdrop;
  balanceAndRates: (endowmentAddr: string) => MultiContractQueryArgs;
  airDropInquiries: (airdrops: Airdrops) => MultiContractQueryArgs;

  constructor(walletAddr?: string) {
    this.address = contracts.multicall;
    this.registrarContract = new Registrar(walletAddr);
    this.govContract = new Gov(walletAddr);
    this.airdropContract = new Airdrop(walletAddr);

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

  getAccountContract(endowmentAddr: string) {
    return new Account(endowmentAddr, this.walletAddr);
  }
}

export interface MC extends Multicall {}
export type M = typeof Multicall;

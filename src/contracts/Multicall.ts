import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
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
import Registrar from "./Registrar";

export default class Multicall {
  client: SigningCosmWasmClient;
  walletAddr?: string;
  address: string;
  registrarContract: Registrar;
  airdropContract: Airdrop;
  balanceAndRates: (endowmentAddr: string) => MultiContractQueryArgs;
  airDropInquiries: (airdrops: Airdrops) => MultiContractQueryArgs;

  constructor(client: SigningCosmWasmClient, walletAddr?: string) {
    this.address = contracts.multicall;
    this.walletAddr = walletAddr;
    this.client = client;
    this.registrarContract = new Registrar(client, walletAddr);
    this.airdropContract = new Airdrop(client, walletAddr);

    this.balanceAndRates = (endowmentAddr) => ({
      address: this.address,
      msg: this.constructAggregatedQuery([
        new Account(this.client, endowmentAddr, this.walletAddr).balance,
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

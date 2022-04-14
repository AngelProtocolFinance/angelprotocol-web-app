import { chainIDs } from "constants/chainIDs";
import { WalletProxy } from "providers/WalletProvider";
import { Airdrops } from "services/aws/airdrop/types";
import {
  AggregatedQuery,
  ContractQueryArgs,
  MultiContractQueryArgs,
} from "services/terra/types";
import Account from "./Account";
import Halo from "./Halo";
import Registrar from "./Registrar";

export default class Multicall {
  wallet?: WalletProxy;
  address: string;
  registrarContract: Registrar;
  haloContract: Halo;
  endowmentBalance: (endowmentAddr: string) => MultiContractQueryArgs;
  airDropInquiries: (airdrops: Airdrops) => MultiContractQueryArgs;

  constructor(wallet?: WalletProxy) {
    this.wallet = wallet;
    this.address =
      wallet?.network.chainID === chainIDs.mainnet
        ? "terra1y60jx2jqh5qpmcnvgz3n0zg2p6ky4mr6ax2qa5"
        : "terra1z9p02s5fkasx5qxdaes6mfyf2gt3kxuhcsd4va";
    this.registrarContract = new Registrar(wallet);
    this.haloContract = new Halo(wallet);

    this.endowmentBalance = (endowmentAddr) => ({
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

import { chainIDs } from "constants/chainIDs";
import { WalletProxy } from "providers/WalletProvider";
import {
  AggregatedQuery,
  ContractQueryArgs,
  MultiContractQueryArgs,
} from "services/terra/types";
import Account from "./Account";
import Registrar from "./Registrar";

export default class Multicall {
  wallet?: WalletProxy;
  address: string;
  registrarContract: Registrar;
  vaultBalance: (endowmentAddr: string) => MultiContractQueryArgs;

  constructor(wallet?: WalletProxy) {
    this.wallet = wallet;
    this.address = wallet?.network.chainID === chainIDs.mainnet ? "" : "";
    this.registrarContract = new Registrar(wallet);

    this.vaultBalance = (endowmentAddr) => ({
      address: this.address,
      msg: this.constructAggregatedQuery([
        this.getAccountContract(endowmentAddr).balance,
        this.registrarContract.vaultsRate,
      ]),
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

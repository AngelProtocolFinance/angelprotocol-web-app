import {
  AggregatedQuery,
  ContractQueryArgs,
  MultiContractQueryArgs,
} from "services/types";
import { Airdrops, Token } from "types/server/aws";
import { WalletProxy } from "providers/WalletProvider";
import { chainIDs } from "constants/chainIDs";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import Account from "./Account";
import Airdrop from "./Airdrop";
import CW20 from "./CW20";
import Gov from "./Gov";
import Registrar from "./Registrar";

export default class Multicall {
  wallet?: WalletProxy;
  address: string;
  registrarContract: Registrar;
  govContract: Gov;
  airdropContract: Airdrop;
  balanceAndRates: (endowmentAddr: string) => MultiContractQueryArgs;
  airDropInquiries: (airdrops: Airdrops) => MultiContractQueryArgs;
  cw20Balances: (
    address: string,
    cw20tokens: Token[]
  ) => MultiContractQueryArgs;

  constructor(wallet?: WalletProxy) {
    this.wallet = wallet;
    this.address =
      contracts[wallet?.network.chainID || chainIDs.terra_main][sc.multicall];
    this.registrarContract = new Registrar(wallet);
    this.govContract = new Gov(wallet);
    this.airdropContract = new Airdrop(wallet);

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

    this.cw20Balances = (address, cw20tokens) => ({
      address: this.address,
      msg: this.constructAggregatedQuery(
        cw20tokens.map((cw20token) => {
          const isTest = wallet?.network.chainID === chainIDs.terra_test;
          const cw20ContractAddr =
            cw20token.cw20_contract?.[isTest ? "testnet" : "mainnet"];
          //cw20tokens are already filtered to have valid contractAddr
          const cw20Contract = new CW20(cw20ContractAddr!);
          return cw20Contract.balance(address);
        })
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

import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import { ContractQueryArgs } from "services/terra/types";
import Contract from "./Contract";

export default class Registrar extends Contract {
  address: string;
  vaultsRate: ContractQueryArgs;
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = contracts[this.chainID][sc.registrar];

    this.vaultsRate = {
      address: this.address,
      msg: {
        approved_vault_rate_list: {},
      },
    };
  }
}

export interface R extends Registrar {}
export type T = typeof Registrar;

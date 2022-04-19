import { sc } from "types/sc";
import { ContractQueryArgs } from "types/services/terra";
import { WalletProxy } from "providers/WalletProvider";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Registrar extends Contract {
  address: string;
  vaultsRate: ContractQueryArgs;
  constructor(wallet?: WalletProxy) {
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

import { ConnectedWallet } from "@terra-money/wallet-provider";
import { ContractQueryArgs } from "services/terra/types";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import Contract from "./Contract";
import { StatusChangePayload } from "./types";

export default class Registrar extends Contract {
  address: string;
  endowmentList: ContractQueryArgs;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = contracts[this.chainID][sc.registrar];

    this.endowmentList = {
      address: this.address,
      msg: {
        endowment_list: {},
      },
    };
  }

  createEmbeddedChangeEndowmentStatusMsg(payload: StatusChangePayload) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_endowment_status: payload,
    });
  }
}
export interface R extends Registrar {}
export type T = typeof Registrar;

import { ContractQueryArgs } from "services/terra/types";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import Contract from "./Contract";
import {
  RegistrarConfigPayload,
  RegistrarOwnerPayload,
  StatusChangePayload,
} from "./types";
import { WalletProxy } from "providers/WalletProvider";
import {
  EndowmentQueryMsg,
  EndowmentQueryOptions,
} from "services/terra/registrar/types";

export default class Registrar extends Contract {
  address: string;
  endowmentList: ContractQueryArgs;
  vaultsRate: ContractQueryArgs;
  config: ContractQueryArgs;
  constructor(wallet?: WalletProxy) {
    super(wallet);
    this.address = contracts[this.chainID][sc.registrar];

    this.endowmentList = {
      address: this.address,
      msg: {
        endowment_list: {},
      },
    };
    this.vaultsRate = {
      address: this.address,
      msg: {
        approved_vault_rate_list: {},
      },
    };

    this.config = {
      address: this.address,
      msg: { config: {} },
    };
  }

  createEndowmentListQuery(payload?: EndowmentQueryOptions): EndowmentQueryMsg {
    return {
      address: this.address,
      msg: {
        endowment_list: { ...payload },
      },
    };
  }

  createEmbeddedChangeEndowmentStatusMsg(payload: StatusChangePayload) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_endowment_status: payload,
    });
  }

  createEmbeddedConfigUpdateMsg(payload: RegistrarConfigPayload) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_config: payload,
    });
  }
  createEmbeddedOwnerUpdateMsg(payload: RegistrarOwnerPayload) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_owner: payload,
    });
  }
}
export interface R extends Registrar {}
export type T = typeof Registrar;

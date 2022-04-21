import { MsgExecuteContract } from "@terra-money/terra.js";
import { EndowmentQueryOptions } from "services/terra/registrar/types";
import { ContractQueryArgs as CQA } from "services/terra/types";
import { WalletProxy } from "providers/WalletProvider";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import Contract from "./Contract";
import {
  RegistrarConfigPayload,
  RegistrarCreateEndowmentPayload,
  RegistrarOwnerPayload,
  StatusChangePayload,
} from "./types";

export default class Registrar extends Contract {
  address: string;
  vaultsRate: CQA;
  config: CQA;

  endowmentList: (args: EndowmentQueryOptions) => CQA;

  constructor(wallet?: WalletProxy) {
    super(wallet);
    this.address = contracts[this.chainID][sc.registrar];

    this.endowmentList = (queryOptions) => ({
      address: this.address,
      msg: {
        endowment_list: queryOptions,
      },
    });

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

  createCreateEndowmentMsg(payload: RegistrarCreateEndowmentPayload) {
    return new MsgExecuteContract(this.walletAddr!, this.address, {
      create_endowment: payload,
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

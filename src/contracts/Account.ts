import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { ContractQueryArgs } from "services/types";
import { Source, UpdateProfilePayload } from "types/server/contracts";
import Contract from "./Contract";

export default class Account extends Contract {
  accountAddr: string;
  balance: ContractQueryArgs;
  endowmentDetails: ContractQueryArgs;
  profile: ContractQueryArgs;

  constructor(accountAddr: string, walletAddr?: string) {
    super(walletAddr);
    this.accountAddr = accountAddr;

    this.balance = {
      address: this.accountAddr,
      msg: { balance: {} },
    };

    this.endowmentDetails = {
      address: this.accountAddr,
      msg: { endowment: {} },
    };

    this.profile = {
      address: this.accountAddr,
      msg: { get_profile: {} },
    };
  }

  createEmbeddedWithdrawMsg({
    sources,
    beneficiary,
  }: {
    sources: Source[];
    beneficiary: string;
  }) {
    return this.createdEmbeddedWasmMsg([], this.accountAddr, {
      withdraw: {
        sources: sources,
        beneficiary,
      },
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return this.createdEmbeddedWasmMsg([], this.accountAddr, {
      update_profile: payload,
    });
  }
}

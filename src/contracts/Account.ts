import { ContractQueryArgs } from "services/types";
import { Source, UpdateProfilePayload } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import Contract from "./Contract";

export default class Account extends Contract {
  accountAddr: string;
  balance: ContractQueryArgs;
  profile: ContractQueryArgs;

  constructor(accountAddr: string, wallet?: WalletState) {
    super(wallet);
    this.accountAddr = accountAddr;

    this.balance = {
      address: this.accountAddr,
      msg: { balance: {} },
    };

    this.profile = {
      address: this.accountAddr,
      msg: { get_profile: {} },
    };
  }

  createEmbeddedWithdrawMsg(payload: WithdrawPayload) {
    return this.createEmbeddedWasmMsg([], this.accountAddr, {
      withdraw: payload,
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return this.createEmbeddedWasmMsg([], this.accountAddr, {
      update_profile: payload,
    });
  }
}

type WithdrawPayload = {
  sources: Source[];
  beneficiary: string;
};

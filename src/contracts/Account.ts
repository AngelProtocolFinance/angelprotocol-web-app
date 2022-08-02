import { ContractQueryArgs } from "services/types";
import { Source, UpdateProfilePayload } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import Contract from "./Contract";

export default class Account extends Contract {
  endowment: ContractQueryArgs;
  balance: ContractQueryArgs;
  profile: ContractQueryArgs;

  constructor(wallet: WalletState | undefined, accountAddr: string) {
    super(wallet, accountAddr);

    this.endowment = {
      address: this.contractAddress,
      msg: { endowment: {} },
    };

    this.balance = {
      address: this.contractAddress,
      msg: { balance: {} },
    };

    this.profile = {
      address: this.contractAddress,
      msg: { get_profile: {} },
    };
  }

  createEmbeddedWithdrawMsg(payload: WithdrawPayload) {
    return this.createEmbeddedWasmMsg([], {
      withdraw: payload,
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return this.createEmbeddedWasmMsg([], {
      update_profile: payload,
    });
  }
}

type WithdrawPayload = {
  sources: Source[];
  beneficiary: string;
};

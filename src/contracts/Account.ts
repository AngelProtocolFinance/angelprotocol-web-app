import { ContractQueryArgs } from "services/types";
import { Source, UpdateProfilePayload } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import Contract from "./Contract";

export default class Account extends Contract {
  balance: ContractQueryArgs;
  profile: ContractQueryArgs;

  constructor(wallet: WalletState | undefined, accountAddr: string) {
    super(wallet, accountAddr);

    this.balance = {
      address: accountAddr,
      msg: { balance: {} },
    };

    this.profile = {
      address: accountAddr,
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

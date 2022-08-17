import { Coin } from "@cosmjs/proto-signing";
import { ContractQueryArgs } from "services/types";
import {
  DepositPayload,
  UpdateProfilePayload,
  WithdrawLiqPayload,
  WithdrawPayload,
} from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Account extends Contract {
  endowment: (id: number) => ContractQueryArgs;
  balance: (id: number) => ContractQueryArgs;
  profile: (id: number) => ContractQueryArgs;

  constructor(wallet: WalletState | undefined) {
    super(wallet, contracts.accounts);

    this.endowment = (id) => ({
      address: this.contractAddress,
      msg: { endowment: { id } },
    });

    this.balance = (id) => ({
      address: this.contractAddress,
      msg: { balance: { id } },
    });

    this.profile = (id) => ({
      address: this.contractAddress,
      msg: { get_profile: { id } },
    });
  }

  createEmbeddedWithdrawMsg(payload: WithdrawPayload) {
    return this.createEmbeddedWasmMsg([], {
      withdraw: payload,
    });
  }

  createEmbeddedWithdrawLiqMsg(payload: WithdrawLiqPayload) {
    return this.createEmbeddedWasmMsg([], {
      withdraw_liquid: payload,
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return this.createEmbeddedWasmMsg([], {
      update_profile: payload,
    });
  }

  createDepositMsg(payload: DepositPayload, funds: Coin[]) {
    return this.createExecuteContractMsg(
      {
        deposit: payload,
      },
      funds
    );
  }
}

import { Coin } from "@cosmjs/proto-signing";
import {
  DepositPayload,
  UpdateProfilePayload,
  WithdrawLiqPayload,
  WithdrawPayload,
} from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import Contract from "./Contract";

export default class Account extends Contract {
  address: string;

  constructor(wallet: WalletState | undefined, address: string) {
    super(wallet);
    this.address = address;
  }

  createEmbeddedWithdrawMsg(payload: WithdrawPayload) {
    return this.createEmbeddedWasmMsg(this.address, {
      withdraw: payload,
    });
  }

  createEmbeddedWithdrawLiqMsg(payload: WithdrawLiqPayload) {
    return this.createEmbeddedWasmMsg(this.address, {
      withdraw_liquid: payload,
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return this.createEmbeddedWasmMsg(this.address, {
      update_profile: payload,
    });
  }

  createDepositMsg(payload: DepositPayload, funds: Coin[]) {
    return this.createExecuteContractMsg(
      this.address,
      {
        deposit: payload,
      },
      funds
    );
  }
}

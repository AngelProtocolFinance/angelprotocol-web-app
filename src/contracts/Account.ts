import { Coin } from "@cosmjs/proto-signing";
import {
  DepositPayload,
  UpdateProfilePayload,
  WithdrawLiqPayload,
  WithdrawPayload,
} from "types/server/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Account extends Contract {
  private static address = contracts.accounts;

  //future: add id in constructor once id is outside payload

  createEmbeddedWithdrawMsg(payload: WithdrawPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      withdraw: payload,
    });
  }

  createEmbeddedWithdrawLiqMsg(payload: WithdrawLiqPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      withdraw_liquid: payload,
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      update_profile: payload,
    });
  }

  createDepositMsg(payload: DepositPayload, funds: Coin[]) {
    return this.createExecuteContractMsg(
      Account.address,
      {
        deposit: payload,
      },
      funds
    );
  }
}

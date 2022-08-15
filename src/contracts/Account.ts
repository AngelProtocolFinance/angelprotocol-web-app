import { Coin } from "@cosmjs/proto-signing";
import {
  DepositPayload,
  UpdateProfilePayload,
  WithdrawLiqPayload,
  WithdrawPayload,
} from "types/server/contracts";
import Contract from "./Contract";

export default class Account extends Contract {
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

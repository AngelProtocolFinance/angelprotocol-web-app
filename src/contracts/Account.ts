import { Coin } from "@cosmjs/proto-signing";
import {
  DepositPayload,
  InvestPayload,
  RedeemPayload,
  StatusChangePayload,
  UpdateProfilePayload,
  UpdateStategyPayload,
  WithdrawPayload,
} from "types/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Account extends Contract {
  private static address = contracts.accounts;

  //future: add id in constructor once id is outside payload

  createEmbeddedChangeEndowmentStatusMsg(payload: StatusChangePayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      update_endowment_status: payload,
    });
  }

  createEmbeddedWithdrawMsg(payload: WithdrawPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      withdraw: payload,
    });
  }

  createEmbeddedInvestMsg(payload: InvestPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      vaults_invest: payload,
    });
  }

  createEmbeddedRedeemMsg(payload: RedeemPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      vaults_redeem: payload,
    });
  }

  createEmbeddedStrategyUpdateMsg(payload: UpdateStategyPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      update_strategies: payload,
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

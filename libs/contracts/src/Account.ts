import { contracts } from "@ap/constants";
import { Coin } from "@cosmjs/proto-signing";
import {
  DepositPayload,
  EndowmentSettingsPayload,
  InvestPayload,
  RedeemPayload,
  StatusChangePayload,
  UpdateStategyPayload,
  WithdrawPayload,
} from "@ap/types/contracts";
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

  createEmbeddedStrategyUpdateMsg(payload: UpdateStategyPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      update_strategies: payload,
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

  createEmbeddedUpdateSettingsMsg(payload: EndowmentSettingsPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      update_endowment_settings: payload,
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

import {
  DepositPayload,
  EndowmentSettingsPayload,
  ProfileUpdate,
  StatusChangePayload,
  UpdateStategyPayload,
  WithdrawPayload,
} from "types/contracts";
import { Coin } from "types/cosmos";
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

  createEmbeddedStrategyUpdateMsg(payload: UpdateStategyPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      update_strategies: payload,
    });
  }

  createEmbeddedUpdateProfileMsg(payload: ProfileUpdate) {
    return this.createEmbeddedWasmMsg(Account.address, {
      update_profile: payload,
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

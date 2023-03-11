import {
  DepositPayload,
  InvestPayload,
  NewAIF,
  RedeemPayload,
  StatusChangePayload,
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

  createDepositMsg(payload: DepositPayload, funds: Coin[]) {
    return this.createExecuteContractMsg(
      Account.address,
      {
        deposit: payload,
      },
      funds
    );
  }

  createNewAIFmsg(payload: NewAIF) {
    return this.createExecuteContractMsg(Account.address, {
      create_endowment: payload,
    });
  }
}

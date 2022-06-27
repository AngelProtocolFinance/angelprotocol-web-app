import { Coin, MsgExecuteContract } from "@terra-money/terra.js";
import Decimal from "decimal.js";
import { ContractQueryArgs } from "services/types";
import { Source, UpdateProfilePayload } from "types/server/contracts";
import Contract from "./Contract";

export default class Account extends Contract {
  accountAddr: string;
  balance: ContractQueryArgs;
  endowmentDetails: ContractQueryArgs;
  profile: ContractQueryArgs;

  constructor(accountAddr: string, walletAddr?: string) {
    super(walletAddr);
    this.accountAddr = accountAddr;

    this.balance = {
      address: this.accountAddr,
      msg: { balance: {} },
    };

    this.endowmentDetails = {
      address: this.accountAddr,
      msg: { endowment: {} },
    };

    this.profile = {
      address: this.accountAddr,
      msg: { get_profile: {} },
    };
  }

  async createDepositMsg(UST_amount: number | string, splitToLiquid: number) {
    this.checkWallet();
    const pctLiquid = new Decimal(splitToLiquid).div(100);
    const pctLocked = new Decimal(1).sub(pctLiquid);

    const micro_UST_Amount = new Decimal(UST_amount).mul(1e6).toNumber();
    return new MsgExecuteContract(
      this.walletAddr!,
      this.accountAddr,
      {
        deposit: {
          locked_percentage: pctLocked.toFixed(2),
          liquid_percentage: pctLiquid.toFixed(2),
        },
      },
      [new Coin("uusd", micro_UST_Amount)]
    );
  }

  createEmbeddedWithdrawMsg({
    sources,
    beneficiary,
  }: {
    sources: Source[];
    beneficiary: string;
  }) {
    return this.createdEmbeddedWasmMsg([], this.accountAddr, {
      withdraw: {
        sources: sources,
        beneficiary,
      },
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return this.createdEmbeddedWasmMsg([], this.accountAddr, {
      update_profile: payload,
    });
  }
}

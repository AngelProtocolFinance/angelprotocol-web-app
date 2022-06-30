import Decimal from "decimal.js";
import { ContractQueryArgs } from "services/types";
import { Source, UpdateProfilePayload } from "types/server/contracts";
import { scaleAmount } from "helpers/amountFormatters";
import { junoDenom } from "constants/currency";
import Contract from "./Contract";

export default class Account extends Contract {
  accountAddr: string;
  balance: ContractQueryArgs;
  profile: ContractQueryArgs;

  constructor(accountAddr: string, walletAddr?: string) {
    super(walletAddr);
    this.accountAddr = accountAddr;

    this.balance = {
      address: this.accountAddr,
      msg: { balance: {} },
    };

    this.profile = {
      address: this.accountAddr,
      msg: { get_profile: {} },
    };
  }

  async createDepositMsg(amount: number | string, splitToLiquid: number) {
    const pctLiquid = new Decimal(splitToLiquid).div(100);
    const pctLocked = new Decimal(1).sub(pctLiquid);

    const uamount = scaleAmount(amount);
    return this.createContractMsg(
      this.walletAddr!,
      this.accountAddr,
      {
        deposit: {
          locked_percentage: pctLocked.toFixed(2),
          liquid_percentage: pctLiquid.toFixed(2),
        },
      },
      [{ amount: uamount, denom: junoDenom }]
    );
  }

  createEmbeddedWithdrawMsg({
    sources,
    beneficiary,
  }: {
    sources: Source[];
    beneficiary: string;
  }) {
    return this.createEmbeddedWasmMsg([], this.accountAddr, {
      withdraw: {
        sources: sources,
        beneficiary,
      },
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return this.createEmbeddedWasmMsg([], this.accountAddr, {
      update_profile: payload,
    });
  }
}

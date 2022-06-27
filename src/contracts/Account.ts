import { Dec } from "@terra-money/terra.js";
import { ContractQueryArgs } from "services/types";
import { Source, UpdateProfilePayload } from "types/server/contracts";
import { junoDenom } from "constants/currency";
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

  async createDepositMsg(amount: number | string, splitToLiquid: number) {
    this.checkWallet();
    const pctLiquid = new Dec(splitToLiquid).div(100);
    const pctLocked = new Dec(1).sub(pctLiquid);
    const uamount = new Dec(amount).mul(1e6).toInt().toString();

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
    this.checkWallet();
    return this.createdEmbeddedWasmMsg([], this.accountAddr, {
      withdraw: {
        sources: sources,
        beneficiary,
      },
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    this.checkWallet();
    return this.createdEmbeddedWasmMsg([], this.accountAddr, {
      update_profile: payload,
    });
  }
}

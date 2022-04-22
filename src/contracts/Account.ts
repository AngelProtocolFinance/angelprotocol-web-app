import { Coin, Dec, MsgExecuteContract } from "@terra-money/terra.js";
import { Source, UpdateProfilePayload } from "types/contracts/accounts";
import { denoms } from "types/denoms";
import { ContractQueryArgs } from "types/services/terra";
import { WalletProxy } from "providers/WalletProvider";
import Contract from "./Contract";

export default class Account extends Contract {
  address: string;
  balance: ContractQueryArgs;
  endowmentDetails: ContractQueryArgs;
  profile: ContractQueryArgs;

  constructor(accountAddr: string, wallet?: WalletProxy) {
    super(wallet);
    this.address = accountAddr;

    this.balance = {
      address: this.address,
      msg: { balance: {} },
    };

    this.endowmentDetails = {
      address: this.address,
      msg: { endowment: {} },
    };

    this.profile = {
      address: this.address,
      msg: { get_profile: {} },
    };
  }

  async createDepositMsg(UST_amount: number | string, splitToLiquid: number) {
    this.checkWallet();
    const pctLiquid = new Dec(splitToLiquid).div(100);
    const pctLocked = new Dec(1).sub(pctLiquid);

    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    return new MsgExecuteContract(
      this.walletAddr!,
      this.address,
      {
        deposit: {
          locked_percentage: pctLocked.toFixed(2),
          liquid_percentage: pctLiquid.toFixed(2),
        },
      },
      [new Coin(denoms.uusd, micro_UST_Amount)]
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
    return this.createdEmbeddedWasmMsg([], this.address, {
      withdraw: {
        sources: sources,
        beneficiary,
      },
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    this.checkWallet();
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_profile: payload,
    });
  }
}

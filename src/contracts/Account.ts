import { Coin, Dec, MsgExecuteContract } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { denoms } from "constants/currency";
import { ContractQueryArgs } from "services/terra/types";
import Contract from "./Contract";
import { Source } from "./types";

export default class Account extends Contract {
  address: string;
  balance: ContractQueryArgs;
  endowmentDetails: ContractQueryArgs;

  constructor(accountAddr: string, wallet?: ConnectedWallet) {
    super(wallet);
    this.address = accountAddr;

    this.balance = {
      address: accountAddr,
      msg: { balance: {} },
    };

    this.endowmentDetails = {
      address: accountAddr,
      msg: { endowment: {} },
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

  createWithdrawMsg({
    sources,
    beneficiary,
  }: {
    sources: Source[];
    beneficiary: string;
  }) {
    this.checkWallet();
    return new MsgExecuteContract(this.walletAddr!, this.address, {
      withdraw: {
        sources: sources,
        beneficiary,
      },
    });
  }
}

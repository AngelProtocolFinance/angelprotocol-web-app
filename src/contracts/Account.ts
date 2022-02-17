import {
  Coin,
  CreateTxOptions,
  Dec,
  MsgExecuteContract,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { denoms } from "constants/currency";
import { ContractQueryArgs } from "services/terra/types";
import Contract from "./Contract";
import { Source } from "./types";

export default class Account extends Contract {
  address: string;
  balance: ContractQueryArgs;

  constructor(accountAddr: string, wallet?: ConnectedWallet) {
    super(wallet);
    this.address = accountAddr;

    this.balance = {
      address: accountAddr,
      msg: { balance: {} },
    };
  }

  async createDepositTx(
    UST_amount: number | string,
    splitToLiquid: number
  ): Promise<CreateTxOptions> {
    this.checkWallet();
    const pctLiquid = new Dec(splitToLiquid).div(100);
    const pctLocked = new Dec(1).sub(pctLiquid);

    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    const depositMsg = new MsgExecuteContract(
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

    const fee = await this.estimateFee([depositMsg]);
    // const fee = new StdFee(2500000, [new Coin(denoms.uusd, 1.5e6)]);
    return { msgs: [depositMsg], fee };
  }

  async createWithdrawTx(sources: Source[]): Promise<CreateTxOptions> {
    this.checkWallet();
    const withdrawMsg = new MsgExecuteContract(this.walletAddr!, this.address, {
      withdraw: {
        sources: sources,
      },
    });
    const fee = await this.estimateFee([withdrawMsg]);
    // const fee = new StdFee(2500000, [new Coin(denoms.uusd, 1.5e6)]);
    return { msgs: [withdrawMsg], fee };
  }
}

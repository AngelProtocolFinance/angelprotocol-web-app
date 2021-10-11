import {
  AccAddress,
  Coin,
  CreateTxOptions,
  Dec,
  MsgExecuteContract,
  StdFee,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Denoms } from "types/currencies";
import Contract from "./Contract";

export default class Account extends Contract {
  accountAddr: AccAddress;

  constructor(wallet: ConnectedWallet, accountAddr: AccAddress) {
    super(wallet);
    this.accountAddr = accountAddr;
  }

  async createDepositTx(
    UST_amount: number | string,
    splitToLiquid: number
  ): Promise<CreateTxOptions> {
    const pctLiquid = splitToLiquid / 100;
    const pctLocked = 1 - pctLiquid;
    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    const depositMsg = new MsgExecuteContract(
      this.wallet.terraAddress,
      this.accountAddr,
      {
        deposit: {
          locked_percentage: `${pctLocked}`,
          liquid_percentage: `${pctLiquid}`,
        },
      },
      [new Coin(Denoms.UUSD, micro_UST_Amount)]
    );
    // const fee = await this.estimateFee([depositMsg]);
    const fee = new StdFee(2500000, [new Coin(Denoms.UUSD, 1.5e6)]);
    return { msgs: [depositMsg], fee };
  }
}

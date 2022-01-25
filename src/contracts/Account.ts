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
import {
  AccountDetails,
  Holding,
  Holdings,
  OwnedBalance,
  Source,
} from "./types";
import Vault from "./Vault";

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
          locked_percentage: pctLiquid.toFixed(2),
          liquid_percentage: pctLocked.toFixed(2),
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

  async getHoldings() {
    return await this.query<Holdings>(this.address, { balance: {} });
  }

  async getDetails() {
    return await this.query<AccountDetails>(this.address, { endowment: {} });
  }

  async sumHoldings(holdings: Holding[]) {
    const queries = holdings.map((holding) => {
      const vault = new Vault(holding.address, this.wallet);
      return vault.getUSTValue(holding.amount);
    });

    //one vault don't resolve, mark failed
    const result = await Promise.all(queries);
    const sum = result
      .reduce((prev, curr) => {
        return prev.add(curr);
      }, new Dec(0))
      .div(1e6);

    return sum;
  }

  async getBalance(): Promise<OwnedBalance> {
    const holdings = await this.getHoldings();
    const { locked_cw20, liquid_cw20 } = holdings;
    const total_locked = await this.sumHoldings(locked_cw20);
    const total_liq = await this.sumHoldings(liquid_cw20);
    const overall = total_locked.add(total_liq);
    return {
      address: this.address,
      total_liq: total_liq.toNumber(),
      total_locked: total_locked.toNumber(),
      overall: overall.toNumber(),
    };
  }
}

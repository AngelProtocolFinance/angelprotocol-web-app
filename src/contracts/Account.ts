import {
  AccAddress,
  Coin,
  CreateTxOptions,
  Dec,
  MsgExecuteContract,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { denoms } from "constants/curriencies";
import Contract from "./Contract";
import { AccountDetails, Holding, Holdings, OwnedBalance } from "./types";
import Vault from "./Vault";

export default class Account extends Contract {
  address: AccAddress;

  constructor(accountAddr: AccAddress, wallet?: ConnectedWallet) {
    super(wallet);
    this.address = accountAddr;
  }

  async createDepositTx(
    UST_amount: number | string,
    splitToLiquid: number
  ): Promise<CreateTxOptions> {
    this.checkWallet();
    const pctLiquid = splitToLiquid / 100;
    const pctLocked = 1 - pctLiquid;
    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    const depositMsg = new MsgExecuteContract(
      this.walletAddr!,
      this.address,
      {
        deposit: {
          locked_percentage: `${pctLocked}`,
          liquid_percentage: `${pctLiquid}`,
        },
      },
      [new Coin(denoms.uusd, micro_UST_Amount)]
    );
    const fee = await this.estimateFee([depositMsg]);
    return { msgs: [depositMsg], fee };
  }

  async createWithdrawTx(
    anchorVault: string,
    tokenQty: string
  ): Promise<CreateTxOptions> {
    this.checkWallet();
    const withdrawMsg = new MsgExecuteContract(this.walletAddr!, this.address, {
      withdraw: {
        sources: [{ vault: anchorVault, locked: "0", liquid: tokenQty }],
      },
    });
    // const fee = await this.estimateFee([withdrawMsg]);
    const fee = new StdFee(2500000, [new Coin(denoms.uusd, 1.5e6)]);
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

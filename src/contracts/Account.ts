import {
  AccAddress,
  Coin,
  CreateTxOptions,
  Dec,
  Denom,
  MsgExecuteContract,
  StdFee,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import Contract from "./Contract";
import { OwnedBalance, chains, ContractAddrs, Holdings } from "./types";
import Vault from "./Vault";

export default class Account extends Contract {
  accountAddr: AccAddress;

  static anchorAddrs: ContractAddrs = {
    [chains.mainnet]: "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s",
    [chains.testnet]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [chains.localterra]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
  };

  constructor(wallet: ConnectedWallet, accountAddr: AccAddress) {
    super(wallet);
    this.accountAddr = accountAddr;
  }

  static async getBalance(
    contract: AccAddress,
    chainID?: string,
    url?: string
  ): Promise<OwnedBalance> {
    const holding = await this.queryContract<Holdings>(chainID, url, contract, {
      balance: {},
    });
    const { locked_cw20, liquid_cw20 } = holding;
    //get total locked
    const queries_locked = locked_cw20.map((bal) =>
      Vault.getUSTValue(bal, chainID, url)
    );
    const queries_liq = liquid_cw20.map((bal) =>
      Vault.getUSTValue(bal, chainID, url)
    );

    //whole thing fails if one fails
    const results_locked = await Promise.all(queries_locked);
    const results_liq = await Promise.all(queries_liq);

    const total_locked = results_locked
      .reduce((prev, curr) => {
        return prev.add(curr);
      }, new Dec(0))
      .div(1e6);

    //get total liquid

    const total_liq = results_liq
      .reduce((prev, curr) => {
        return prev.add(curr);
      }, new Dec(0))
      .div(1e6);

    const overall = total_locked.add(total_liq);

    return {
      address: contract,
      total_liq: total_liq.toNumber(),
      total_locked: total_locked.toNumber(),
      overall: overall.toNumber(),
    };
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
      [new Coin(Denom.USD, micro_UST_Amount)]
    );
    // const fee = await this.estimateFee([depositMsg]);
    const fee = new StdFee(2500000, [new Coin(Denom.USD, 1.5e6)]);
    return { msgs: [depositMsg], fee };
  }
}

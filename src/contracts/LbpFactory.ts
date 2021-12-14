import {
  Coin,
  CreateTxOptions,
  Dec,
  MsgExecuteContract,
  AccAddress,
  // StdFee,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
// import { denoms } from "constants/currency";
import Contract from "./Contract";
import { PairResult, PairsResult, sc } from "./types";

export default class LbpFactory extends Contract {
  address: string;
  //contract address

  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = contracts[this.chainID][sc.lbp_factory];
  }

  async getLBPs() {
    const result = await this.query<PairsResult>(this.address, {
      pairs: {},
    });
    return result.pairs;
  }

  async getTokenInfo(contract: AccAddress) {
    const result = await this.query<any>(contract, {
      token_info: {},
    });
    return result;
  }

  async getPairInfo(contract: AccAddress) {
    const result = await this.query<PairResult>(contract, {
      pair: {},
    });
    return result;
  }

  async getTokenBalance(tokenAddress: AccAddress, walletAddress: AccAddress) {
    const result = await this.query<any>(tokenAddress, {
      balance: {
        address: walletAddress,
      },
    });
    return result.balance;
  }
  // async createSwapTx(
  //   UST_amount: number | string,
  //   splitToLiquid?: number
  // ): Promise<CreateTxOptions> {
  //   this.checkWallet(); //throws error when no wallet
  //   const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
  //   const depositMsg = new MsgExecuteContract(
  //     this.walletAddr!,
  //     this.address,
  //     {
  //       deposit: {
  //         fund_id: this.fund_id,
  //         split: `${splitToLiquid}`,
  //       },
  //     },
  //     [new Coin(denoms.uusd, micro_UST_Amount)]
  //   );
  //   const fee = await this.estimateFee([depositMsg]);
  //   // const fee = new StdFee(2500000, [new Coin(Denoms.UUSD, 1.5e6)]);
  //   return { msgs: [depositMsg], fee };
  // }

  //will add more transactions in the future
}

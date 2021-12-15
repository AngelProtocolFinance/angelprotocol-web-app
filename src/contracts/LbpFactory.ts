import {
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
  pair_address: string;
  //contract address
  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = contracts[this.chainID][sc.lbp_factory];
    this.pair_address = contracts[this.chainID][sc.lbp_pair];
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
}

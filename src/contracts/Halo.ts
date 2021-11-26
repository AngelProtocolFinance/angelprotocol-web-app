import { ConnectedWallet } from "@terra-money/wallet-provider";
import {
  MsgExecuteContract,
  Coin,
  Dec,
  CreateTxOptions,
  StdFee,
} from "@terra-money/terra.js";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import { HaloBalance, sc } from "./types";
import { denoms } from "constants/currency";

export default class Halo extends Contract {
  token_address: string;
  stake_address: string;
  gov_address: string;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.token_address = contracts[this.chainID][sc.halo_token];
    this.stake_address = contracts[this.chainID][sc.halo_stake];
    this.gov_address = contracts[this.chainID][sc.halo_gov];
  }

  //gov_stake
  async createStakeTx(amount: number): Promise<CreateTxOptions> {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6).toInt();

    const stake_msg = new MsgExecuteContract(
      this.walletAddr!,
      this.token_address,
      {
        send: {
          amount: uhalo.toString(),
          contract: this.gov_address,
          msg: btoa(JSON.stringify({ stake_voting_tokens: {} })),
        },
      }
    );
    // const fee = await this.estimateFee([stake_msg]);
    const fee = new StdFee(2500000, [new Coin(denoms.uusd, 1.5e6)]);
    return { msgs: [stake_msg], fee };
  }

  async getBalance() {
    if (!this.wallet) {
      return { balance: "0" };
    } else {
      return await this.query<HaloBalance>(this.token_address, {
        balance: { address: this.walletAddr! },
      });
    }
  }
}

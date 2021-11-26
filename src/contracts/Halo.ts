import { ConnectedWallet } from "@terra-money/wallet-provider";
import { MsgSend, Coin, Dec, CreateTxOptions } from "@terra-money/terra.js";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import { HaloBalance, sc } from "./types";

export default class Halo extends Contract {
  token_address: string;
  stake_address: string;

  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.token_address = contracts[this.chainID][sc.halo_token];
    this.stake_address = contracts[this.chainID][sc.halo_stake];
  }

  async createStakeTx(amount: number): Promise<CreateTxOptions> {
    this.checkWallet();
    const uhalo = new Dec(amount).mul(1e6);
    const stake_msg = new MsgSend(this.walletAddr!, this.stake_address, [
      new Coin("halo", uhalo.toNumber()),
    ]);
    const fee = await this.estimateFee([stake_msg]);
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

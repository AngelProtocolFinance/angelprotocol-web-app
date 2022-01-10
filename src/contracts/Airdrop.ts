import { CreateTxOptions, MsgExecuteContract } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import { sc } from "./types";

export default class Airdrop extends Contract {
  address: string;
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = contracts[this.chainID][sc.airdrop];
  }

  async createClaimTx(): Promise<CreateTxOptions> {
    this.checkWallet();
    const stake_msg = new MsgExecuteContract(this.walletAddr!, this.address, {
      claim: {
        stage: 1,
        amount: "10000000",
        proof: [
          "7bd45ffb3c9e6a1b24c5ec00401dd453314c4f2f95284ca854b82160783bb98f",
        ],
      },
    });
    const fee = await this.estimateFee([stake_msg]);
    return { msgs: [stake_msg], fee };
  }
}

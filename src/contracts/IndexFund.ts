import {
  Coin,
  CreateTxOptions,
  Dec,
  Denom,
  MsgExecuteContract,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import Contract from "./Contract";
import { chains, ContractAddrs } from "./types";

export default class Indexfund extends Contract {
  fund_id?: number;
  currContractAddr: string;
  //contract address

  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet: ConnectedWallet, fund_id?: number) {
    super(wallet);
    this.fund_id = fund_id;
    this.currContractAddr = Indexfund.indexFundAddresses[this.chainID];
  }

  static indexFundAddresses: ContractAddrs = {
    [chains.mainnet]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [chains.testnet]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [chains.localterra]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
  };

  async createDepositTx(
    UST_amount: number | string,
    splitToLiquid?: number
  ): Promise<CreateTxOptions> {
    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    const depositMsg = new MsgExecuteContract(
      this.walletAddr,
      this.currContractAddr,
      {
        deposit: {
          fund_id: this.fund_id,
          split: `${splitToLiquid}`,
        },
      },
      [new Coin(Denom.USD, micro_UST_Amount)]
    );
    const fee = await this.estimateFee([depositMsg]);
    return { msgs: [depositMsg], fee };
  }

  //will add more transactions in the future
}

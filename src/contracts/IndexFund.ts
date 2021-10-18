import {
  Coin,
  CreateTxOptions,
  Dec,
  Denom,
  MsgExecuteContract,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import Contract from "./Contract";
import { chains, ContractAddrs, Donors, TCAList } from "./types";

export default class Indexfund extends Contract {
  fund_id?: number;
  currContractAddr: string;
  //contract address

  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet: ConnectedWallet, fund_id?: number) {
    super(wallet);
    this.fund_id = fund_id;
    this.currContractAddr =
      Indexfund.indexFundAddresses[this.wallet.network.chainID];
  }

  static indexFundAddresses: ContractAddrs = {
    [chains.mainnet]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [chains.testnet]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [chains.localterra]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
  };

  static async getFundDonations(chainID: string, url: string): Promise<Donors> {
    const contract = Indexfund.indexFundAddresses[chainID];
    return this.queryContract<Donors>(chainID, url, contract, {
      active_fund_donations: {},
    });
  }

  //TODO: convert his query to static client also
  async getTCAList(): Promise<string[]> {
    const res = await this.client.wasm.contractQuery<TCAList>(
      this.currContractAddr,
      {
        tca_list: {},
      }
    );
    return res.tca_members;
  }

  async createDepositTx(
    UST_amount: number | string,
    splitToLiquid?: number
  ): Promise<CreateTxOptions> {
    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    const depositMsg = new MsgExecuteContract(
      this.wallet.terraAddress,
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
    // const fee = new StdFee(2500000, [new Coin(Denom.USD, 1.5e6)]);
    return { msgs: [depositMsg], fee };
  }

  //will add more transactions in the future
}

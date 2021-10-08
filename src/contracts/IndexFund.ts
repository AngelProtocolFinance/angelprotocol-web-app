import {
  Coin,
  CreateTxOptions,
  Dec,
  Denom,
  MsgExecuteContract,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import Contract from "./Contract";

interface ContractAddresses {
  [index: string]: string;
}

export default class Indexfund extends Contract {
  fund_id?: number;
  currContractAddr: string;
  //contract address
  static indexFundAddresses: ContractAddresses = {
    "bombay-12": "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    localterra: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    "tequila-0004": "",
    "columbus-5": "",
  };

  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet: ConnectedWallet, fund_id?: number) {
    super(wallet);
    this.fund_id = fund_id;
    this.currContractAddr =
      Indexfund.indexFundAddresses[this.wallet.network.chainID];
  }

  async getTCAList(): Promise<string[]> {
    const res = await this.client.wasm.contractQuery<{ tca_members: string[] }>(
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
      [new Coin("uusd", micro_UST_Amount)]
    );
    const fee = await this.estimateFee([depositMsg]);
    // const fee = new StdFee(2500000, [new Coin(Denom.USD, 1.5e6)]);
    return { msgs: [depositMsg], fee };
  }

  //will add more transactions in the future
}

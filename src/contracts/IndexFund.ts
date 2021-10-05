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

export type _IndexFund = typeof Indexfund;
export default class Indexfund extends Contract {
  fund_id?: number;
  //contract address
  static indexFundAddresses: ContractAddresses = {
    "bombay-12": "terra1gnsvg4663jukep64ce4qlxx6rxgayzz3e8487d",
    localterra: "terra174kgn5rtw4kf6f938wm7kwh70h2v4vcfd26jlc",
    "tequila-0004": "",
    "columbus-4": "",
  };

  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet: ConnectedWallet, fund_id?: number) {
    super(wallet);
    this.fund_id = fund_id;
  }

  async getTCAList(): Promise<string[]> {
    const contractAddr =
      Indexfund.indexFundAddresses[this.wallet.network.chainID];
    const res = await this.client.wasm.contractQuery<{ tca_members: string[] }>(
      contractAddr,
      {
        tca_list: {},
      }
    );
    return res.tca_members;
  }

  async createDepositTx(
    UST_amount: number | string,
    split?: number
  ): Promise<CreateTxOptions> {
    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    const depositMsg = new MsgExecuteContract(
      this.wallet.terraAddress,
      Indexfund.indexFundAddresses[this.wallet.network.chainID],
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

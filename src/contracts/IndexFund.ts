import {
  Coin,
  CreateTxOptions,
  Dec,
  Denom,
  LCDClient,
  Msg,
  MsgExecuteContract,
  StdFee,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";

interface ContractAddresses {
  [index: string]: string;
}

export default class Indexfund {
  wallet: ConnectedWallet;
  client: LCDClient;
  //contract address

  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet: ConnectedWallet) {
    this.wallet = wallet;
    this.client = new LCDClient({
      chainID: this.wallet.network.chainID,
      URL: this.wallet.network.lcd,
      gasAdjustment: 1.2, //use gas units 20% greater than estimate
      gasPrices: [new Coin(Denom.USD, 0.151792301)],
    });

    this.getTxResponse = this.getTxResponse.bind(this);
  }

  //TODO: hide contract addresses to env
  static indexFundAddresses: ContractAddresses = {
    "bombay-12": "terra1ac2nzq0yregq0xr4c500dp83vxe20uu4puy054",
    localterra: "terra174kgn5rtw4kf6f938wm7kwh70h2v4vcfd26jlc",
    "tequila-0004": "",
    "columbus-4": "",
  };

  async estimateFee(msgs: Msg[]): Promise<StdFee> {
    return this.client.tx.estimateFee(this.wallet.terraAddress, msgs, {
      feeDenoms: [Denom.USD],
    });
  }

  //bind this function in constructor to keep context
  async getTxResponse(txhash: string): Promise<Response> {
    return fetch(`${this.wallet.network.lcd}/txs/${txhash}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async createDepositTx(
    fund_id: number,
    UST_amount: number | string,
    split?: number
  ): Promise<CreateTxOptions> {
    const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
    const depositMsg = new MsgExecuteContract(
      this.wallet.terraAddress,
      Indexfund.indexFundAddresses[this.wallet.network.chainID],
      {
        deposit: {
          fund_id,
          split,
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

import {
  AccAddress,
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
  walletAddress: AccAddress;
  chainID: string;
  client: LCDClient;
  //contract address

  //may need to re-implement to handle multiple currencies in the future
  constructor(wallet: ConnectedWallet) {
    this.walletAddress = wallet.walletAddress;
    this.chainID = wallet.network.chainID;
    this.client = new LCDClient({
      chainID: this.chainID,
      URL: wallet.network.lcd,
      /*
      default gasAdjusment 1.4 - e.g if estimated gas to be used is 100, gas requested would be
      140 and the fee will be computed as ('uusd' * gas requested)
      gas requested should always be greater than estimated gas to be used

    
      let user adjust gas request for lower chance of transaction failure?
       */
      gasAdjustment: 1.01, //use gas units 1% greater than estimate
      /*
      gas prices changes not so often
      https://github.com/terra-money/terra.js/issues/70

      gas prices - https://fcd.terra.dev/v1/txs/gas_prices --> uusd : 0.453??

      last manual computed gas price is 0.151792301 for a failed transaction that requires
      314761uusd fee for 2073626 units of requested gas

       */
      gasPrices: [new Coin(Denom.USD, 0.151792301)],
    });
  }

  //TODO: hide contract addresses to env
  static indexFundAddresses: ContractAddresses = {
    "bombay-10": "terra19hajpu39cr9h25azwsgdaz98mc7ejp774mt6ch",
    localterra: "terra174kgn5rtw4kf6f938wm7kwh70h2v4vcfd26jlc",
    "tequila-0004": "",
    "columbus-4": "",
  };

  async estimateFee(msgs: Msg[]): Promise<StdFee> {
    return this.client.tx.estimateFee(this.walletAddress, msgs, {
      feeDenoms: [Denom.USD],
    });
  }

  async createDepositTx(
    fund_id: number,
    UST_amount: number | string,
    split?: number
  ): Promise<CreateTxOptions> {
    const micro_UST_Amount = new Dec(UST_amount).mul(1_000_000).toNumber();
    const depositMsg = new MsgExecuteContract(
      this.walletAddress,
      Indexfund.indexFundAddresses[this.chainID],
      {
        deposit: {
          fund_id,
          split,
        },
      },
      [new Coin(Denom.USD, micro_UST_Amount)]
    );
    const fee = await this.estimateFee([depositMsg]);
    return { msgs: [depositMsg], fee };
  }

  //will add more transactions in the future
}

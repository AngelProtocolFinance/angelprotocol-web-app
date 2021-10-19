import {
  AccAddress,
  Coin,
  Denom,
  LCDClient,
  Msg,
  StdFee,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";

export default class Contract {
  client: LCDClient;
  chainID: string;
  url: string;
  walletAddr: AccAddress;

  constructor(wallet: ConnectedWallet) {
    this.chainID = wallet.network.chainID;
    this.url = wallet.network.lcd;
    this.walletAddr = wallet.walletAddress;
    this.client = new LCDClient({
      chainID: this.chainID,
      URL: this.url,
      gasAdjustment: Contract.gasAdjustment, //use gas units 20% greater than estimate
      gasPrices: Contract.gasPrices,
    });

    this.getTxResponse = this.getTxResponse.bind(this);
  }

  static gasAdjustment = 1.2; //use gas units 20% greater than estimate
  //https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
  static gasPrices = [new Coin(Denom.USD, 0.5)];

  async estimateFee(msgs: Msg[]): Promise<StdFee> {
    return this.client.tx.estimateFee(this.walletAddr, msgs, {
      feeDenoms: [Denom.USD],
    });
  }
  //bind this function in constructor to keep context
  async getTxResponse(txhash: string): Promise<Response> {
    return fetch(`${this.url}/txs/${txhash}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

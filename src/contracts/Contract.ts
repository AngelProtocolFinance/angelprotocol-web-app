import { Coin, Denom, LCDClient, Msg, StdFee } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";

export default class Contract {
  wallet: ConnectedWallet;
  client: LCDClient;
  static gasAdjustment = 1.2; //use gas units 20% greater than estimate
  static gasPrices = [new Coin(Denom.USD, 0.151792301)];

  constructor(wallet: ConnectedWallet) {
    this.wallet = wallet;
    this.client = new LCDClient({
      chainID: this.wallet.network.chainID,
      URL: this.wallet.network.lcd,
      gasAdjustment: Contract.gasAdjustment, //use gas units 20% greater than estimate
      gasPrices: Contract.gasPrices,
    });

    this.getTxResponse = this.getTxResponse.bind(this);
  }

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
}

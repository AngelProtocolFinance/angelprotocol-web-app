import {
  AccAddress,
  Coin,
  Denom,
  LCDClient,
  Msg,
  StdFee,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { urls } from "App/chains";
import { chains } from "./types";

export default class Contract {
  wallet: ConnectedWallet;
  client: LCDClient;

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

  static gasAdjustment = 1.2; //use gas units 20% greater than estimate
  //https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
  static gasPrices = [new Coin(Denom.USD, 0.5)];

  static async queryContract<T>(
    chainID = chains.mainnet as string,
    URL = urls[chains.mainnet] as string,
    contractAddr: AccAddress,
    message: { [index: string]: any }
  ): Promise<T> {
    const client = new LCDClient({ chainID, URL });
    return await client.wasm.contractQuery<T>(contractAddr, message);
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

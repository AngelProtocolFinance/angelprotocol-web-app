import {
  AccAddress,
  Coin,
  Denom,
  LCDClient,
  Msg,
  StdFee,
  TxInfo,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { urls } from "App/chains";
import { Disconnected, TxResultFail } from "./Errors";
import { chains } from "./types";

export default class Contract {
  wallet?: ConnectedWallet;
  client: LCDClient;
  chainID: string;
  url: string;
  walletAddr?: AccAddress;

  constructor(wallet?: ConnectedWallet) {
    this.wallet = wallet;
    this.chainID = this.wallet?.network.chainID || chains.mainnet;
    this.url = this.wallet?.network.lcd || urls[chains.mainnet];
    this.walletAddr = this.wallet?.walletAddress;
    this.client = new LCDClient({
      chainID: this.chainID,
      URL: this.url,
      gasAdjustment: Contract.gasAdjustment, //use gas units 20% greater than estimate
      gasPrices: Contract.gasPrices,
    });

    this.pollTxInfo = this.pollTxInfo.bind(this);
  }

  static gasAdjustment = 1.2; //use gas units 20% greater than estimate
  //https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
  static gasPrices = [new Coin(Denom.USD, 0.5)];

  async query<T>(source: AccAddress, message: object) {
    return this.client.wasm.contractQuery<T>(source, message);
  }

  async estimateFee(msgs: Msg[]): Promise<StdFee> {
    return this.client.tx.estimateFee(this.walletAddr!, msgs, {
      feeDenoms: [Denom.USD],
    });
  }

  async pollTxInfo(
    txhash: string,
    retries: number,
    interval: number
  ): Promise<TxInfo> {
    const req = new Request(`${this.url}/txs/${txhash}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await new Promise((r) => {
      setTimeout(r, interval);
    });
    return fetch(req).then((res) => {
      if (res.status === 200) {
        return res.json() as unknown as TxInfo;
      }
      if (retries > 0 || res.status === 400) {
        return this.pollTxInfo(txhash, retries - 1, interval);
      }
      throw new TxResultFail(
        `https://finder.terra.money/${this.chainID}/tx/${txhash}`
      );
    });
  }

  checkWallet() {
    if (!this.walletAddr) {
      throw new Disconnected();
    }
  }
}

import {
  AccAddress,
  Coin,
  Fee,
  LCDClient,
  Msg,
  TxInfo,
} from "@terra-money/terra.js";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { terra_lcds } from "constants/urls";
import { WalletProxy } from "providers/WalletProvider";
import { Disconnected, TxResultFail } from "./Errors";

export default class Contract {
  client: LCDClient;
  chainID: string;
  url: string;
  walletAddr?: AccAddress;

  constructor(wallet?: WalletProxy) {
    this.chainID = wallet?.network.chainID || chainIDs.mainnet;
    this.url = terra_lcds[this.chainID];
    this.walletAddr = wallet?.walletAddress;
    this.client = new LCDClient({
      chainID: this.chainID,
      URL: this.url,
      gasAdjustment: Contract.gasAdjustment, //use gas units 20% greater than estimate
      gasPrices: Contract.gasPrices,
    });

    this.pollTxInfo = this.pollTxInfo.bind(this);
  }

  static gasAdjustment = 1.6; //use gas units 60% greater than estimate

  // https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
  static gasPrices = [
    new Coin(denoms.uusd, 0.15),
    new Coin(denoms.uluna, 0.01133),
  ];

  async query<T>(source: AccAddress, message: object) {
    return this.client.wasm.contractQuery<T>(source, message);
  }

  async estimateFee(msgs: Msg[], denom = denoms.uusd): Promise<Fee> {
    this.checkWallet();
    const account = await this.client.auth.accountInfo(this.walletAddr!);
    return this.client.tx.estimateFee(
      [{ sequenceNumber: account.getSequenceNumber() }],
      { msgs, feeDenoms: [denom] }
    );
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
      throw new TxResultFail(this.chainID, txhash);
    });
  }

  checkWallet() {
    if (!this.walletAddr) {
      throw new Disconnected();
    }
  }
}

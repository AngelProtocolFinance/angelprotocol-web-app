import {
  AccAddress,
  Coin,
  LCDClient,
  Msg,
  Fee,
  TxInfo,
  CreateTxOptions,
} from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { terra_lcds } from "constants/urls";
import { denoms } from "constants/currency";
import { Disconnected, TxResultFail } from "./Errors";
import { chainIDs } from "constants/chainIDs";

export default class Contract {
  wallet?: ConnectedWallet;
  client: LCDClient;
  chainID: string;
  url: string;
  walletAddr?: AccAddress;

  constructor(wallet?: ConnectedWallet) {
    this.wallet = wallet;
    this.chainID = this.wallet?.network.chainID || chainIDs.mainnet;
    this.url = terra_lcds[this.chainID];
    this.walletAddr = this.wallet?.walletAddress;
    this.client = new LCDClient({
      chainID: this.chainID,
      URL: this.url,
      gasAdjustment: Contract.gasAdjustment, //use gas units 20% greater than estimate
      gasPrices: Contract.gasPrices,
    });

    this.pollTxInfo = this.pollTxInfo.bind(this);
  }

  static gasAdjustment = 1.25; //use gas units 25% greater than estimate

  // https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
  static gasPrices = [
    new Coin(denoms.uusd, 0.15),
    new Coin(denoms.uluna, 0.01133),
  ];

  async query<T>(source: AccAddress, message: object) {
    return this.client.wasm.contractQuery<T>(source, message);
  }

  async createTx(msgs: Msg[]): Promise<CreateTxOptions> {
    const fee = await this.estimateFee(msgs);
    return { msgs, fee };
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

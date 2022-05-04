import {
  Coin,
  Fee,
  LCDClient,
  Msg,
  MsgExecuteContract,
  TxInfo,
} from "@terra-money/terra.js";
import { WalletProxy } from "providers/WalletProvider";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { terra_lcds } from "constants/urls";
import { Disconnected, TxResultFail } from "./Errors";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "./types";

export default class Contract {
  wallet?: WalletProxy;
  client: LCDClient;
  chainID: string;
  url: string;
  walletAddr?: string;

  constructor(wallet?: WalletProxy) {
    this.wallet = wallet;
    this.chainID = wallet?.network.chainID || chainIDs.mainnet;
    this.url = terra_lcds[this.chainID];
    this.walletAddr = wallet?.address;
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

  //for on-demand query, use RTK where possible
  async query<T>(source: string, message: object) {
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

  createdEmbeddedWasmMsg(
    funds: Coin.Data[],
    to: string,
    msg: object
  ): EmbeddedWasmMsg {
    const encodedMsg = btoa(JSON.stringify(msg));
    return {
      wasm: {
        execute: {
          contract_addr: to,
          funds,
          msg: encodedMsg,
        },
      },
    };
  }

  createdEmbeddedBankMsg(funds: Coin.Data[], to: string): EmbeddedBankMsg {
    return {
      bank: {
        send: {
          to_address: to,
          amount: funds,
        },
      },
    };
  }

  checkWallet() {
    if (!this.walletAddr) {
      throw new Disconnected();
    }
  }
}

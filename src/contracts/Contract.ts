import { Coin, Fee, LCDClient, Msg } from "@terra-money/terra.js";
import { EmbeddedWasmMsg } from "types/server/contracts";
import toBase64 from "helpers/toBase64";
import { WalletDisconnectError } from "errors/errors";
import { denoms } from "constants/currency";
import { terraChainId } from "constants/env";
import { terraLcdUrl } from "constants/urls";

export default class Contract {
  client: LCDClient;
  walletAddr: string;

  constructor(walletAddr?: string) {
    this.walletAddr = walletAddr || "";
    this.client = new LCDClient({
      chainID: terraChainId,
      URL: terraLcdUrl,
      gasAdjustment: Contract.gasAdjustment, //use gas units 20% greater than estimate
      gasPrices: Contract.gasPrices,
    });
  }

  static gasAdjustment = 1.6; //use gas units 60% greater than estimate

  // https://fcd.terra.dev/v1/txs/gas_prices - doesn't change too often
  static gasPrices = [
    new Coin(denoms.uusd, 0.15),
    //for classic, pisco is 0.15
    new Coin(denoms.uluna, 5.665),
  ];

  //for on-demand query, use RTK where possible
  async query<T>(source: string, message: object) {
    return this.client.wasm.contractQuery<T>(source, message);
  }

  async estimateFee(msgs: Msg[]): Promise<Fee> {
    if (!this.walletAddr) {
      throw new WalletDisconnectError();
    }

    const account = await this.client.auth.accountInfo(this.walletAddr!);

    return this.client.tx.estimateFee(
      [{ sequenceNumber: account.getSequenceNumber() }],
      { msgs, feeDenoms: [denoms.uluna] }
    );
  }

  createdEmbeddedWasmMsg(
    funds: Coin.Data[],
    to: string,
    msg: object
  ): EmbeddedWasmMsg {
    return {
      wasm: {
        execute: {
          contract_addr: to,
          funds,
          msg: toBase64(msg),
        },
      },
    };
  }
}

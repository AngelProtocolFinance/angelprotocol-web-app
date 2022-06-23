import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin, EncodeObject } from "@cosmjs/proto-signing";
import { EmbeddedWasmMsg } from "types/server/contracts";
import toBase64 from "helpers/toBase64";
import { WalletDisconnectError } from "errors/errors";

export default class Contract {
  client: SigningCosmWasmClient;
  walletAddr: string;

  constructor(client: SigningCosmWasmClient, walletAddr?: string) {
    this.client = client;
    this.walletAddr = walletAddr || "";
  }

  //for on-demand query, use RTK where possible
  async query<T>(source: string, message: Record<string, unknown>): Promise<T> {
    const jsonObject = await this.client.queryContractSmart(source, message);
    return JSON.parse(jsonObject) as T;
  }

  async estimateFee(msgs: readonly EncodeObject[]): Promise<number> {
    if (!this.walletAddr) {
      throw new WalletDisconnectError();
    }
    return await this.client.simulate(this.walletAddr, msgs, undefined);
  }

  createEmbeddedWasmMsg(
    funds: Coin[],
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

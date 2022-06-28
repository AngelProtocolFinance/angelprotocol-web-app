import { EncodeObject } from "@cosmjs/proto-signing";
import { Coin } from "@cosmjs/stargate";
import { EmbeddedWasmMsg } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import getCosmosClient from "helpers/getCosmosClient";
import toBase64 from "helpers/toBase64";

export default class Contract {
  wallet?: WalletState;
  walletAddr: string;

  constructor(wallet?: WalletState) {
    this.wallet = wallet;
    this.walletAddr = wallet?.address || "";
  }

  //for on-demand query, use RTK where possible
  async query<T>(source: string, message: Record<string, unknown>) {
    const client = await getCosmosClient(this.wallet);
    const jsonObject = await client.queryContractSmart(source, message);
    return JSON.parse(jsonObject) as T;
  }

  async estimateFee(msgs: readonly EncodeObject[]): Promise<number> {
    const client = await getCosmosClient(this.wallet);
    return await client.simulate(this.wallet!.address, msgs, undefined);
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

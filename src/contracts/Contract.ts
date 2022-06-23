import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
  Coin,
  DirectSecp256k1HdWallet,
  EncodeObject,
} from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";
import { EmbeddedWasmMsg } from "types/server/contracts";
import toBase64 from "helpers/toBase64";
import { WalletDisconnectError } from "errors/errors";
import { junoRpcUrl } from "constants/urls";

const GAS_PRICE = GasPrice.fromString("0.025ujunox");

export default class Contract {
  client: SigningCosmWasmClient;
  walletAddr: string;

  private constructor(client: SigningCosmWasmClient, walletAddr?: string) {
    this.client = client;
    this.walletAddr = walletAddr || "";
  }

  static async create(wallet: DirectSecp256k1HdWallet) {
    const client = await SigningCosmWasmClient.connectWithSigner(
      junoRpcUrl,
      wallet,
      { gasPrice: GAS_PRICE }
    );
    const [{ address }] = await wallet.getAccounts();
    return new Contract(client, address);
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

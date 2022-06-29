import { EncodeObject } from "@cosmjs/proto-signing";
import { Coin, StdFee } from "@cosmjs/stargate";
import { EmbeddedWasmMsg } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import getCosmosClient from "helpers/getCosmosClient";
import toBase64 from "helpers/toBase64";
import { denoms } from "constants/currency";

const GAS_PRICE =
  "0.0625"; /**TODO: uni-3 and juno-1 have diff gas prices for fee display only, 
  actual rate during submission is set by wallet - can be overridden with custom but keplr is buggy when customizing  */
const GAS_ADJUSTMENT = 1.5;

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

  async estimateFee(msgs: readonly EncodeObject[]): Promise<StdFee> {
    const client = await getCosmosClient(this.wallet);
    const gasLimit = await client.simulate(
      this.wallet!.address,
      msgs,
      undefined
    );
    return this.getFee(gasLimit);
  }

  private getFee(gasLimit: number) {
    return {
      amount: [{ denom: denoms.ujuno, amount: GAS_PRICE }],
      gas: `${Math.round(gasLimit * GAS_ADJUSTMENT)}`,
    };
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

import { EncodeObject } from "@cosmjs/proto-signing";
import { Coin } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";
import { EmbeddedWasmMsg } from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import configureCosmosClient from "helpers/configureCosmosClient";
import toBase64 from "helpers/toBase64";
import { WalletDisconnectError } from "errors/errors";

export default async function createContract(wallet: WalletState) {
  const signer = (wallet.provider as Keplr).getOfflineSigner(wallet.chainId);
  const { client, address } = await configureCosmosClient(signer);

  function createEmbeddedWasmMsg(
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

  async function estimateFee(msgs: readonly EncodeObject[]): Promise<number> {
    if (!address) {
      throw new WalletDisconnectError();
    }
    return await client.simulate(address, msgs, undefined);
  }

  async function query<T>(
    source: string,
    message: Record<string, unknown>
  ): Promise<T> {
    const jsonObject = await client.queryContractSmart(source, message);
    return JSON.parse(jsonObject) as T;
  }

  return {
    client,
    walletAddress: address,
    createEmbeddedWasmMsg,
    estimateFee,
    query,
  };
}

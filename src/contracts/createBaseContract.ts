import { EncodeObject } from "@cosmjs/proto-signing";
import { Keplr } from "@keplr-wallet/types";
import { WalletState } from "contexts/WalletContext/WalletContext";
import getCosmosClient from "helpers/getCosmosClient";
import { WalletDisconnectError } from "errors/errors";

export type BaseContract = {
  estimateFee: (msgs: readonly EncodeObject[]) => Promise<number>;
  query: <T>(source: string, message: Record<string, unknown>) => Promise<T>;
};

export function createBaseContract(wallet?: WalletState): BaseContract {
  async function estimateFee(msgs: readonly EncodeObject[]): Promise<number> {
    if (!wallet) {
      throw new WalletDisconnectError();
    }
    const signer = (wallet.provider as Keplr).getOfflineSigner(wallet.chainId);
    const client = await getCosmosClient(signer);

    return await client.simulate(wallet.address, msgs, undefined);
  }

  async function query<T>(
    source: string,
    message: Record<string, unknown>
  ): Promise<T> {
    if (!wallet) {
      throw new WalletDisconnectError();
    }
    const signer = (wallet.provider as Keplr).getOfflineSigner(wallet.chainId);
    const client = await getCosmosClient(signer);

    const jsonObject = await client.queryContractSmart(source, message);
    return JSON.parse(jsonObject) as T;
  }

  return {
    estimateFee,
    query,
  };
}

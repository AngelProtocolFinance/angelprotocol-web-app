import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { EncodeObject } from "@cosmjs/proto-signing";
import { Keplr } from "@keplr-wallet/types";
import { WalletState } from "contexts/WalletContext/WalletContext";
import configureCosmosClient from "helpers/configureCosmosClient";
import { WalletDisconnectError } from "errors/errors";

export type BaseContract = {
  client: SigningCosmWasmClient;
  walletAddress: string;
  estimateFee: (msgs: readonly EncodeObject[]) => Promise<number>;
  query: <T>(source: string, message: Record<string, unknown>) => Promise<T>;
};

export async function createBaseContract(
  wallet?: WalletState
): Promise<BaseContract> {
  if (!wallet) {
    throw new WalletDisconnectError();
  }
  const signer = (wallet.provider as Keplr).getOfflineSigner(wallet.chainId);
  const { client, address } = await configureCosmosClient(signer);

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
    estimateFee,
    query,
  };
}

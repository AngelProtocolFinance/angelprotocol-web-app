import { EncodeObject } from "@cosmjs/proto-signing";
import { WalletState } from "contexts/WalletContext/WalletContext";
import getCosmosClient from "helpers/getCosmosClient";

export type BaseContract = {
  estimateFee: (msgs: readonly EncodeObject[]) => Promise<number>;
  query: <T>(source: string, message: Record<string, unknown>) => Promise<T>;
};

export function createBaseContract(wallet?: WalletState): BaseContract {
  async function estimateFee(msgs: readonly EncodeObject[]): Promise<number> {
    const client = await getCosmosClient(wallet);
    return await client.simulate(wallet!.address, msgs, undefined);
  }

  async function query<T>(
    source: string,
    message: Record<string, unknown>
  ): Promise<T> {
    const client = await getCosmosClient(wallet);
    const jsonObject = await client.queryContractSmart(source, message);
    return JSON.parse(jsonObject) as T;
  }

  return {
    estimateFee,
    query,
  };
}

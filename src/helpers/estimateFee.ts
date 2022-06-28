import { EncodeObject } from "@cosmjs/proto-signing";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import getCosmosClient from "./getCosmosClient";

export default async function estimateFee(
  msgs: readonly EncodeObject[]
): Promise<number> {
  const { wallet } = useGetWallet();
  const client = await getCosmosClient(wallet);
  return await client.simulate(wallet!.address, msgs, undefined);
}

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Dwindow } from "types/ethereum";

export default async function getCosmosClient(
  chain_id: string,
  rpc_url: string
): Promise<SigningCosmWasmClient> {
  const signer = (window as Dwindow).keplr!.getOfflineSigner(chain_id);
  const client = await SigningCosmWasmClient.connectWithSigner(rpc_url, signer);
  return client;
}

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";
import { junoRpcUrl } from "constants/urls";

const GAS_PRICE = GasPrice.fromString("0.025ujunox");

export default async function configureCosmosClient(
  signer: OfflineSigner
): Promise<SigningCosmWasmClient> {
  const client = await SigningCosmWasmClient.connectWithSigner(
    junoRpcUrl,
    signer,
    { gasPrice: GAS_PRICE }
  );
  return client;
}

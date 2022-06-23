import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";
import { junoRpcUrl } from "constants/urls";

const GAS_PRICE = GasPrice.fromString("0.025ujunox");

type ReturnType = {
  client: SigningCosmWasmClient;
  address: string;
  gasPrice: GasPrice;
};

export default async function configureCosmosClient(
  signer: OfflineSigner
): Promise<ReturnType> {
  const client = await SigningCosmWasmClient.connectWithSigner(
    junoRpcUrl,
    signer,
    { gasPrice: GAS_PRICE }
  );
  const [{ address }] = await signer.getAccounts();
  return { client, address, gasPrice: GAS_PRICE };
}

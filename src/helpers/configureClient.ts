import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";
import { junoRpcUrl } from "constants/urls";

const GAS_PRICE = GasPrice.fromString("0.025ujunox");

type ReturnType = {
  client: SigningCosmWasmClient;
  address: string;
  gasPrice: GasPrice;
};

export default async function configureClient(
  wallet: DirectSecp256k1HdWallet
): Promise<ReturnType> {
  const client = await SigningCosmWasmClient.connectWithSigner(
    junoRpcUrl,
    wallet,
    { gasPrice: GAS_PRICE }
  );
  const [{ address }] = await wallet.getAccounts();
  return { client, address, gasPrice: GAS_PRICE };
}

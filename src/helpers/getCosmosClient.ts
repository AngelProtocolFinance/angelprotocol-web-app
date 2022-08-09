import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Dwindow } from "types/ethereum";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { WalletDisconnectError, WrongNetworkError } from "errors/errors";
import { chainIds } from "constants/chainIds";
import { RPCs } from "constants/urls";

export default async function getCosmosClient(
  wallet: WalletState | undefined
): Promise<SigningCosmWasmClient> {
  if (!wallet) {
    throw new WalletDisconnectError();
  }
  if (wallet.chainId !== chainIds.juno) {
    throw new WrongNetworkError("Juno", chainIds.juno);
  }
  const signer = (window as Dwindow).keplr!.getOfflineSigner(wallet.chainId);
  const client = await SigningCosmWasmClient.connectWithSigner(
    RPCs.juno,
    signer
  );
  return client;
}

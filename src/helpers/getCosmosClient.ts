import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Dwindow } from "types/ethereum";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { WalletDisconnectError, WrongNetworkError } from "errors/errors";
import { junoChainId } from "constants/chainIDs";
import { junoRpcUrl } from "constants/urls";

export default async function getCosmosClient(
  wallet: WalletState | undefined
): Promise<SigningCosmWasmClient> {
  if (!wallet) {
    throw new WalletDisconnectError();
  }
  if (wallet.chainId !== junoChainId) {
    throw new WrongNetworkError();
  }
  const signer = (window as Dwindow).keplr!.getOfflineSigner(wallet.chainId);
  const client = await SigningCosmWasmClient.connectWithSigner(
    junoRpcUrl,
    signer
  );
  return client;
}

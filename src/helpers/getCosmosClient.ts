import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Dwindow } from "types/ethereum";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { WalletDisconnectError, WrongNetworkError } from "errors/errors";
import { junoChainId } from "constants/chainIDs";

export default async function getCosmosClient(
  wallet: WalletState | undefined
): Promise<SigningCosmWasmClient> {
  if (!wallet) {
    throw new WalletDisconnectError();
  }
  if (wallet.chain.chain_id !== junoChainId) {
    throw new WrongNetworkError("Juno", junoChainId);
  }
  const signer = (window as Dwindow).keplr!.getOfflineSigner(
    wallet.chain.chain_id
  );
  const client = await SigningCosmWasmClient.connectWithSigner(
    wallet.chain.rpc_url,
    signer
  );
  return client;
}

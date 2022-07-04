import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Dwindow } from "types/ethereum";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { WalletDisconnectError, WrongNetworkError } from "errors/errors";
import { chainIDs } from "constants/chainIDs";
import { junoRpcUrl } from "constants/urls";

export default async function getCosmosClient(
  wallet?: WalletState
): Promise<SigningCosmWasmClient> {
  if (!wallet) {
    throw new WalletDisconnectError();
  }
  if (
    wallet.chainId !== chainIDs.juno_main &&
    wallet.chainId !== chainIDs.juno_test
  ) {
    throw new WrongNetworkError();
  }
  const signer = (window as Dwindow).keplr!.getOfflineSigner(wallet.chainId);
  const client = await SigningCosmWasmClient.connectWithSigner(
    junoRpcUrl,
    signer
  );
  return client;
}

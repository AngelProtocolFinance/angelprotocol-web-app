import { useConnectedWallet, useWallet } from "@terra-money/wallet-provider";
import { IWalletContext } from "../types";

export default function useWalletProxy(): IWalletContext {
  const {
    connect,
    disconnect,
    availableConnections,
    availableInstallations,
    status,
    network,
  } = useWallet();
  const wallet = useConnectedWallet();

  return {
    connect,
    disconnect,
    availableConnections,
    availableInstallations,
    status,
    network,
    wallet,
  };
}

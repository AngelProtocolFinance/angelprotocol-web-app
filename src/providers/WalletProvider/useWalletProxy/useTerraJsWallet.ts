import {
  Connection,
  ConnectType,
  Installation,
  useConnectedWallet,
  useWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { useMemo } from "react";
import { WalletProxy } from "../types";

type Result = {
  wallet?: WalletProxy;
  status: WalletStatus;
  availableConnections: Connection[];
  availableInstallations: Installation[];
  connect: (type?: ConnectType, identifier?: string) => Promise<void>;
  disconnect: () => Promise<void>;
};

export default function useTerraJsWallet() {
  const {
    connect,
    disconnect,
    availableConnections,
    availableInstallations,
    status,
  } = useWallet();
  const wallet = useConnectedWallet();

  const result: Result = useMemo(
    () => ({
      wallet: wallet && {
        address: wallet.walletAddress,
        connection: wallet.connection,
        network: wallet.network,
        post: wallet.post,
      },
      status,
      availableConnections,
      availableInstallations,
      connect,
      disconnect,
    }),
    [
      wallet,
      status,
      availableConnections,
      availableInstallations,
      connect,
      disconnect,
    ]
  );

  return result;
}

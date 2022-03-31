import {
  Installation,
  useConnectedWallet,
  useWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { useEffect, useMemo } from "react";
import { TerraIdentifiers } from "services/wallet/types";
import { WalletProxy } from "../types";
import createDefaultWallet from "./createDefaultWallet";

type Result = {
  wallet?: WalletProxy;
  status: WalletStatus;
  availableWallets: WalletProxy[];
  availableInstallations: Installation[];
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
        connect: () =>
          new Promise((resolve) =>
            resolve(
              connect(wallet.connection.type, wallet.connection.identifier)
            )
          ),
        disconnect: () => new Promise((resolve) => resolve(disconnect())),
      },
      status,
      availableWallets: availableConnections.map((conn) => ({
        ...createDefaultWallet(conn),
        connect: () =>
          new Promise((resolve) =>
            resolve(connect(conn.type, conn.identifier))
          ),
        disconnect: () => new Promise((resolve) => resolve(disconnect())),
      })),
      availableInstallations,
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

  // Automatically connect with SafePal if and when available
  useEffect(() => {
    const safePal = availableConnections.find(
      (x) => x.identifier === TerraIdentifiers.safepal
    );

    if (safePal) {
      disconnect();
      connect(safePal.type, safePal.identifier);
    }
  }, [availableConnections, connect, disconnect]);

  return result;
}

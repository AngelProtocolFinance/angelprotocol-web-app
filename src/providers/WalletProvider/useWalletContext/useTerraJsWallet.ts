import { CreateTxOptions } from "@terra-money/terra.js";
import {
  ConnectedWallet,
  Connection,
  ConnectType,
  Installation,
  useConnectedWallet,
  useWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";
import { useEffect, useMemo } from "react";
import { TerraIdentifiers } from "services/wallet/types";
import { mainnet } from "../chainOptions";
import { WalletProxy } from "../types";

type Result = {
  wallet?: WalletProxy;
  status: WalletStatus;
  availableWallets: WalletProxy[];
  availableInstallations: Installation[];
};

export default function useTerraJsWallet(): Result {
  const {
    connect,
    disconnect,
    availableConnections,
    availableInstallations,
    status,
  } = useWallet();
  const wallet = useConnectedWallet();

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

  const result: Result = useMemo(
    () => ({
      wallet: createWallet(wallet, connect, disconnect),
      status,
      availableWallets: getAvailableWallets(
        availableConnections,
        connect,
        disconnect
      ),
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

  return result;
}

function createWallet(
  wallet: ConnectedWallet | undefined,
  connect: (type?: ConnectType, identifier?: string) => void,
  disconnect: () => void
): WalletProxy | undefined {
  return wallet
    ? {
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
      }
    : undefined;
}

function getAvailableWallets(
  availableConnections: Connection[],
  connect: (
    type?: ConnectType | undefined,
    identifier?: string | undefined
  ) => void,
  disconnect: () => void
): WalletProxy[] {
  return availableConnections.map((connection) => ({
    address: "",
    connection,
    network: mainnet,
    post: (_: CreateTxOptions) => {
      throw Error("Not initialized");
    },
    connect: () =>
      new Promise((resolve) =>
        resolve(connect(connection.type, connection.identifier))
      ),
    disconnect: () => new Promise((resolve) => resolve(disconnect())),
  }));
}

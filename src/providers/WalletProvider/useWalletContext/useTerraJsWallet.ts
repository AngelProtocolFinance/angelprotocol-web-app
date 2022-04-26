import { CreateTxOptions } from "@terra-money/terra.js";
import {
  ConnectType,
  ConnectedWallet,
  Connection,
  Installation,
  WalletStatus,
  useConnectedWallet,
  useWallet,
} from "@terra-money/wallet-provider";
import { useEffect, useMemo } from "react";
import { TerraWalletIDs } from "@types-slice/wallet";
import { mainnet } from "../chainOptions";
import { WalletProxy } from "../types";

type Connect = (type?: ConnectType, identifier?: string) => void;
type Disconnect = () => void;

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
    const safePalId: TerraWalletIDs = "SafePal";
    const safePal = availableConnections.find(
      (x) => x.identifier === safePalId
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
  connect: Connect,
  disconnect: Disconnect
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
              connect(
                wallet.connection.type,
                wallet.connection.identifier as TerraWalletIDs
              )
            )
          ),
        disconnect: () => new Promise((resolve) => resolve(disconnect())),
      }
    : undefined;
}

function getAvailableWallets(
  availableConnections: Connection[],
  connect: Connect,
  disconnect: Disconnect
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

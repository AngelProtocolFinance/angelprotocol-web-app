import {
  Connection as ConnectionTerraJs,
  ConnectType as ConnectTypeTerraJs,
} from "@terra-money/wallet-provider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Connection, IWalletContext, WalletProxy } from "../types";
import createDefaultWallet from "./createDefaultWallet";
import useTerraJsWallet from "./useTerraJsWallet";
import useTorusWallet from "./useTorusWallet";

export default function useWalletProxy(): IWalletContext {
  const {
    availableConnections,
    availableInstallations,
    status: statusTerraJs,
    wallet: walletTerraJs,
    connect: connectTerraJs,
    disconnect: disconnectTerraJs,
  } = useTerraJsWallet();
  const {
    status: statusTorus,
    wallet: walletTorus,
    connect: connectTorus,
    disconnect: disconnectTorus,
  } = useTorusWallet();

  const [wallet, setWallet] = useState<WalletProxy>();

  const connect = useCallback(
    async (connection: Connection) => {
      if (connection.type === "TORUS") {
        await connectTorus();
      } else {
        // if not Torus, then must be one of inherent Terra.js connect types
        const terraJsType = connection.type as keyof typeof ConnectTypeTerraJs;
        connectTerraJs(ConnectTypeTerraJs[terraJsType], connection.identifier);
      }
    },
    [connectTerraJs, connectTorus]
  );

  const disconnect = useCallback(async () => {
    if (!wallet) {
      return;
    }
    if (wallet.connection.type === "TORUS") {
      await disconnectTorus();
    } else {
      disconnectTerraJs();
    }
  }, [wallet, disconnectTorus, disconnectTerraJs]);

  useEffect(() => {
    if (walletTerraJs) {
      setWallet(walletTerraJs);
    } else if (walletTorus) {
      setWallet(walletTorus);
    } else {
      setWallet(undefined);
    }
  }, [walletTerraJs, walletTorus]);

  const availableWallets = useMemo(
    () => getAvailableWallets(availableConnections).concat(walletTorus),
    [availableConnections, walletTorus]
  );

  const walletContext: IWalletContext = useMemo(
    () => ({
      connect,
      disconnect,
      wallet,
      availableInstallations,
      availableWallets,
      status: wallet?.connection.type === "TORUS" ? statusTorus : statusTerraJs,
    }),
    [
      connect,
      disconnect,
      availableWallets,
      availableInstallations,
      statusTerraJs,
      statusTorus,
      wallet,
    ]
  );

  return walletContext;
}

function getAvailableWallets(
  availableConnections: ConnectionTerraJs[]
): WalletProxy[] {
  return availableConnections
    .map<Connection>((conn) => ({
      identifier: conn.identifier,
      name: conn.name,
      icon: conn.icon,
      type: conn.type,
    }))
    .map<WalletProxy>((conn) => createDefaultWallet(conn));
}

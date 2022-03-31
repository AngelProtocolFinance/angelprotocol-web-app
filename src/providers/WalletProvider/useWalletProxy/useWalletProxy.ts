import {
  Connection as ConnectionTerraJs,
  ConnectType as ConnectTypeTerraJs,
  useConnectedWallet,
  useWallet,
} from "@terra-money/wallet-provider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TerraIdentifiers } from "services/wallet/types";
import { Connection, IWalletContext, WalletProxy } from "../types";
import createDefaultWallet from "./createDefaultWallet";
import useTorusWallet from "./useTorusWallet";

export default function useWalletProxy(): IWalletContext {
  const {
    connect: connectTerraJs,
    disconnect: disconnectTerraJs,
    availableConnections,
    availableInstallations,
    status: statusTerraJs,
  } = useWallet();
  const walletTerraJs = useConnectedWallet();
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
      setWallet({
        address: walletTerraJs.walletAddress,
        connection: walletTerraJs.connection,
        network: walletTerraJs.network,
        post: walletTerraJs.post,
      });
    } else if (walletTorus) {
      setWallet(walletTorus);
    } else {
      setWallet(undefined);
    }
  }, [walletTerraJs, walletTorus]);

  // Automatically connect with SafePal if and when available
  useEffect(() => {
    async function checkSafePal() {
      const safePal = availableConnections.find(
        (x) => x.identifier === TerraIdentifiers.safepal
      );

      if (safePal) {
        await disconnect();
        await connect(safePal);
      }
    }

    checkSafePal();
  }, [availableConnections, connect, disconnect]);

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

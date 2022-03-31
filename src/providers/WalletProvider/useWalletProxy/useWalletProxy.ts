import { ConnectType } from "@terra-money/wallet-provider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Connection, IWalletContext, WalletProxy } from "../types";
import useTerraJsWallet from "./useTerraJsWallet";
import useTorusWallet from "./useTorusWallet";

export default function useWalletProxy(): IWalletContext {
  const {
    availableWallets,
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
        const terraJsType = connection.type as keyof typeof ConnectType;
        connectTerraJs(ConnectType[terraJsType], connection.identifier);
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

  const walletContext: IWalletContext = useMemo(
    () => ({
      connect,
      disconnect,
      wallet,
      availableInstallations,
      availableWallets: availableWallets.concat(walletTorus),
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
      walletTorus,
    ]
  );

  return walletContext;
}

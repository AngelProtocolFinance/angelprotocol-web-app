import { CreateTxOptions, Wallet } from "@terra-money/terra.js";
import {
  Connection as ConnectionTerraJs,
  ConnectType as ConnectTypeTerraJs,
  useConnectedWallet,
  useWallet,
} from "@terra-money/wallet-provider";
import torusIcon from "assets/icons/wallets/torus.jpg";
import { chainIDs } from "constants/chainIDs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TerraIdentifiers } from "services/wallet/types";
import { Connection, IWalletContext, localterra, WalletProxy } from "../types";
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
      const newWallet = createWalletFromTorus(walletTorus);
      setWallet(newWallet);
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

  const walletContext: IWalletContext = useMemo(
    () => ({
      connect,
      disconnect,
      wallet,
      availableInstallations,
      availableWallets: getAvailableWallets(availableConnections),
      status: wallet?.connection.type === "TORUS" ? statusTorus : statusTerraJs,
      network: wallet ? wallet.network : localterra,
    }),
    [
      connect,
      disconnect,
      availableConnections,
      availableInstallations,
      statusTerraJs,
      statusTorus,
      wallet,
    ]
  );

  return walletContext;
}

const TORUS_CONNECTION: Connection = {
  identifier: "torus",
  name: "Torus",
  type: "TORUS",
  icon: torusIcon,
};

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
    .concat(TORUS_CONNECTION)
    .map<WalletProxy>((conn) => ({
      address: "",
      connection: conn,
      network: localterra,
      post: (_: CreateTxOptions) => {
        throw Error("Not connected");
      },
    }));
}

function createWalletFromTorus(torusWallet: Wallet): WalletProxy {
  const networkName =
    Object.entries(chainIDs).find(
      ([_, value]) => value === torusWallet.lcd.config.chainID
    )?.[0] || "";

  return {
    address: torusWallet.key.accAddress,
    connection: TORUS_CONNECTION,
    network: {
      chainID: torusWallet.lcd.config.chainID,
      lcd: torusWallet.lcd.config.URL,
      name: networkName,
    },
    post: async (txOptions: CreateTxOptions) => {
      const tx = await torusWallet.createAndSignTx(txOptions);
      const res = await torusWallet.lcd.tx.broadcast(tx);
      return {
        ...txOptions,
        result: {
          height: res.height,
          raw_log: res.raw_log,
          txhash: res.txhash,
        },
        success: true,
      };
    },
  };
}

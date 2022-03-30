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
import {
  Connection,
  ConnectType,
  localterra,
  IWalletContext,
  WalletProxy,
} from "../types";
import useTorusWallet from "./useTorusWallet";

export default function useWalletProxy(): IWalletContext {
  const {
    connect: connectTerraJs,
    disconnect: disconnectTerraJs,
    availableConnections,
    availableInstallations,
    status: statusTerraJs,
    network: networkTerraJs,
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
    async (type: ConnectType, identifier: string) => {
      if (type === "TORUS") {
        await connectTorus();
      } else {
        // if not Torus, then must be one of inherent Terra.js connect types
        const terraJsType = type as keyof typeof ConnectTypeTerraJs;
        connectTerraJs(ConnectTypeTerraJs[terraJsType], identifier);
      }
    },
    [connectTerraJs, connectTorus]
  );

  const disconnect = useCallback(async () => {
    if (!wallet) {
      return;
    }
    if (wallet.connectType === "TORUS") {
      await disconnectTorus();
    } else {
      disconnectTerraJs();
    }
  }, [wallet, disconnectTorus, disconnectTerraJs]);

  useEffect(() => {
    if (walletTerraJs) {
      setWallet({
        connectType: walletTerraJs.connectType,
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

  const walletProxy = useMemo(
    () => ({
      connect,
      disconnect,
      wallet,
      availableInstallations,
      status: wallet?.connectType !== "TORUS" ? statusTerraJs : statusTorus,
      availableConnections:
        getWrappedAvailableConnections(availableConnections),
      network: wallet?.connectType !== "TORUS" ? networkTerraJs : localterra,
    }),
    [
      connect,
      disconnect,
      availableConnections,
      availableInstallations,
      statusTerraJs,
      statusTorus,
      networkTerraJs,
      wallet,
    ]
  );

  return walletProxy;
}

const TORUS_CONNECTION: Connection = {
  identifier: "torus",
  name: "Torus",
  type: "TORUS",
  icon: torusIcon,
};

function getWrappedAvailableConnections(
  availableConnections: ConnectionTerraJs[]
): Connection[] {
  return availableConnections
    .map(
      (x) =>
        ({
          identifier: x.identifier,
          name: x.name,
          icon: x.icon,
          type: x.type,
        } as Connection)
    )
    .concat(TORUS_CONNECTION);
}

function createWalletFromTorus(torusWallet: Wallet): WalletProxy {
  const networkName =
    Object.entries(chainIDs).find(
      ([_, value]) => value === torusWallet.lcd.config.chainID
    )?.[0] || "";

  return {
    address: torusWallet.key.accAddress,
    connection: TORUS_CONNECTION,
    connectType: "TORUS",
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

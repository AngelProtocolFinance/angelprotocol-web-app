import {
  ConnectType,
  type Installation,
  type Connection as TerraConnection,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import type {
  TerraProviderState,
  TerraWalletID,
  Wallet,
  WalletMeta,
} from "types/wallet";
import { isXdefiPrioritized } from "./helpers/isXdefiPrioritized";

const XDEFI_ID: TerraWalletID = "xdefi-wallet";
export default function useTerra() {
  const {
    availableConnections,
    availableInstallations,
    network,
    wallets,
    connect,
    connection,
    status,
    disconnect,
    post,
  } = useWallet();

  const wallet = (c: Installation | TerraConnection): Wallet => {
    const meta: WalletMeta = {
      //terra wallets share the same state, always use active connection meta
      name: connection?.name || c.name,
      logo: connection?.icon || c.icon,
      supportedChains: ["phoenix-1", "pisco-1"],
    };

    const state: TerraProviderState =
      status === WalletStatus.INITIALIZING
        ? { status: "loading" }
        : WalletStatus.WALLET_CONNECTED && wallets[0]
          ? {
              id: (c.identifier || c.type.toLowerCase) as TerraWalletID,
              status: "connected",
              isSwitching: false,
              address: wallets[0].terraAddress,
              chainId: network.chainID,
              post,
            }
          : { status: "disconnected" };

    return {
      ...state,
      ...meta,
      ...{
        connect() {
          //if installation
          if ("url" in c) {
            return window.open(c.url, "_blank", "noopener noreferrer");
          }
          if (c.identifier !== XDEFI_ID && isXdefiPrioritized()) {
            return alert("Kindly remove priority to Xdefi and reload the page");
          }
          try {
            connect(c.type, c.identifier);
          } catch (_) {
            alert("Failed to connect to wallet");
          }
        },
        disconnect,
        switchChain: null,
      },
    };
  };

  const terraWC: TerraConnection = {
    name: "Terra mobile",
    type: ConnectType.WALLETCONNECT,
    icon: "/icons/wallets/terra-extension.jpg",
  };

  return {
    extensions: availableConnections
      .filter(whitelist)
      .map((c) => wallet(c))
      .concat(availableInstallations.filter(whitelist).map((i) => wallet(i))),
    wc: wallet(terraWC),
  };
}

function whitelist<T extends TerraConnection | Installation>(conn: T) {
  const id = conn.identifier;
  return id === XDEFI_ID || id === "leap-wallet" || id === "station";
}

import { useWallet } from "@terra-money/wallet-provider";
import { toast } from "react-toastify";
import { ProviderId, Wallet } from "./types";
import {
  ConnectType,
  TerraConnection,
  TerraInstallation,
  WalletStatus,
} from "types/terra";
import { Dwindow } from "types/window";

const XDEFI_ID = "xdefi-wallet";
export default function useTerra2(): Wallet[] {
  const {
    availableConnections,
    availableInstallations,
    connection,
    network,
    wallets,
    status,
    connect,
    disconnect,
    post,
  } = useWallet();

  function toWallet(c: TerraInstallation | TerraConnection): Wallet {
    return {
      id: (c?.identifier as ProviderId) || c.type.toLowerCase(),
      type: "terra",
      logo: connection?.icon || c.icon,
      name: c.name,
      ...(status === WalletStatus.INITIALIZING
        ? { status: "loading" }
        : WalletStatus.WALLET_CONNECTED && wallets[0]
        ? {
            status: "connected",
            disconnect,
            address: wallets[0].terraAddress,
            chainId: network.chainID,
            post,
          }
        : {
            status: "disconnected",
            connect: () => {
              /** if installation */
              if ("url" in c) {
                window.open(c.url, "_blank", "noopener noreferrer");
              } else {
                /** don't connect terra if xdefi is prioritized*/
                const xfiEth = (window as Dwindow).xfi?.ethereum;
                if (c.identifier !== XDEFI_ID && xfiEth?.isMetaMask) {
                  return toast.warning(
                    "Kindly remove priority to Xdefi and reload the page"
                  );
                }
                connect(c.type, c.identifier);
              }
            },
          }),
    };
  }

  return availableConnections
    .filter(_filter)
    .map((c) => toWallet(c))
    .concat(availableInstallations.filter(_filter).map((i) => toWallet(i)));
}

function _filter<T extends TerraConnection | TerraInstallation>(conn: T) {
  const id = conn.identifier;
  return (
    id === XDEFI_ID ||
    id === "leap-wallet" ||
    id === "station" ||
    conn.type === ConnectType.WALLETCONNECT
  );
}

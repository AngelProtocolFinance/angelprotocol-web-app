import {
  ConnectType,
  Connection,
  Installation,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import { toast } from "react-toastify";
import { ProviderId, Wallet } from "./types";
import stationIcon from "assets/icons/wallets/terra-extension.jpg";
import { isXdefiPrioritized } from "./helpers/assertions";

const XDEFI_ID = "xdefi-wallet";
export default function useTerra(): { extensions: Wallet[]; wc: Wallet } {
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

  function toWallet(c: Installation | Connection): Wallet {
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
                if (c.identifier !== XDEFI_ID && isXdefiPrioritized()) {
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

  const terraWC: Connection = {
    name: "Terra mobile",
    type: ConnectType.WALLETCONNECT,
    icon: stationIcon,
  };

  return {
    extensions: availableConnections
      .filter(_filter)
      .map((c) => toWallet(c))
      .concat(availableInstallations.filter(_filter).map((i) => toWallet(i))),
    wc: toWallet(terraWC),
  };
}

function _filter<T extends Connection | Installation>(conn: T) {
  const id = conn.identifier;
  return id === XDEFI_ID || id === "leap-wallet" || id === "station";
}

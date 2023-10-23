import {
  ConnectType,
  Installation,
  Connection as TerraConnection,
  Wallet as TerraWallet,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import {
  Connector,
  TerraProviderState,
  TerraWalletID,
  Wallet,
  WalletID,
  WalletMeta,
} from "types/wallet";

export default function useTerra() {
  const {
    availableConnections,
    availableInstallations,
    connection: terraConnection,
    network,
    wallets,
    connect,
    status,
    disconnect,
    post,
  } = useWallet();

  const state: TerraProviderState =
    /** wallets contain wc entry even terraAddress is not resolved */
    terraConnection && wallets[0].terraAddress
      ? {
          // terra providerIDs are simply from their connection identifiers
          id:
            terraConnection.type === ConnectType.WALLETCONNECT
              ? "walletconnect"
              : (terraConnection.identifier as TerraWalletID),
          status: "connected",
          address: wallets[0].terraAddress,
          chainId: network.chainID,
          post,
        }
      : status === WalletStatus.INITIALIZING
      ? { status: "loading" }
      : { status: "disconnected" };

  const connection = connectionFn(
    availableConnections,
    availableInstallations,
    connect
  );
  const wallet = walletFn(state, disconnect);
  //unpack terra connections so can be ordered later on
  const station = wallet(connection("station"));
  const xdefiTerra = wallet(connection("xdefi-wallet"));
  const leap = wallet(connection("leap-wallet"));
  const stationMobile = wallet(connection("walletconnect"));

  return {
    station,
    xdefiTerra,
    leap,
    stationMobile,
  };
}

type Connection = Omit<WalletMeta, "type"> & Connector;
const walletFn =
  (state: TerraProviderState, disconnect: TerraWallet["disconnect"]) =>
  ({ connect, ...meta }: Connection): Wallet => ({
    ...state,
    ...meta,

    ...{ connect, disconnect, switchChain: null },
  });

const connectionFn =
  (
    connections: TerraConnection[],
    installations: Installation[],
    connectTerra: TerraWallet["connect"]
  ) =>
  (walletID: WalletID): Connection => {
    if (walletID === "walletconnect") {
      return {
        name: "Terra Station Mobile",
        logo: "/icons/wallets/terra-extension.jpg",
        async connect() {
          connectTerra(ConnectType.WALLETCONNECT);
        },
      };
    }
    // terra providerIDs are simply from their connection identifiers
    const connection = connections.find((x) => x.identifier === walletID);

    if (connection) {
      return {
        name: connection.name,
        logo: connection.icon,
        connect: async () =>
          connectTerra(connection.type, connection.identifier),
      };
    }
    const installation = installations.find((x) => x.identifier === walletID);
    if (installation) {
      return {
        name: installation.name,
        logo: installation.icon,
        connect: async () => {
          window.open(installation.url, "_blank", "noopener noreferrer");
        },
      };
    }

    //this should never happen, missing connection always have installation counterpart
    return {
      name: "Unknown wallet",
      logo: "",
      connect: () => {
        throw new Error("Unknown wallet");
      },
    };
  };

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
  ProviderState,
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
  } = useWallet();

  const state: ProviderState =
    /** wallets contain wc entry even terraAddress is not resolved */
    terraConnection && wallets[0].terraAddress
      ? {
          status: "connected",
          address: wallets[0].terraAddress,
          chainId: network.chainID,
          isSwitchingChain: false,
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
  (state: ProviderState, disconnect: TerraWallet["disconnect"]) =>
  ({ connect, ...meta }: Connection): Wallet => ({
    ...state,
    ...meta,
    type: "terra",
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
        id: "walletconnect",
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
        id: walletID,
        name: connection.name,
        logo: connection.icon,
        connect: async () =>
          connectTerra(connection.type, connection.identifier),
      };
    }
    const installation = installations.find((x) => x.identifier === walletID);
    if (installation) {
      return {
        id: walletID,
        name: installation.name,
        logo: installation.icon,
        connect: async () => {
          window.open(installation.url, "_blank", "noopener noreferrer");
        },
      };
    }

    //this should never happen, missing connection always have installation counterpart
    return {
      id: "station",
      name: "Unknown wallet",
      logo: "",
      connect: () => {
        throw new Error("Unknown wallet");
      },
    };
  };

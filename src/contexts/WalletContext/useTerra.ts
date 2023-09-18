import {
  ConnectType,
  Installation,
  Connection as TerraConnection,
  Wallet,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import { chainIDs } from "constant/chains";
import { IS_TEST } from "constant/env";
import { Connection, ProviderInfo } from "./types";
import { BaseChain } from "types/aws";
import { ProviderId } from "types/lists";
import {
  ManualChainSwitchRequiredError,
  UnsupportedChainError,
  WalletDisconnectedError,
} from "errors/errors";

const SUPPORTED_CHAINS: BaseChain[] = IS_TEST
  ? [{ chain_id: chainIDs.terraTest, chain_name: "Terra Testnet" }]
  : [{ chain_id: chainIDs.terraMain, chain_name: "Terra Mainnet" }];

export default function useTerra() {
  const {
    availableConnections,
    availableInstallations,
    connection,
    network,
    wallets,
    status,
    connect,
    disconnect,
  } = useWallet();

  const terraInfo: ProviderInfo | undefined =
    /** wallets contain wc entry even terraAddress is not resolved */
    connection && wallets[0].terraAddress
      ? {
          providerId:
            //use connect type as Id if no futher connections stems out of the type
            (connection?.identifier as ProviderId) ||
            connection.type.toLowerCase(),
          logo: connection?.icon!,
          chainId: network.chainID,
          address: wallets[0].terraAddress,
        }
      : undefined;

  const connectionFn = genConnectionFn(
    availableConnections,
    availableInstallations,
    connect
  );
  //unpack terra connections so can be ordered later on
  const stationConnection = connectionFn("station");
  const xdefiTerraConnection = connectionFn("xdefi-wallet");
  const leapConnection = connectionFn("leap-wallet");
  const stationMobileConnection = connectionFn("walletconnect");

  const switchChain = async (chainId: chainIDs) => {
    if (!connection) {
      throw new WalletDisconnectedError();
    }

    if (!SUPPORTED_CHAINS.some((x) => x.chain_id === chainId)) {
      throw new UnsupportedChainError(chainId);
    }

    throw new ManualChainSwitchRequiredError(chainId);
  };

  return {
    isTerraLoading: status === WalletStatus.INITIALIZING,
    stationConnection,
    xdefiTerraConnection,
    leapConnection,
    stationMobileConnection,
    disconnectTerra: disconnect,
    terraInfo,
    switchChain,
    supportedChains: SUPPORTED_CHAINS,
  };
}

const genConnectionFn =
  (
    connections: TerraConnection[],
    installations: Installation[],
    connectTerra: Wallet["connect"]
  ) =>
  (providerId: ProviderId): Connection => {
    if (providerId === "walletconnect") {
      return {
        providerId: "walletconnect",
        name: "Terra Station Mobile",
        logo: "/icons/wallets/terra-extension.jpg",
        async connect() {
          connectTerra(ConnectType.WALLETCONNECT);
        },
      };
    }
    // terra providerIDs are simply from their connection identifiers
    const connection = connections.find((x) => x.identifier === providerId);

    if (connection) {
      return {
        providerId,
        name: connection.name,
        logo: connection.icon,
        connect: async () =>
          connectTerra(connection.type, connection.identifier),
      };
    }
    const installation = installations.find((x) => x.identifier === providerId);
    if (installation) {
      return {
        providerId,
        name: installation.name,
        logo: installation.icon,
        connect: async () => {
          window.open(installation.url, "_blank", "noopener noreferrer");
        },
      };
    }

    //this should never happen, missing connection always have installation counterpart
    return {
      providerId: "station",
      name: "Unknown wallet",
      logo: "",
      connect: () => {
        throw new Error("Unknown wallet");
      },
    };
  };

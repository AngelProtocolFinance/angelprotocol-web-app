import station_icon from "@giving/assets/icons/wallets/terra-extension.jpg";
import { chainIDs } from "@giving/constants/chains";
import { IS_TEST } from "@giving/constants/env";
import {
  ConnectType,
  Installation,
  Connection as TerraConnection,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import { Connection, ProviderId, ProviderInfo } from "./types";
import { BaseChain } from "@giving/types/aws";
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

  const terraConnections: Connection[] = availableConnections
    .filter(_filter)
    .map((connection) => ({
      logo: connection.icon,
      name: connection.name,
      connect: async () => {
        connect(connection.type, connection.identifier);
      },
    }))
    .concat(
      availableInstallations.filter(_filter).map(({ name, icon, url }) => ({
        logo: icon,
        name,
        connect: async () => {
          window.open(url, "_blank", "noopener noreferrer");
        },
      }))
    );

  const wcConnection: Connection = {
    name: "Terra Station Mobile",
    logo: station_icon,
    async connect() {
      connect(ConnectType.WALLETCONNECT);
    },
  };

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
    terraConnections,
    wcConnection,
    disconnectTerra: disconnect,
    terraInfo,
    switchChain,
    supportedChains: SUPPORTED_CHAINS,
  };
}

function _filter<T extends TerraConnection | Installation>(conn: T) {
  const identifier = conn.identifier as ProviderId;

  return (
    identifier === "xdefi-wallet" ||
    identifier === "leap-wallet" ||
    identifier === "station"
  );
}

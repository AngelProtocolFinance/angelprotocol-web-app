import {
  ConnectType,
  Installation,
  Connection as TerraConnection,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import { Connection, ProviderId, ProviderInfo } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import {
  UnexpectedStateError,
  UnsupportedNetworkError,
  WalletDisconnectedError,
} from "errors/errors";
import { chainIDs } from "constants/chains";
import { useGetSupportedChains } from "./hooks";

const SUPPORTED_CHAIN_IDS = [chainIDs.terraMain, chainIDs.terraTest];

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

  const { showModal } = useModalContext();

  const { supportedChains, isLoading: areChainsLoading } =
    useGetSupportedChains(SUPPORTED_CHAIN_IDS);

  const terraInfo: ProviderInfo | undefined = connection
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

  const switchChain = async (chainId: chainIDs) => {
    if (!connection) {
      throw new WalletDisconnectedError();
    }

    if (areChainsLoading) {
      throw new UnexpectedStateError("Chains are still being loaded");
    }

    if (!SUPPORTED_CHAIN_IDS.includes(chainId)) {
      throw new UnsupportedNetworkError(chainId);
    }

    showModal(Popup, {
      message: `Please use your wallet to switch to ${chainId} chain and reload the page`,
    });
  };

  return {
    isTerraLoading: status === WalletStatus.INITIALIZING || areChainsLoading,
    terraConnections,
    disconnectTerra: disconnect,
    terraInfo,
    switchChain,
    supportedChains,
  };
}

function _filter<T extends TerraConnection | Installation>(conn: T) {
  const identifier = conn.identifier as ProviderId;

  return (
    identifier === "xdefi-wallet" ||
    identifier === "leap-wallet" ||
    identifier === "station" ||
    conn.type === ConnectType.WALLETCONNECT
  );
}

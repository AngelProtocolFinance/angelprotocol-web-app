import {
  ConnectType,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import { Connection, ProviderId, ProviderInfo, WalletData } from "./types";
import { WALLET_METADATA } from "./constants";
import {
  removeConnectedProvider,
  storeConnectedProvider,
} from "./helpers/connectedProvider";

export default function useTerra(): WalletData {
  const {
    availableConnections,
    connection,
    network,
    wallets,
    status,
    connect,
    disconnect,
  } = useWallet();

  const providerInfo: ProviderInfo | undefined = connection
    ? {
        providerId:
          //use connect type as Id if no further connections stems out of the type
          (connection.identifier as ProviderId) ||
          connection.type.toLowerCase(),
        logo: connection?.icon!,
        chainId: network.chainID,
        address: wallets[0].terraAddress,
      }
    : undefined;

  const connections: Connection[] = availableConnections
    .filter(
      (connection) =>
        !(
          connection.identifier === "xdefi-wallet" ||
          connection.type === ConnectType.READONLY
        )
    )
    .map((connection) => ({
      logo: connection.icon,
      name: connection.name,
      installUrl: connection.identifier
        ? WALLET_METADATA[connection.identifier as ProviderId]?.installUrl // --> if the connection.identifier is unsupported, we do not fill out the install URL field
        : undefined,
      providerId: connection.identifier as ProviderId,
      connect: async () => {
        connect(connection.type, connection.identifier);
        storeConnectedProvider(connection.identifier as ProviderId);
      },
    }));

  const disconnectTerra = () => {
    disconnect();
    removeConnectedProvider();
  };

  return {
    isLoading: status === WalletStatus.INITIALIZING,
    connections,
    disconnect: disconnectTerra,
    providerInfo,
  };
}

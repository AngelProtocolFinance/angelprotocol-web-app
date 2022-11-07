import {
  ConnectType,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import { Connection, ProviderId, ProviderInfo } from "./types";
import { WALLET_METADATA } from "./constants";

export default function useTerra() {
  const {
    availableConnections,
    connection,
    network,
    wallets,
    status,
    connect,
    disconnect,
  } = useWallet();

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

  console.log(availableConnections);

  const terraConnections: Connection[] = availableConnections
    .filter(
      ({ type, identifier }) =>
        identifier === "leap-wallet" ||
        identifier === "station" ||
        type === ConnectType.WALLETCONNECT
    )
    .map((connection) => ({
      logo: connection.icon,
      name: connection.name,
      installUrl: connection.identifier
        ? WALLET_METADATA[connection.identifier as ProviderId]?.installUrl // --> if the connection.identifier is unsupported, we do not fill out the install URL field
        : undefined,
      connect: async () => {
        connect(connection.type, connection.identifier);
      },
    }));

  return {
    isTerraLoading: status === WalletStatus.INITIALIZING,
    terraConnections,
    disconnectTerra: disconnect,
    terraInfo,
  };
}

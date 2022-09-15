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

  const terraConnections: Connection[] = availableConnections
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
      installUrl:
        WALLET_METADATA[connection.identifier as ProviderId].installUrl,
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

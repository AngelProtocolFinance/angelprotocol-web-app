import {
  ConnectType,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import {
  Installation,
  ProviderId,
  ProviderInfo,
  SingleConnection,
} from "./types";

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

  const terraConnections: SingleConnection[] = availableConnections
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
      connect: async () => {
        connect(connection.type, connection.identifier);
      },
    }));

  const terraInstallations: Installation[] = availableInstallations
    .filter(
      (installer) =>
        ![
          "bitkeep-wallet",
          "xdefi-wallet" /**even installed, still shows here if not prioritized, 
          a more generalized connected useXdefi is used */,
        ].includes(installer.identifier)
    )
    .map((installer) => ({
      logo: installer.icon,
      url: installer.url,
    }));

  return {
    isTerraLoading: status === WalletStatus.INITIALIZING,
    terraConnections,
    terraInstallations,
    disconnectTerra: disconnect,
    terraInfo,
  };
}

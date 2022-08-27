import {
  ConnectType,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import { Connection, Wallet, WalletId } from "../types";

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

  const wallet: Wallet | undefined = connection
    ? {
        id:
          //use connect type as Id if no futher connections stems out of the type
          (connection?.identifier as WalletId) || connection.type.toLowerCase(),
        logo: connection?.icon!,
        chainId: network.chainID,
        address: wallets[0].terraAddress,
      }
    : undefined;

  const terraConnections = availableConnections
    .filter(
      (connection) =>
        connection.identifier === "station" ||
        connection.type === ConnectType.WALLETCONNECT
    )
    .map(
      (connection) =>
        ({
          id: connection.identifier,
          logo: connection.icon,
          name: connection.name,
          connect: async () => {
            connect(connection.type, connection.identifier);
          },
        } as Connection)
    );

  return {
    isTerraLoading: status === WalletStatus.INITIALIZING,
    terraConnections,
    disconnectTerra: disconnect,
    wallet,
  };
}

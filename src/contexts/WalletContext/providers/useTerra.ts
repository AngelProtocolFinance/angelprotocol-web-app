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

  const terraConnections: Connection[] = availableConnections
    .filter(
      (connection) =>
        !(
          connection.identifier === "leap-wallet" ||
          connection.identifier === "falcon-wallet" ||
          connection.identifier === "bitkeep-wallet" ||
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

  return {
    isTerraLoading: status === WalletStatus.INITIALIZING,
    terraConnections,
    disconnectTerra: disconnect,
    wallet,
  };
}

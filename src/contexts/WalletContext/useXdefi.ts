import { WalletStatus, useWallet } from "@terra-money/wallet-provider";
import { Connection, ProviderId, ProviderInfo } from "./types";
import evmIcon from "assets/icons/evm.webp";
import terraIcon from "assets/icons/terra.png";
import { WALLET_METADATA } from "./constants";
import checkXdefiPriority from "./helpers/checkXdefiPriority";
import useInjectedProvider from "./useInjectedProvider";

type Result = {
  isLoading: boolean;
  disconnect: () => void;
  connection: Connection;
  providerInfo: ProviderInfo | undefined;
};

export default function useXdefi() {
  const evmProvider = useInjectedProvider(
    "xdefi-evm",
    "xdefi (Ethereum)",
    evmIcon
  );

  const {
    availableConnections,
    connect,
    status,
    disconnect,
    network,
    wallets,
  } = useWallet();

  const connection = availableConnections.find(
    (connection) => connection.identifier === "xdefi-wallet"
  );

  const xdefiTerraConnection: Connection = {
    logo: terraIcon, //this connector will appear on network selection
    name: "xdefi (Terra)",
    installUrl: WALLET_METADATA["xdefi-wallet"].installUrl,
    connect: async () => {
      if (connection) {
        connect(connection.type, connection.identifier);
      } else {
        checkXdefiPriority();
      }
    },
  };

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

  const terraProvider: Result = {
    connection: xdefiTerraConnection,
    isLoading: status === WalletStatus.INITIALIZING,
    disconnect,
    providerInfo: terraInfo,
  };

  return [evmProvider, terraProvider];
}

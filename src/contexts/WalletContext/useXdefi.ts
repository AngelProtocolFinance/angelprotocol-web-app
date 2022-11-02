import { useWallet } from "@terra-money/wallet-provider";
import { Connection } from "./types";
import evmIcon from "assets/icons/evm.webp";
import terraIcon from "assets/icons/terra.png";
import { WALLET_METADATA } from "./constants";
import checkXdefiPriority from "./helpers/checkXdefiPriority";
import { storeConnectedProvider } from "./helpers/connectedProvider";
import useInjectedProvider from "./useInjectedProvider";

export default function useXdefi() {
  const { availableConnections, connect } = useWallet();
  const {
    isLoading: isxdefiEVMLoading,
    connection: xdefiEVMConnection,
    disconnect: disconnectEVMxdefi,
    providerInfo: xdefiEVMinfo,
  } = useInjectedProvider("xdefi-evm", "Ethereum", evmIcon);

  const connection = availableConnections.find(
    (connection) => connection.identifier === "xdefi-wallet"
  );

  const xdefiTerraConnection: Connection = {
    logo: terraIcon, //this connector will appear on network selection
    name: "Terra",
    installUrl: WALLET_METADATA["xdefi-wallet"].installUrl,
    providerId: "xdefi-wallet",
    connect: async () => {
      if (connection) {
        connect(connection.type, connection.identifier);
        storeConnectedProvider("xdefi-wallet");
      } else {
        // Errors within handled in src/components/WalletSuite/WalletSelector/Connector.tsx
        checkXdefiPriority();
      }
    },
  };

  const xdefiConnection: Connection = {
    name: "xdefi",
    logo: WALLET_METADATA["xdefi-wallet"].logo,
    installUrl: WALLET_METADATA["xdefi-wallet"].installUrl,
    networks: [xdefiTerraConnection, xdefiEVMConnection],
    providerId: "xdefi-wallet",
  };

  return {
    //xdefi terra state is already reflected in useTerra
    isxdefiEVMLoading,
    disconnectEVMxdefi,
    xdefiEVMinfo,
    xdefiConnection,
  };
}

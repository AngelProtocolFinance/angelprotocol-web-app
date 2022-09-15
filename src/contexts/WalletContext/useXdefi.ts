import { useWallet } from "@terra-money/wallet-provider";
import { Connection } from "./types";
import terraIcon from "assets/icons/terra.png";
import { providerIcons, walletInstallUrls } from "./constants";
import checkXdefiPriority from "./helpers/checkXdefiPriority";
import useInjectedProvider from "./useInjectedProvider";

export default function useXdefi() {
  const { availableConnections, connect } = useWallet();
  const {
    isLoading: isxdefiEVMLoading,
    connection: xdefiEVMConnection,
    disconnect: disconnectEVMxdefi,
    providerInfo: xdefiEVMinfo,
  } = useInjectedProvider("xdefi-evm", "Ethereum");

  const connection = availableConnections.find(
    (connection) => connection.identifier === "xdefi-wallet"
  );

  const xdefiTerraConnection: Connection = {
    logo: terraIcon, //this connector will appear on network selection
    name: "Terra",
    installUrl: walletInstallUrls["xdefi-wallet"],
    connect: async () => {
      if (connection) {
        connect(connection.type, connection.identifier);
      } else {
        // Errors within handled in src/components/WalletSuite/WalletSelector/Connector.tsx
        checkXdefiPriority();
      }
    },
  };

  const xdefiConnection: Connection = {
    name: "xdefi",
    logo: providerIcons["xdefi-wallet"],
    installUrl: walletInstallUrls["xdefi-wallet"],
    networks: [xdefiTerraConnection, xdefiEVMConnection],
  };

  return {
    //xdefi terra state is already reflected in useTerra
    isxdefiEVMLoading,
    disconnectEVMxdefi,
    xdefiEVMinfo,
    xdefiConnection,
  };
}

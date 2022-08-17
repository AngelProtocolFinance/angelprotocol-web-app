import { useWallet } from "@terra-money/wallet-provider";
import { Connection } from "./types";
import evmIcon from "assets/icons/evm.webp";
import terraIcon from "assets/icons/terra.png";
import checkXdefiPriority from "helpers/checkXdefiPriority";
import { providerIcons } from "./constants";
import useInjectedProvider from "./useInjectedProvider";

export default function useXdefi() {
  const { availableConnections, connect } = useWallet();
  const {
    isLoading: isxdefiEVMLoading,
    connection: xdefiEVMConnection,
    disconnect: disconnectEVMxdefi,
    providerInfo: xdefiEVMinfo,
  } = useInjectedProvider("xdefi-evm", evmIcon, "Ethereum");

  const connection = availableConnections.find(
    (connection) => connection.identifier === "xdefi-wallet"
  );

  const xdefiTerraConnection: Connection = connection
    ? {
        logo: terraIcon, //this connector will appear on network selection
        name: "Terra",
        connect: async () => {
          connect(connection.type, connection.identifier);
        },
      }
    : {
        logo: terraIcon,
        name: "Terra",
        connect: async () => {
          // Errors within handled in src/components/WalletSuite/WalletSelector/Connector.tsx
          checkXdefiPriority();
        },
      };

  const xdefiConnection: Connection = {
    name: "xdefi",
    logo: providerIcons["xdefi-wallet"],
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

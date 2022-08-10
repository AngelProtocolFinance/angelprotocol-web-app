import { useWallet } from "@terra-money/wallet-provider";
import { MultiConnection, SingleConnection } from "./types";
import evmIcon from "assets/icons/evm.webp";
import terraIcon from "assets/icons/terra.png";
import { providerIcons } from "./constants";
import checkXdefiPriority from "./helpers/checkXdefiPriority";
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

  const xdefiTerraConnection: SingleConnection = connection
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
          checkXdefiPriority();
        },
      };

  const xdefiConnection: MultiConnection = {
    name: "xdefi",
    logo: providerIcons["xdefi-wallet"],
    connections: [xdefiTerraConnection, xdefiEVMConnection],
  };

  return {
    //xdefi terra state is already reflected in useTerra
    isxdefiEVMLoading,
    disconnectEVMxdefi,
    xdefiEVMinfo,
    xdefiConnection,
  };
}

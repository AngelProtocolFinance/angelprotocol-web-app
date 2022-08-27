import { useWallet } from "@terra-money/wallet-provider";
import { Connection } from "../types";
import evmIcon from "assets/icons/evm.webp";
import terraIcon from "assets/icons/terra.png";
import { providerIcons } from "../constants";
import checkXdefiPriority from "./helpers/checkXdefiPriority";
import useInjectedProvider from "./useInjectedProvider";

export default function useXdefi() {
  const { availableConnections, connect } = useWallet();
  const {
    isLoading: isxdefiEVMLoading,
    connection: xdefiEVMConnection,
    disconnect: disconnectEVMxdefi,
    wallet: xdefiEVMWallet,
  } = useInjectedProvider("xdefi-evm", evmIcon, "Ethereum");

  const connection = availableConnections.find(
    (connection) => connection.identifier === "xdefi-wallet"
  );

  const xdefiTerraConnection: Connection = {
    id: "xdefi-wallet",
    logo: terraIcon, //this connector will appear on network selection
    name: "Terra",
    connect: async () => {
      if (connection) {
        connect(connection.type, connection.identifier);
      } else {
        checkXdefiPriority();
      }
    },
  };

  const xdefiConnection: Connection = {
    id: "xdefi",
    name: "xdefi",
    logo: providerIcons["xdefi"],
    networks: [xdefiTerraConnection, xdefiEVMConnection],
  };

  return {
    //xdefi terra state is already reflected in useTerra
    isxdefiEVMLoading,
    disconnectEVMxdefi,
    xdefiEVMWallet,
    xdefiConnection,
  };
}

import { MultiConnection } from "./types";
import evmIcon from "assets/icons/evm.webp";
import { providerIcons } from "./constants";
import useInjectedProvider from "./useInjectedProvider";

export default function useXdefi() {
  const {
    isLoading: isxdefiEVMLoading,
    connection: xdefiEVMConnection,
    disconnect: disconnectEVMxdefi,
    providerInfo: xdefiEVMinfo,
  } = useInjectedProvider("xdefi-evm", evmIcon, "Ethereum");

  const xdefiConnection: MultiConnection = {
    name: "xdefi",
    logo: providerIcons["xdefi-wallet"],
    connections: [xdefiEVMConnection],
  };

  return {
    //xdefi terra state is already reflected in useTerra
    isxdefiEVMLoading,
    disconnectEVMxdefi,
    xdefiEVMinfo,
    xdefiConnection,
  };
}

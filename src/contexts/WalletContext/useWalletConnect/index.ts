import { ConnectType, useWallet } from "@terra-money/wallet-provider";
import { Connection } from "../types";
import terraIcon from "assets/icons/terra.png";
import wcIcon from "assets/icons/wallets/wallet-connect.png";
import { IS_TEST } from "constants/env";
import useEVMWC from "./useEVMWC";
import useKeplrWC from "./useKeplrWC";

export default function useWalletConnect() {
  const { availableConnections, connect: connectToTerra } = useWallet();

  const connection = availableConnections.find(
    ({ type }) => type === ConnectType.WALLETCONNECT
  );

  const {
    isLoading: isEVMWCLoading,
    connection: EVMWCConnection,
    disconnect: disconnectEVMWC,
    providerInfo: EVMWCInfo,
  } = useEVMWC();

  const {
    isLoading: isKeplrWCLoading,
    connection: keplrWCConnection,
    disconnect: disconnectKeplrWC,
    providerInfo: keplrWCInfo,
  } = useKeplrWC();

  const wcTerra: Connection = {
    logo: terraIcon,
    name: "Terra station mobile",
    connect: async () => {
      if (connection) {
        connectToTerra(connection.type, connection.identifier);
      }
    },
  };

  const wcConnection: Connection = {
    name: "Wallet connect",
    logo: wcIcon,
    networks: [
      /** keplr wallet connect can't be used in testnet, experimental suggest chain isn't supported */
      ...(IS_TEST ? [] : [keplrWCConnection]),
      wcTerra,
      EVMWCConnection,
    ],
  };

  return {
    //terraWC state is already reflected in useTerra
    EVMWCInfo,
    isEVMWCLoading,
    disconnectEVMWC,

    keplrWCInfo,
    isKeplrWCLoading,
    disconnectKeplrWC,

    wcConnection,
  };
}

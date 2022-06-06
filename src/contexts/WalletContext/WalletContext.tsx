import {
  ConnectType,
  WalletStatus,
  useWallet,
} from "@terra-money/wallet-provider";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";
import {
  Connection,
  MultiConnection,
  ProviderId,
  ProviderInfo,
  ProviderStatuses,
  SingleConnection,
} from "./types";
import { WithBalance } from "services/types";
import evmIcon from "assets/icons/evm.webp";
import terraIcon from "assets/icons/terra.png";
import unknownWalletIcon from "assets/icons/wallets/unknown.svg";
import { placeHolderToken } from "services/apes/tokens/constants";
import { useBalancesQuery } from "services/apes/tokens/tokens";
import { chainIDs } from "constants/chainIDs";
import { placeHolderDisplayToken, providerIcons } from "./constants";
import useInjectedWallet from "./useInjectedProvider";
import useTorusWallet from "./useTorusWallet";

type IWalletState = {
  walletIcon: string;
  displayCoin: WithBalance;
  coins: WithBalance[];
  walletAddr: string;
  chainId: string;
  providerId?: ProviderId;
};

type IState = IWalletState & {
  isWalletLoading: boolean;
  isProviderLoading: boolean;
};

type Setters = {
  disconnect(): void;
  connections: Connection[];
};

const initialWalletState: IWalletState = {
  walletIcon: unknownWalletIcon,
  displayCoin: placeHolderToken,
  coins: [],
  walletAddr: "",
  chainId: chainIDs.eth_main,
};

const initialState: IState = {
  ...initialWalletState,
  isWalletLoading: true,
  isProviderLoading: true,
};

export default function WalletContext(props: PropsWithChildren<{}>) {
  const {
    isLoading: isMetamaskLoading, //requesting permission, attaching event listeners
    connection: metamaskConnection,
    disconnect: disconnectMetamask,
    providerInfo: metamaskInfo,
  } = useInjectedWallet("metamask");

  const {
    isLoading: isBinanceWalletLoading,
    connection: binanceWalletConnection,
    disconnect: disconnectBinanceWallet,
    providerInfo: binanceWalletInfo,
  } = useInjectedWallet("binance-wallet");

  const {
    isLoading: isxdefiEVMLoading,
    connection: xdefiEVMConnection,
    disconnect: disconnectEVMxdefi,
    providerInfo: xdefiEVMinfo,
  } = useInjectedWallet("xdefi-evm", evmIcon, "Ethereum");

  console.log({ isxdefiEVMLoading, xdefiEVMConnection, xdefiEVMinfo });

  const { isTorusLoading, torusInfo, torusConnection, disconnectTorus } =
    useTorusWallet();

  const {
    availableConnections,
    connection,
    network,
    wallets,
    status,
    connect,
    disconnect: disconnectTerra,
  } = useWallet();

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

  const terraConnections: SingleConnection[] = availableConnections
    .filter(
      (connection) =>
        !(
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

  const xDefiTerraConnection = ((): SingleConnection[] => {
    const connection = availableConnections.find(
      (connection) => connection.identifier === "xdefi-wallet"
    );
    if (connection) {
      return [
        {
          logo: terraIcon, //this connector will appear on network selection
          name: "Terra",
          connect: async () => {
            connect(connection.type, connection.identifier);
          },
        },
      ];
    } else {
      return [];
    }
  })();

  const xdefiConnection: MultiConnection = {
    name: "xdefi",
    logo: providerIcons["xdefi-wallet"],
    connections: xDefiTerraConnection.concat([xdefiEVMConnection]),
  };

  const providerStatuses: ProviderStatuses = [
    {
      providerInfo: binanceWalletInfo,
      isLoading: isBinanceWalletLoading,
    },
    {
      providerInfo: metamaskInfo,
      isLoading: isMetamaskLoading,
    },
    {
      providerInfo: xdefiEVMinfo,
      isLoading: isxdefiEVMLoading,
    },
    {
      providerInfo: terraInfo,
      isLoading: status === WalletStatus.INITIALIZING,
    },
    {
      providerInfo: torusInfo,
      isLoading: isTorusLoading,
    },
  ];

  const activeProviderInfo = providerStatuses.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  )?.providerInfo;

  const {
    address = "",
    chainId = "",
    providerId,
    logo = "",
  } = activeProviderInfo || {};

  const {
    data: coinWithBalances = [],
    isLoading,
    isFetching,
  } = useBalancesQuery(
    { address, chainId, providerId: providerId! },
    { skip: !address || !chainId || !providerId }
  );

  const walletState: IWalletState = {
    walletIcon: logo,
    displayCoin:
      coinWithBalances[0] ?? placeHolderDisplayToken[providerId ?? "none"],
    coins: coinWithBalances,
    walletAddr: address,
    chainId,
    providerId,
  };

  const disconnect = useCallback(() => {
    switch (providerId) {
      case "metamask":
        disconnectMetamask();
        break;
      case "binance-wallet":
        disconnectBinanceWallet();
        break;
      case "xdefi-evm":
        disconnectEVMxdefi();
        break;
      case "torus":
        disconnectTorus();
        break;
      case "xdefi-wallet":
      case "station":
      case "walletconnect":
        disconnectTerra();
        break;
      default:
        throw new Error("no wallet is connected");
    }
  }, [
    providerId,
    disconnectBinanceWallet,
    disconnectMetamask,
    disconnectTorus,
    disconnectTerra,
  ]);

  return (
    <getContext.Provider
      value={{
        ...walletState,
        isWalletLoading: isFetching || isLoading,
        isProviderLoading: isBinanceWalletLoading || isMetamaskLoading,
      }}
    >
      <setContext.Provider
        value={{
          connections: [
            ...terraConnections,
            xdefiConnection,
            torusConnection,
            metamaskConnection,
            binanceWalletConnection,
          ],
          disconnect,
        }}
      >
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

const getContext = createContext<IState>(initialState);
const setContext = createContext<Setters>({
  connections: [],
  disconnect: async () => {},
});

export const useSetWallet = () => useContext(setContext);
export const useGetWallet = () => useContext(getContext);

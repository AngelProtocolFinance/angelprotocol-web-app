import { WalletStatus, useWallet } from "@terra-money/wallet-provider";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";
import {
  Connection,
  ProviderId,
  ProviderInfo,
  ProviderStatuses,
} from "./types";
import { WithBalance } from "services/types";
import unknownWalletIcon from "assets/icons/wallets/unknown.svg";
import { placeHolderToken } from "services/apes/tokens/constants";
import { useBalancesQuery } from "services/apes/tokens/tokens";
import { chainIDs } from "constants/chainIDs";
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
        providerId: (connection?.identifier as ProviderId) || "wallet-connect",
        logo: connection?.icon!,
        chainId: network.chainID,
        address: wallets[0].terraAddress,
      }
    : undefined;

  //remap to proxy Connection
  const terraConnections: Connection[] = availableConnections.map(
    (connection) => ({
      logo: connection.icon,
      name: connection.name,
      connect: async () => {
        connect(connection.type, connection.identifier);
      },
    })
  );

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
    data: coinWithBalances = [placeHolderToken],
    isLoading,
    isFetching,
  } = useBalancesQuery(
    { address, chainId, providerId },
    { skip: !address || !chainId }
  );

  const walletState: IWalletState = {
    walletIcon: logo,
    displayCoin: coinWithBalances[0],
    coins: coinWithBalances,
    walletAddr: address,
    chainId,
    providerId,
  };

  const disconnect = useCallback(() => {
    console.log(providerId);
    switch (providerId) {
      case "metamask":
        disconnectMetamask();
        break;
      case "binance-wallet":
        disconnectBinanceWallet();
        break;
      case "torus":
        disconnectTorus();
        break;
      case "station":
      case "wallet-connect":
      case "xdefi-wallet":
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

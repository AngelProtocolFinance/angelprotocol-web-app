import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from "react";
import unknownWaleltIcon from "assets/icons/wallets/unknown.svg";
import {
  placeHolderToken,
  unSupportedToken,
} from "services/apes/tokens/constants";
import { useEthBalancesQuery } from "services/apes/tokens/tokens";
import { TokenWithBalance } from "services/types";
import { chainIDs } from "constants/chainIDs";
import { Connection, ProviderId, ProviderStatuses } from "./types";
import useInjectedWallet from "./useInjectedProvider";

type IWalletState = {
  walletIcon: string;
  displayCoin: TokenWithBalance;
  coins: TokenWithBalance[];
  address: string;
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
  walletIcon: unknownWaleltIcon,
  displayCoin: placeHolderToken,
  coins: [],
  address: "",
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
    isLoading: isXdefiLoading,
    connection: xdefiConnection,
    disconnect: disconnectXdefi,
    providerInfo: xdefiWalletInfo,
  } = useInjectedWallet("xdefi");

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
      providerInfo: xdefiWalletInfo,
      isLoading: isXdefiLoading,
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
    data: coinWithBalances = [unSupportedToken],
    isLoading,
    isFetching,
  } = useEthBalancesQuery({ address, chainId }, { skip: !address || !chainId });

  const walletState: IWalletState = {
    walletIcon: logo,
    displayCoin: coinWithBalances[0],
    coins: coinWithBalances,
    address,
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
      case "xdefi":
        disconnectXdefi();
        break;
      default:
        throw new Error("no wallet is connected");
    }
  }, [
    providerId,
    disconnectBinanceWallet,
    disconnectMetamask,
    disconnectXdefi,
  ]);

  return (
    <getContext.Provider
      value={{
        ...walletState,
        isWalletLoading: isFetching || isLoading,
        isProviderLoading:
          isBinanceWalletLoading || isMetamaskLoading || isXdefiLoading,
      }}
    >
      <setContext.Provider
        value={{
          connections: [
            metamaskConnection,
            binanceWalletConnection,
            xdefiConnection,
          ],
          disconnect: disconnect,
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

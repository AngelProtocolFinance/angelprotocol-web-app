import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  Connection,
  ProviderId,
  ProviderInfo,
  ProviderStatuses,
} from "./types";
import { Chain, Token } from "types/server/aws";
import { useChainQuery } from "services/apes";
import { WalletDisconnectedError, WrongNetworkError } from "errors/errors";
import { EXPECTED_NETWORK_TYPE } from "constants/env";
import { useErrorContext } from "../ErrorContext";
import { placeholderChain } from "./constants";
import useInjectedWallet from "./useInjectedProvider";
import useKeplr from "./useKeplr";
import useTerra from "./useTerra";
import useXdefi from "./useXdefi";

export type WalletState = {
  walletIcon: string;
  displayCoin: Token;
  coins: Token[];
  address: string;
  chain: Chain;
  providerId: ProviderId;
};

type State = {
  wallet?: WalletState;
  isLoading: boolean;
};

type Setters = {
  disconnect(): void;
  connections: Connection[];
};

const initialState: State = {
  wallet: undefined,
  isLoading: true,
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
    isLoading: isKeplrLoading,
    connection: keplrConnection,
    disconnect: disconnectKeplr,
    providerInfo: keplrWalletInfo,
  } = useKeplr();

  const { isTerraLoading, terraConnections, disconnectTerra, terraInfo } =
    useTerra();

  const {
    isxdefiEVMLoading,
    xdefiConnection,
    disconnectEVMxdefi,
    xdefiEVMinfo,
  } = useXdefi();

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
      isLoading: isTerraLoading,
    },
    {
      providerInfo: keplrWalletInfo,
      isLoading: isKeplrLoading,
    },
  ];
  const activeProviderInfo = providerStatuses.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  )?.providerInfo;

  const disconnect = useCallback(() => {
    switch (activeProviderInfo?.providerId) {
      case "metamask":
        disconnectMetamask();
        break;
      case "binance-wallet":
        disconnectBinanceWallet();
        break;
      case "xdefi-evm":
        disconnectEVMxdefi();
        break;
      case "keplr":
        disconnectKeplr();
        break;
      case "xdefi-wallet":
      case "station":
      case "falcon-wallet":
      case "leap-wallet":
      case "walletconnect":
        disconnectTerra();
        break;
      default:
        throw new WalletDisconnectedError();
    }
  }, [
    activeProviderInfo?.providerId,
    disconnectMetamask,
    disconnectBinanceWallet,
    disconnectEVMxdefi,
    disconnectKeplr,
    disconnectTerra,
  ]);

  const {
    data: chain = placeholderChain,
    isLoading: isChainLoading,
    error,
  } = useChainQuery(
    { providerInfo: activeProviderInfo! },
    { skip: !activeProviderInfo }
  );

  useVerifyChain(activeProviderInfo, chain, error, disconnect);

  const walletState: WalletState | undefined = useMemo(() => {
    if (activeProviderInfo) {
      const { logo, providerId, address } = activeProviderInfo;
      return {
        walletIcon: logo,
        displayCoin: chain.native_currency,
        coins: [chain.native_currency, ...chain.tokens],
        address,
        chain,
        providerId,
      };
    }
  }, [activeProviderInfo, chain]);

  return (
    <getContext.Provider
      value={{
        wallet: walletState,
        isLoading: providerStatuses.some((x) => x.isLoading) || isChainLoading,
      }}
    >
      <setContext.Provider
        value={{
          connections: [
            keplrConnection,
            xdefiConnection,
            metamaskConnection,
            ...terraConnections,
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

function useVerifyChain(
  activeProviderInfo: ProviderInfo | undefined,
  chain: Chain,
  chainError: any,
  disconnect: () => void
) {
  const { handleError } = useErrorContext();

  const handle = useCallback(
    (error: any) => {
      handleError(error);
      try {
        disconnect();
      } catch (err) {
        // when wallet is disconnected, the `disconnect` func is recreated,
        // causing this hook to rerun and throwing the error below.
        // We ignore this error and rethrow others
        if (!(err instanceof WalletDisconnectedError)) {
          throw err;
        }
      }
    },
    [handleError, disconnect]
  );

  useEffect(() => {
    // no active provider === no connected wallet so no need to run hook
    if (!activeProviderInfo) {
      return;
    }
    if (chainError) {
      handle(chainError);
    } else if (chain.network_type !== EXPECTED_NETWORK_TYPE) {
      handle(new WrongNetworkError());
    }
  }, [activeProviderInfo, chain, chainError, handle]);
}

const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  connections: [],
  disconnect: async () => {},
});

export const useSetWallet = () => useContext(setContext);
export const useGetWallet = () => useContext(getContext);

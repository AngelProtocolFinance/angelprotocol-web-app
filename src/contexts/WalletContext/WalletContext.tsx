import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Connection, ProviderId, ProviderInfo, WalletData } from "./types";
import { Chain, Token } from "types/aws";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import { useChainQuery } from "services/apes";
import {
  UnexpectedStateError,
  WalletDisconnectedError,
  WrongNetworkError,
} from "errors/errors";
import { EXPECTED_NETWORK_TYPE } from "constants/env";
import { useErrorContext } from "../ErrorContext";
import { placeholderChain } from "./constants";
import { getConnectedProvider } from "./helpers/connectedProvider";
import useInjectedProvider from "./useInjectedProvider";
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
  getBalance: (token_id: string) => number;
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
  const { handleError } = useErrorContext();

  const metamask = useInjectedProvider("metamask");

  // const {
  //   isLoading: isBinanceWalletLoading,
  //   connection: binanceWalletConnection,
  //   disconnect: disconnectBinanceWallet,
  //   providerInfo: binanceWalletInfo,
  // } = useInjectedProvider("binance-wallet");

  const keplr = useKeplr();

  const terra = useTerra();

  const xdefi = useXdefi();

  const wallets: WalletData[] = [metamask, keplr, terra, xdefi];

  const activeProviderInfo = wallets.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  )?.providerInfo;

  const providersLoading = wallets.some(({ isLoading }) => isLoading);

  useEffect(() => {
    (async function () {
      try {
        const connectedProviderId = getConnectedProvider();

        if (providersLoading || activeProviderInfo || !connectedProviderId) {
          return;
        }

        const connectedProvider = findActiveConnection(
          wallets,
          connectedProviderId
        );

        if (!connectedProvider) {
          throw new UnexpectedStateError(
            `Stored an unexpected provider ID ${connectedProviderId}`
          );
        }

        if (!connectedProvider.connect) {
          throw new UnexpectedStateError(
            `Provider connection doesn't have a connect() function. ${JSON.stringify(
              connectedProvider
            )}`
          );
        }

        await connectedProvider.connect();
      } catch (error) {
        handleError(error, GENERIC_ERROR_MESSAGE);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providersLoading, activeProviderInfo]);

  const disconnect = useCallback(() => {
    switch (activeProviderInfo?.providerId) {
      case "metamask":
        metamask.disconnect();
        break;
      // case "binance-wallet":
      //   disconnectBinanceWallet();
      //   break;
      case "xdefi-evm":
        xdefi.disconnect();
        break;
      case "keplr":
        keplr.disconnect();
        break;
      case "xdefi-wallet":
      case "station":
      case "falcon-wallet":
      case "leap-wallet":
      case "walletconnect":
        terra.disconnect();
        break;
      default:
        throw new WalletDisconnectedError();
    }
  }, [
    activeProviderInfo?.providerId,
    metamask,
    // BinanceWallet,
    xdefi,
    keplr,
    terra,
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
        getBalance: (token_id: string) =>
          [chain.native_currency, ...chain.tokens].find(
            (x) => x.token_id === token_id
          )?.balance || 0,
      };
    }
  }, [activeProviderInfo, chain]);

  return (
    <getContext.Provider
      value={{
        wallet: walletState,
        isLoading: wallets.some((x) => x.isLoading) || isChainLoading,
      }}
    >
      <setContext.Provider
        value={{
          connections: [
            ...keplr.connections,
            ...xdefi.connections,
            ...metamask.connections,
            ...terra.connections,
            // binanceWalletConnection,
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
          handleError(err);
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

function findActiveConnection(
  wallets: WalletData[],
  connectedProviderId: ProviderId
): Connection | undefined {
  for (const { connections } of wallets) {
    for (const conn of connections) {
      if (conn.providerId) {
        if (conn.providerId === connectedProviderId) {
          return conn;
        }
      } else {
        const result = conn.networks.find(
          (conn) => conn.providerId === connectedProviderId
        );

        if (result) {
          return result;
        }
      }
    }
  }
}

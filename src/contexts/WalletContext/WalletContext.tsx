import { ethers, utils } from "ethers";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Connection,
  NativeTokenWithBalance,
  ProviderId,
  ProviderStatuses,
} from "./types";
import unknownWaleltIcon from "assets/icons/wallets/unknown.svg";
import { chainIDs } from "constants/chainIDs";
import {
  EIPMethods,
  placeHolderToken,
  tokenList,
  unSupportedToken,
} from "./constants";
import { getChainParamsFromCoin } from "./helpers/genChainParams";
import genUnsupportedToken from "./helpers/genUnsupportedToken";
import { getProvider } from "./helpers/getProvider";
import useInjectedWallet from "./useInjectedProvider";

type IWalletState = {
  walletIcon: string;
  displayCoin: NativeTokenWithBalance;
  coins: NativeTokenWithBalance[];
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
  networkSwitcher(coin: NativeTokenWithBalance): () => Promise<void>;
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
  const [isWalletLoading, setIsWalletLoading] = useState(true); //getting wallet resources
  const [wallet, setWallet] = useState<IWalletState>(initialState);

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

  const providerStatuses: ProviderStatuses = [
    {
      providerInfo: binanceWalletInfo,
      isLoading: isBinanceWalletLoading,
    },
    {
      providerInfo: metamaskInfo,
      isLoading: isMetamaskLoading,
    },
  ];
  const activeProviderInfo = providerStatuses.find(
    ({ providerInfo, isLoading }) => !isLoading && providerInfo !== undefined
  )?.providerInfo;

  const prevProviderInfo = usePrevious(activeProviderInfo);

  //get wallet Balance
  //TODO: transfer to RTK query
  useEffect(() => {
    (async () => {
      try {
        if (!activeProviderInfo && prevProviderInfo) {
          setWallet(initialWalletState);
          return;
        }
        if (!activeProviderInfo) return;

        if (
          (!prevProviderInfo && !activeProviderInfo) ||
          //shallow compare : providerInfo is shallow object
          JSON.stringify(activeProviderInfo) !==
            JSON.stringify(prevProviderInfo)
        ) {
          const { address, id, chainId, logo } = activeProviderInfo!; //found to be defined;
          //set active provider
          setWallet((prev) => ({ ...prev, providerId: id }));
          //fetch wallet resources
          setIsWalletLoading(true);

          const isChainSupported =
            //TODO: get supported token list from server
            tokenList.find((token) => token.chainId === chainId) !== undefined;

          if (!isChainSupported) {
            const walletInfo: IWalletState = {
              walletIcon: logo,
              displayCoin: unSupportedToken,
              coins: tokenList.map((token) => ({ ...token, balance: "0" })),
              address,
              chainId,
              providerId: id,
            };
            setWallet(walletInfo);
            setIsWalletLoading(false);
            return;
          }

          //query only if chain is supported
          const balanceQueries = tokenList.map((token) => {
            const jsonProvider = new ethers.providers.JsonRpcProvider(
              token.rpcUrl
            );
            return jsonProvider.getBalance(address);
          });
          const queryResult = await Promise.allSettled(balanceQueries);

          //map balances
          const coins: NativeTokenWithBalance[] = queryResult.map((result, i) =>
            result.status === "fulfilled"
              ? {
                  ...tokenList[i],
                  balance: utils.formatUnits(
                    result.value,
                    tokenList[i].decimals
                  ),
                }
              : { ...tokenList[i], balance: "0" }
          );

          const displayCoin = coins.find(
            (balance) => balance.chainId === chainId
          );

          const walletInfo: IWalletState = {
            walletIcon: logo,
            displayCoin: displayCoin || genUnsupportedToken(chainId),
            coins,
            address,
            chainId,
            providerId: id,
          };
          setWallet(walletInfo);
          setIsWalletLoading(false);
        }
      } catch (err) {
        console.error(err);
        setIsWalletLoading(false);
        setWallet(initialWalletState);
      }
    })();
  }, [activeProviderInfo, prevProviderInfo]);

  const disconnect = useCallback(() => {
    switch (wallet.providerId) {
      case "metamask":
        disconnectMetamask();
        break;
      case "binance-wallet":
        disconnectBinanceWallet();
        break;
      default:
        throw new Error("no wallet is connected");
    }
  }, [wallet, disconnectBinanceWallet, disconnectMetamask]);

  const networkSwitcher = useCallback(
    (coin: NativeTokenWithBalance) => {
      return async function switchNetwork() {
        try {
          if (wallet.providerId) {
            const provider = getProvider(wallet.providerId);
            await provider?.request({
              method: EIPMethods.wallet_addEthereumChain,
              params: [getChainParamsFromCoin(coin)],
            });
          }
        } catch (err: any) {
          console.error(err);
        }
      };
    },
    [wallet]
  );

  return (
    <getContext.Provider
      value={{
        ...wallet,
        isWalletLoading,
        isProviderLoading: isBinanceWalletLoading || isMetamaskLoading,
      }}
    >
      <setContext.Provider
        value={{
          connections: [metamaskConnection, binanceWalletConnection],
          disconnect: disconnect,
          networkSwitcher,
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
  networkSwitcher: () => async () => {},
});

export const useSetWallet = () => useContext(setContext);
export const useGetWallet = () => useContext(getContext);

function usePrevious<T extends object>(value?: T) {
  /**
   * @param value shallow object
   */
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]); //
  return ref.current;
}

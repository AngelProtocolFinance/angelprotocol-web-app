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
import { chainIDs } from "constants/chainIDs";
import { tokenList } from "./constants";
import useInjectedWallet from "./useInjectedProvider";

type IWalletState = {
  walletIcon: string;
  displayCoin: { amount: number; symbol: string };
  coins: NativeTokenWithBalance[];
  address: string;
  chainId: string;
  id?: ProviderId;
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
  walletIcon: "",
  displayCoin: { amount: 0, symbol: "ETH" },
  coins: [],
  address: "",
  chainId: chainIDs.eth_main,
};

const initialState: IState = {
  ...initialWalletState,
  isWalletLoading: false,
  isProviderLoading: false,
};

export default function WalletContext(props: PropsWithChildren<{}>) {
  const [isWalletLoading, setIsWalletLoading] = useState(false); //getting wallet resources
  const [wallet, setWallet] = useState<IWalletState>(initialState);
  console.log(isWalletLoading);

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
          JSON.stringify(activeProviderInfo) !==
            JSON.stringify(prevProviderInfo)
        ) {
          //fetch wallet resources

          const { address, id, chainId, logo } = activeProviderInfo!; //found to be defined;
          setIsWalletLoading(true);
          setWallet((prev) => ({ ...prev, id }));

          //get token list from server and query corresponding rpc
          const balanceQueries = tokenList.map((token) => {
            const jsonProvider = new ethers.providers.JsonRpcProvider(
              token.rpcUrl
            );
            return jsonProvider.getBalance(address);
          });
          const queryResult = await Promise.allSettled(balanceQueries);

          //map balances
          const balances: NativeTokenWithBalance[] = queryResult.map(
            (result, i) =>
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

          const dispBalance = balances.find(
            (balance) => balance.chainId === chainId
          );

          const walletInfo: IWalletState = {
            walletIcon: logo,
            displayCoin: {
              amount: +(dispBalance?.balance || "0"),
              symbol: dispBalance?.symbol || "ETH",
            },
            coins: balances,
            address,
            chainId,
            id,
          };
          setWallet(walletInfo);
          setIsWalletLoading(false);
        }
      } catch (err) {
        console.error(err);
        setWallet(initialWalletState);
        setIsWalletLoading(false);
      }
    })();
  }, [activeProviderInfo, prevProviderInfo]);

  const disconnect = useCallback(() => {
    switch (wallet.id) {
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

import {
  getChainOptions,
  NetworkInfo,
  WalletProvider as TerraProvider,
} from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { MetamaskProvider } from "./MetamaskProvider";
import { Wallet, WalletConnectionType } from "./types";
import useWallets from "./useWallets";

const localterra = {
  name: "localterra",
  chainID: chainIDs.localterra,
  lcd: terra_lcds[chainIDs.localterra],
};

export function WalletProvider(props: PropsWithChildren<{}>) {
  const [isLoadingChainOptions, setLoading] = useState(true);
  const [walletConnectChainIds, setWalletConnectChainIds] = useState<
    Record<number, NetworkInfo>
  >({});
  const [defaultNetwork, setDefaultNetwork] = useState<NetworkInfo>(localterra);
  const [wallet, setWallet] = useState<Wallet>();
  const { wallets, isLoading: isLoadingWallets } = useWallets();

  useEffect(() => {
    async function fetchChainIds() {
      const chainOptions = await getChainOptions();
      setDefaultNetwork(chainOptions.defaultNetwork);
      setWalletConnectChainIds({
        ...chainOptions.walletConnectChainIds,
        2: localterra,
      });
      setLoading(false);
    }

    fetchChainIds();
  }, []);

  const connect = useCallback(
    (connType: WalletConnectionType) => {
      if (!wallets) {
        console.log("loading wallets");
        return;
      }

      setWallet(wallets[connType]);
    },
    [wallets]
  );

  if (isLoadingChainOptions && isLoadingWallets) {
    return (
      <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
    );
  }

  return (
    <WalletSuiteContext.Provider
      value={{ isLoading: isLoadingChainOptions, connect, wallet }}
    >
      <TerraProvider
        defaultNetwork={defaultNetwork}
        walletConnectChainIds={walletConnectChainIds}
      >
        <MetamaskProvider>{props.children}</MetamaskProvider>
      </TerraProvider>
    </WalletSuiteContext.Provider>
  );
}

interface IWalletSuiteContext {
  isLoading: boolean;
  wallet?: Wallet;
  connect: (connType: WalletConnectionType) => void;
}

export const WalletSuiteContext = createContext<IWalletSuiteContext>({
  isLoading: false,
  connect: (_: WalletConnectionType) => {},
});

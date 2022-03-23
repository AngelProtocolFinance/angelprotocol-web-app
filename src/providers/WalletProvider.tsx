import {
  getChainOptions,
  NetworkInfo,
  WalletProvider as TerraProvider,
} from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { MetamaskProvider } from "./MetamaskProvider";

const localterra = {
  name: "localterra",
  chainID: chainIDs.localterra,
  lcd: terra_lcds[chainIDs.localterra],
};

export function WalletProvider(props: PropsWithChildren<{}>) {
  const [isLoading, setLoading] = useState(true);
  const [walletConnectChainIds, setWalletConnectChainIds] = useState<
    Record<number, NetworkInfo>
  >({});
  const [defaultNetwork, setDefaultNetwork] = useState<NetworkInfo>(localterra);

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

  if (isLoading) {
    return (
      <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
    );
  }

  return (
    <WalletSuiteContext.Provider value={{ isLoading }}>
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
}

export const WalletSuiteContext = createContext<IWalletSuiteContext>({
  isLoading: false,
});

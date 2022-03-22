import {
  NetworkInfo,
  WalletProvider as TerraProvider,
} from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";
import { createContext, PropsWithChildren, useState } from "react";
import { MetamaskProvider } from "./MetamaskProvider";

const localterra = {
  name: "localterra",
  chainID: chainIDs.localterra,
  lcd: terra_lcds[chainIDs.localterra],
};

type Props = {
  defaultNetwork: NetworkInfo;
  walletConnectChainIds: Record<number, NetworkInfo>;
};

export function WalletProvider(props: PropsWithChildren<Props>) {
  const [isLoading, setLoading] = useState(false);

  return (
    <WalletSuiteContext.Provider value={{ isLoading }}>
      <TerraProvider
        defaultNetwork={props.defaultNetwork}
        walletConnectChainIds={{
          ...props.walletConnectChainIds,
          2: localterra,
        }}
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

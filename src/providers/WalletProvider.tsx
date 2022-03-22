import { createContext, PropsWithChildren, useState } from "react";
import { MetamaskProvider } from "./MetamaskProvider";

interface IWalletSuiteContext {
  isLoading: boolean;
}

export const WalletSuiteContext = createContext<IWalletSuiteContext>({
  isLoading: false,
});

export function WalletProvider(props: PropsWithChildren<{}>) {
  const [isLoading, setLoading] = useState(false);

  return (
    <WalletSuiteContext.Provider value={{ isLoading }}>
      <MetamaskProvider>{props.children}</MetamaskProvider>
    </WalletSuiteContext.Provider>
  );
}

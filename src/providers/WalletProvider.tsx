import { createContext, PropsWithChildren, useState } from "react";
import { Metamask } from "./Metamask";

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
      <Metamask>{props.children}</Metamask>
    </WalletSuiteContext.Provider>
  );
}

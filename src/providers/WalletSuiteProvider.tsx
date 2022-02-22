import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface IWalletSuiteContext {
  connectorsShown: boolean;
  setShowConnectors: Dispatch<SetStateAction<boolean>>;
}

const WalletSuiteContext = createContext<IWalletSuiteContext>({
  connectorsShown: false,
  setShowConnectors: () => {},
});

function WalletSuiteProvider({ children }: PropsWithChildren<{}>) {
  const [connectorsShown, setShowConnectors] = useState(false);

  return (
    <WalletSuiteContext.Provider
      value={{
        connectorsShown,
        setShowConnectors,
      }}
    >
      {children}
    </WalletSuiteContext.Provider>
  );
}

export { WalletSuiteProvider as default, WalletSuiteContext };

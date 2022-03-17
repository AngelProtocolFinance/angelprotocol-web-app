import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface IWalletSuiteContext {
  connectOptionsShown: boolean;
  setConnectOptionsShown: Dispatch<SetStateAction<boolean>>;
}

const WalletSuiteContext = createContext<IWalletSuiteContext>({
  connectOptionsShown: false,
  setConnectOptionsShown: () => {},
});

function WalletSuiteProvider({ children }: PropsWithChildren<{}>) {
  const [connectOptionsShown, setConnectOptionsShown] = useState(false);

  return (
    <WalletSuiteContext.Provider
      value={{
        connectOptionsShown,
        setConnectOptionsShown,
      }}
    >
      {children}
    </WalletSuiteContext.Provider>
  );
}

export { WalletSuiteProvider as default, WalletSuiteContext };

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import useTorus from "./useTorus";

type Torus = {
  isLoading: boolean;
  privateKey?: string;
  login: (loginProvider?: string) => Promise<void>;
};

interface IWalletSuiteContext {
  connectOptionsShown: boolean;
  setConnectOptionsShown: Dispatch<SetStateAction<boolean>>;
  torus: Torus;
}

const WalletSuiteContext = createContext<IWalletSuiteContext>({
  connectOptionsShown: false,
  setConnectOptionsShown: () => {},
  torus: { isLoading: true, login: (_: string = "") => new Promise((r) => r) },
});

function WalletSuiteProvider({ children }: PropsWithChildren<{}>) {
  const [connectOptionsShown, setConnectOptionsShown] = useState(false);
  const location = useLocation();
  const defaultRedirectUrl = `${window.location.origin}${location.pathname}`;
  const torus = useTorus(defaultRedirectUrl);

  return (
    <WalletSuiteContext.Provider
      value={{
        connectOptionsShown,
        setConnectOptionsShown,
        torus,
      }}
    >
      {children}
    </WalletSuiteContext.Provider>
  );
}

export { WalletSuiteProvider as default, WalletSuiteContext };

import { createContext, PropsWithChildren } from "react";
import registerRoutes, { registerRootPath } from "../routes";
import routes from "./routes";
import useOpenLogin from "./useOpenLogin";

const AUTH_REDIRECT_URL = `${window.location.origin}${registerRootPath}/${registerRoutes.wallet}/${routes.auth}`;

interface IContext {
  openLoginPrivateKey: string;
  isLoading: boolean;
  loginWithOpenLogin: (provider: string) => void;
}

const Context = createContext<IContext>({
  isLoading: true,
  openLoginPrivateKey: "",
  loginWithOpenLogin: (_) => {},
});

function Provider({ children }: PropsWithChildren<{}>) {
  const { isLoading, login, privateKey } = useOpenLogin(AUTH_REDIRECT_URL);

  return (
    <Context.Provider
      value={{
        isLoading,
        loginWithOpenLogin: login,
        openLoginPrivateKey: privateKey,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Provider as default, Context as WalletRegistrationContext };

import { app, site } from "constants/routes";
import { createContext, PropsWithChildren } from "react";
import { useRouteMatch } from "react-router-dom";
import routes from "./routes";
import registerRoutes from "../routes";
import useOpenLogin from "./useOpenLogin";

const AUTH_REDIRECT_URL = `${window.location.origin}${site.app}/${app.register}/${registerRoutes.wallet}/${routes.auth}`;

interface IContext {
  rootPath: string;
  openLoginPrivateKey: string;
  isLoading: boolean;
  loginWithOpenLogin: (provider: string) => void;
}

const Context = createContext<IContext>({
  rootPath: "",
  isLoading: true,
  openLoginPrivateKey: "",
  loginWithOpenLogin: (_) => {},
});

function Provider({ children }: PropsWithChildren<{}>) {
  const { path } = useRouteMatch();
  const { isLoading, login, privateKey } = useOpenLogin(AUTH_REDIRECT_URL);

  return (
    <Context.Provider
      value={{
        rootPath: path,
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

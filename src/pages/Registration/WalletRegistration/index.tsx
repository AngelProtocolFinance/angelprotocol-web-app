import { createContext, lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import routes from "./routes";

const Auth = lazy(() => import("./Auth"));
const ChooseWallet = lazy(() => import("./ChooseWallet"));
const RegisterWallet = lazy(() => import("./RegisterWallet"));

const Context = createContext<{ rootPath: string }>({
  rootPath: "",
});

function WalletRegistration() {
  // this component will only render under '/app/register/wallet'
  const { path } = useRouteMatch();

  return (
    <Context.Provider value={{ rootPath: path }}>
      <Switch>
        <Route exact path={path} component={ChooseWallet} />
        <Route exact path={`${path}/${routes.auth}`} component={Auth} />
        <Route
          exact
          path={`${path}/${routes.submit}`}
          component={RegisterWallet}
        />
      </Switch>
    </Context.Provider>
  );
}

export { WalletRegistration as default, Context as WalletRegistrationContext };

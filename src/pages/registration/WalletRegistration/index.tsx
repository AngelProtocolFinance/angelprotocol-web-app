import { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { routes } from "./constants";

const ChooseWallet = lazy(() => import("./ChooseWallet"));
const RedirectAuth = lazy(() => import("./RedirectAuth"));
const RegisterWallet = lazy(() => import("./RegisterWallet"));

export default function WalletRegistration() {
  //this component will only render under '/app/register/wallet'
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={ChooseWallet} />
      <Route exact path={`${path}/${routes.auth}`} component={RedirectAuth} />
      <Route
        exact
        path={`${path}/${routes.submit}`}
        component={RegisterWallet}
      />
    </Switch>
  );
}

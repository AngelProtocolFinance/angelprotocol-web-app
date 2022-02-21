import { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import routes from "./routes";

const Auth = lazy(() => import("./Auth"));
const ChooseWallet = lazy(() => import("./ChooseWallet"));
const RegisterWallet = lazy(() => import("./RegisterWallet"));

export default function WalletRegistration() {
  //this component will only render under '/app/register/wallet'
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={ChooseWallet} />
      <Route exact path={`${path}/${routes.auth}`} component={Auth} />
      <Route
        exact
        path={`${path}/${routes.submit}`}
        component={RegisterWallet}
      />
    </Switch>
  );
}

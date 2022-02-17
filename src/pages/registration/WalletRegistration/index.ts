import { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const ChooseWallet = lazy(() => import("./ChooseWallet"));
// const ConnectWallet = lazy(() => import("../connect-wallet/ConnectWallet"));
// const SelectWallet = lazy(() => import("../connect-wallet/SelectWallet"));
// const SelfCustody = lazy(() => import("../connect-wallet/Self-custody"));
const RedirectAuth = lazy(() => import("./RedirectAuth"));
const RegisterWallet = lazy(() => import("./RegisterWallet"));

export default function WalletRegistration() {
  //this component will only render under '/app/register/wallet'
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={ChooseWallet} />
      // <Route
      //   exact
      //   path={`${path}/${registration.select_wallet}`}
      //   component={SelectWallet}
      // />
      // <Route
      //   exact
      //   path={`${path}/${registration.connect_wallet}`}
      //   component={ConnectWallet}
      // />

      // <Route
      //   exact
      //   path={`${path}/${registration.others}`}
      //   component={OtherWallets}
      // />
      // <Route
      //   exact
      //   path={`${path}/${registration.self_custody}`}
      //   component={SelfCustody}
      // />

      <Route
        exact
        path={`${path}/${routes.auth}`}
        component={RedirectAuth}
      />
      <Route
        exact
        path={`${path}/${routes.register_wallet}`}
        component={RegisterWallet}
      />
    </Switch>
  );
}

export enum routes {
  index = "/",
  submit = "submit",
  auth = "auth",
}

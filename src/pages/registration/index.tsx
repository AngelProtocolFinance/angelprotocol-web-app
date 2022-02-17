import { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import routes from "./routes";

const Registration = lazy(() => import("./Registration"));
const ContactDetails = lazy(() => import("./ContactDetails"));
const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));
const RegistrationStatus = lazy(() => import("./RegistrationStatus"));
const ChooseWallet = lazy(() => import("./WalletRegistration/ChooseWallet"));
const RedirectAuth = lazy(() => import("./WalletRegistration/RedirectAuth"));
const RegisterWallet = lazy(
  () => import("./WalletRegistration/RegisterWallet")
);

export default function Register() {
  //this component will only render under '/app/register/'
  const { path } = useRouteMatch();

  return (
    <section className="flex items-center justify-center relative sm:w-4/5 max-w-6xl text-center text-white mx-auto h-full">
      <Switch>
        <Route
          exact
          path={`${path}/${routes.detail}`}
          component={ContactDetails}
        />
        <Route
          exact
          path={`${path}/${routes.confirm}`}
          component={ConfirmEmail}
        />
        <Route
          exact
          path={`${path}/${routes.verify}`}
          component={VerifiedEmail}
        />
        <Route
          exact
          path={`${path}/${routes.status}`}
          component={RegistrationStatus}
        />
        <Route
          exact
          path={`${path}/${routes.wallet}`}
          component={ChooseWallet}
        />
        <Route
          exact
          path={`${path}/${routes.wallet}/${routes.auth}`}
          component={RedirectAuth}
        />
        <Route
          exact
          path={`${path}/${routes.register_wallet}`}
          component={RegisterWallet}
        />
        <Route exact path={`${path}${routes.index}`} component={Registration} />
      </Switch>
    </section>
  );
}

import { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import routes from "./routes";

const Registration = lazy(() => import("./Registration"));
const ContactDetails = lazy(() => import("./ContactDetails"));
const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));
const RegistrationStatus = lazy(() => import("./RegistrationStatus"));
const WalletRegistration = lazy(() => import("./WalletRegistration"));

export default function Register() {
  //this component will only render under '/app/register/'
  const { path } = useRouteMatch();

  return (
    <section className="flex items-center justify-center relative sm:w-4/5 max-w-5xl text-center text-white mx-auto h-full p-5">
      <Switch>
        <Route
          exact
          path={`${path}/${routes.contactDetails}`}
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
        {/* 'exact' prop is unnecessary, since this component has sub-routes */}
        <Route
          path={`${path}/${routes.wallet}`}
          component={WalletRegistration}
        />
        <Route exact path={`${path}${routes.index}`} component={Registration} />
      </Switch>
    </section>
  );
}

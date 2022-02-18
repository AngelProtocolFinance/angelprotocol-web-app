import { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import routes from "./routes";

const Registration = lazy(() => import("./Registration"));
const ContactDetails = lazy(() => import("./ContactDetails"));
const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));
const RegistrationStatus = lazy(() => import("./RegistrationStatus"));

export default function Register() {
  //this component will only render under '/app/register/'
  const { path } = useRouteMatch();

  return (
    <section>
      <div className="relative sm:w-4/5 max-w-6xl p-10 mt-5 text-center text-white mx-auto">
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
            path={`${path}${routes.index}`}
            component={Registration}
          />
        </Switch>
      </div>
    </section>
  );
}

import { Route, Switch, useRouteMatch } from "react-router-dom";
import Registration from "./Registration";
import ContactDetails from "./ContactDetails";
import ConfirmEmail from "./ConfirmEmail";
import VerifiedEmail from "./VerifiedEmail";
import { register_routes } from "types/types";

const Register = () => {
  let match = useRouteMatch();
  console.log("match url => ", match.url);
  return (
    <section className="container mx-auto my-auto flex-auto my-10 lg:w-1/4 w-1/2 h-fixed-content-height">
      <div className="relative sm:absolute min-w-dm inset-1/2 bottom-auto right-auto rounded-3xl transform -translate-x-1/2 -translate-y-1/2 w-96 sm:w-4/5 max-w-6xl p-10 text-center text-white">
        <Switch>
          <Route
            exact
            path={`${match.url}/${register_routes.detail}`}
            component={ContactDetails}
          />
          <Route
            exact
            path={`${match.url}/${register_routes.confirm}`}
            component={ConfirmEmail}
          />
          <Route
            exact
            path={`${match.url}/${register_routes.verify}`}
            component={VerifiedEmail}
          />
          <Route exact path={`${match.url}/index`} component={Registration} />
        </Switch>
      </div>
    </section>
  );
};

export default Register;

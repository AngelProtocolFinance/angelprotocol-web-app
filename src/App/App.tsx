import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import Donate from "pages/Donate/Donate";
import Dashboard from "pages/Dashboard";
import Login from "pages/Login/Login";
import Register from "pages/registration/index";
import TCA from "pages/TCA/TCA";
import { app, site } from "../types/routes";
import AppFoot from "components/Footers/AppFoot";

const App = () => {
  //this component will only render under '/app' route
  //{match.path} is '/app'
  const { path } = useRouteMatch();
  const location = useLocation();

  return (
    <div className={`grid bg-gradient-to-b from-blue-accent to-black-blue`}>
      <Switch>
        <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
        <Route path={`${path}/${app.dashboard}`} component={Dashboard} />
        <Route path={`${path}/${app.donate}`} component={Donate} />
        <Route path={`${path}/${app.login}`} component={Login} />
        <Route path={`${path}/${app.register}`} component={Register} />
        <Route path={`${path}/${app.tca}`} component={TCA} />
        <Redirect from="*" to={site.home} />
      </Switch>
      <AppFoot />
    </div>
  );
};

export default App;

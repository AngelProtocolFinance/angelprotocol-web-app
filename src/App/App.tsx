import { Switch, Route, useRouteMatch } from "react-router-dom";
import useAppBackground from "hooks/useAppBackground";
import Donate from "pages/Donate/Donate";
import Dashboard from "pages/Dashboard";
import Login from "pages/Login/Login";
import Register from "pages/registration/index";
import TCA from "pages/TCA/TCA";
import { app } from "../types/routes";
import AppFoot from "components/Footers/AppFoot";
import Fund from "pages/Fund/Fund";

const App = () => {
  //this component will only render under '/app' route
  //{match.path} is '/app'
  const { path } = useRouteMatch();
  const appBackround = useAppBackground();

  return (
    <div className={`grid ${appBackround}`}>
      <Switch>
        {/* <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} /> */}
        <Route path={`${path}/${app.dashboard}`} component={Dashboard} />
        <Route path={`${path}/${app.donate}`} component={Donate} />
        <Route path={`${path}/${app.login}`} component={Login} />
        <Route path={`${path}/${app.register}`} component={Register} />
        <Route path={`${path}/${app.tca}`} component={TCA} />
        <Route path={`${path}/${app.fund}`} component={Fund} />
        {/* <Redirect from="*" to={routes.donate} /> */}
      </Switch>
      <AppFoot />
    </div>
  );
};

export default App;

import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { admin } from "types/routes";
import Dashboard from "./Dashboard";
import useAdminAuth from "./useAdminAuth";
import Proposer from "./Proposer";
import Authentication from "./Authentication";

const Admin = () => {
  useAdminAuth();
  //{match.path} is '/admin'
  const { path } = useRouteMatch();
  const location = useLocation();

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
      <Route path={`${path}/${admin.auth}`} component={Authentication} />
      <Route path={`${path}/${admin.proposal_types}`} component={Proposer} />
      <Route exact path={`${path}/${admin.index}`} component={Dashboard} />
      <Redirect from="*" to={`${path}/${admin.auth}`} />
    </Switch>
  );
};

export default Admin;

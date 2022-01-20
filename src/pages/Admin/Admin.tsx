import IndexFund from "pages/Admin/IndexFund/IndexFund";
import { lazy, Suspense } from "react";
import Loader from "components/Loader/Loader";
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

const Authentication = lazy(() => import("pages/Admin/Authentication"));
const CharityApps = lazy(() => import("pages/Admin/CharityApps/CharityApps"));

const Admin = () => {
  useAdminAuth();
  //{match.path} is '/admin'
  const { path } = useRouteMatch();
  const location = useLocation();

  const LoaderComponent = () => (
    <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
  );

  return (
    <Suspense fallback={<LoaderComponent />}>
      <Switch>
        <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
        <Route path={`${path}/${admin.auth}`} component={Authentication} />
        <Route path={`${path}/${admin.proposal_types}`} component={Proposer} />
        <Route exact path={`${path}/${admin.index}`} component={Dashboard} />
        <Redirect from="*" to={`${path}/${admin.auth}`} />
      </Switch>
    </Suspense>
  );
};

export default Admin;

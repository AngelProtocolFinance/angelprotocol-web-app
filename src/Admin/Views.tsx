import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import IndexFund from "pages/Admin/IndexFund/IndexFund";
import CharityApps from "pages/Admin/CharityApps/CharityApps";
import DappHead from "components/Headers/DappHead";
import Endowments from "pages/Admin/Endowments/Endowments";
import { admin } from "../types/routes";
import { useGetAuthorized } from "contexts/AuthProvider";
import Authentication from "pages/Admin/Authentication/Authentication";

export default function Views() {
  const { path } = useRouteMatch();
  const location = useLocation();
  const auth = useGetAuthorized();

  return (
    <div className="grid grid-rows-a1 place-items-start min-h-screen pt-2 pb-16">
      <DappHead />
      <div className="flex justify-center w-full">
        {!auth.isAuthorized ? (
          <Authentication />
        ) : (
          <Switch>
            <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
            <Route
              path={`${path}/${admin.index_fund_management}`}
              component={IndexFund}
            />
            <Route
              path={`${path}/${admin.charity_applications}`}
              component={CharityApps}
            />
            <Route
              path={`${path}/${admin.endowments}`}
              component={Endowments}
            />
            <Route
              path={`${path}/${admin.alliance_members}`}
              component={IndexFund}
            />
            <Route
              path={`${path}/${admin.authentication}`}
              component={Authentication}
            />
            <Redirect from="*" to={`${path}/${admin.authentication}`} />
          </Switch>
        )}
      </div>
    </div>
  );
}

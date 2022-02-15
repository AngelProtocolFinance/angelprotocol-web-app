import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { app, site } from "../types/routes";
import { lazy, Suspense } from "react";
import Loader from "components/Loader/Loader";
import Market from "pages/Market/Market";
// import Test from "pages/Test";
import CharityEdit from "pages/CharityEdit/CharityEdit";
import useScrollTop from "hooks/useScrollTop";

const Login = lazy(() => import("pages/Login/Login"));
const TCA = lazy(() => import("pages/TCA/TCA"));
const ChurchPortal = lazy(() => import("pages/ChurchPortal/ChurchPortal"));
const Leaderboard = lazy(() => import("pages/Leaderboard/Leaderboard"));
const Governance = lazy(() => import("pages/Governance/Governance"));
const Auction = lazy(() => import("pages/LBP/Auction"));
const Endowment_Admin = lazy(
  () => import("pages/Endowment_Admin/Endowment_Admin")
);
const Charity = lazy(() => import("pages/Charity/Charity"));
// const Fund = lazy(() => import("pages/Fund/Fund"));
// const Test = lazy(() => import("pages/Test"));
// const Register = lazy(() => import("pages/registration/index"));

export default function Views() {
  const { path } = useRouteMatch();
  const location = useLocation();
  useScrollTop(location.pathname);
  const LoaderComponent = () => (
    <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
  );

  return (
    <Suspense fallback={<LoaderComponent />}>
      <Switch>
        <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
        <Route path={`${path}/${app.marketplace}`} component={Market} />
        <Route path={`${path}/${app.leaderboard}`} component={Leaderboard} />
        <Route path={`${path}/${app.charity}/:address`} component={Charity} />
        <Route
          path={`${path}/${app.charity_edit}/:address`}
          component={CharityEdit}
        />
        <Route path={`${path}/${app.login}`} component={Login} />
        {/*<Route path={`${path}/${app.register}`} component={Register} />*/}
        <Route path={`${path}/${app.tca}`} component={TCA} />
        <Route
          path={`${path}/${app.churchportal}/:address`}
          component={ChurchPortal}
        />
        <Route path={`${path}/${app.govern}`} component={Governance} />
        {/* <Route path={`${path}/${app.fund}/:id`} component={Fund} /> */}
        <Route path={`${path}/${app.auction}`} component={Auction} />
        <Route
          path={`${path}/${app.endowment_admin}/:address`}
          component={Endowment_Admin}
        />
        {/* <Route path={`${path}/${app.test}`} component={Test} /> */}
        <Route path={`${path}${app.index}`}>
          <Redirect to={`${path}/${app.marketplace}`} />
        </Route>
        <Redirect from="*" to={site.home} />
      </Switch>
    </Suspense>
  );
}

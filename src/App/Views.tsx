import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { app, site } from "../constants/routes";
import { lazy, Suspense } from "react";
import Loader from "components/Loader/Loader";
import Market from "pages/Market/Market";
import CharityEdit from "pages/CharityEdit/CharityEdit";
import useScrollTop from "hooks/useScrollTop";
import Donation from "pages/Donations/Donation";

const Login = lazy(() => import("pages/Login/Login"));
const TCA = lazy(() => import("pages/TCA/TCA"));
const Leaderboard = lazy(() => import("pages/Leaderboard/Leaderboard"));
const Governance = lazy(() => import("pages/Governance/Governance"));
const Auction = lazy(() => import("pages/LBP/Auction"));
const Endowment = lazy(() => import("pages/Endowment/Endowment"));
const Charity = lazy(() => import("pages/Charity/Charity"));

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
        <Route
          path="/:url*(/+)"
          render={() => <Redirect to={location.pathname.slice(0, -1)} />}
        />
        <Route path={`${path}/${app.marketplace}`} children={<Market />} />
        <Route path={`${path}/${app.leaderboard}`} children={<Leaderboard />} />
        <Route
          path={`${path}/${app.charity}/:address`}
          children={<Charity />}
        />
        <Route
          path={`${path}/${app.charity_edit}/:address`}
          children={<CharityEdit />}
        />
        <Route path={`${path}/${app.login}`} children={<Login />} />
        <Route path={`${path}/${app.tca}`} children={<TCA />} />
        <Route path={`${path}/${app.govern}`} children={<Governance />} />
        <Route path={`${path}/${app.auction}`} children={<Auction />} />
        <Route
          path={`${path}/${app.endowment}/:address`}
          children={<Endowment />}
        />
        <Route
          path={`${path}/${app.donation}/:address`}
          children={<Donation />}
        />
        <Route
          path={`${path}${app.index}`}
          render={() => <Redirect to={`${path}/${app.marketplace}`} />}
        />
        <Route path="*" render={() => <Redirect to={site.home} />} />
      </Switch>
    </Suspense>
  );
}

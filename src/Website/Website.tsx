import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useLocation,
} from "react-router-dom";
import Home from "pages/Home/Home";
import WebHead from "components/Headers/WebHead";
import WebFoot from "components/Footers/WebFoot";
import { site, web } from "types/routes";
import { lazy, Suspense } from "react";
import Loader from "components/Loader/Loader";

const Donors = lazy(() => import("pages/Donors/Donors"));
const PrivacyPolicy = lazy(() => import("pages/PrivacyPolicy"));
const Charities = lazy(() => import("pages/Charities/Charities"));
const Contact = lazy(() => import("pages/Contact/Contact"));

const Website = () => {
  const { path } = useRouteMatch();
  const location = useLocation();

  const LoaderComponent = () => (
    <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
  );

  return (
    <div className="grid grid-rows-1a bg-white">
      <WebHead />
      <Suspense fallback={<LoaderComponent />}>
        <Switch>
          <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
          <Route path={`${path}${web.contact}`} component={Contact} />
          <Route path={`${path}${web.privacy}`} component={PrivacyPolicy} />
          <Route path={`${path}${web.donors}`} component={Donors} />
          <Route path={`${path}${web.charities}`} component={Charities} />
          <Route path={`${path}${web.index}`} component={Home} />
          <Redirect from="*" to={site.home} />
        </Switch>
      </Suspense>
      <WebFoot />
    </div>
  );
};

export default Website;

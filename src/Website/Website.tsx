import { lazy, Suspense } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useLocation,
} from "react-router-dom";
import WebHead from "Website/Header/WebHead";
import WebFoot from "Website/WebFoot";
import Loader from "components/Loader/Loader";
import { site, web } from "types/routes";
import Home from "./Home/Home";
import Nodal from "components/Nodal/Nodal";
import useScrollTop from "hooks/useScrollTop";

const Donors = lazy(() => import("./Donors/Donors"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const Charities = lazy(() => import("./Charities/Charities"));
const Contact = lazy(() => import("./Contact/Contact"));

const Website = () => {
  const { path } = useRouteMatch();
  const location = useLocation();

  useScrollTop(location.pathname);
  const LoaderComponent = () => (
    <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
  );

  return (
    <div className="grid grid-rows-1a bg-white">
      <Nodal classes="bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-10 grid place-items-center">
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
      </Nodal>
    </div>
  );
};

export default Website;

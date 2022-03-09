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
import { site, web } from "constants/routes";
import Home from "./Home/Home";
import Modal from "components/Modal/Modal";
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
      <Modal classes="bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-10 grid place-items-center">
        <WebHead />
        <Suspense fallback={<LoaderComponent />}>
          <Switch>
            <Route
              path="/:url*(/+)"
              render={() => <Redirect to={location.pathname.slice(0, -1)} />}
            />
            <Route path={`${path}${web.contact}`} children={<Contact />} />
            <Route
              path={`${path}${web.privacy}`}
              children={<PrivacyPolicy />}
            />
            <Route path={`${path}${web.donors}`} children={<Donors />} />
            <Route path={`${path}${web.charities}`} children={<Charities />} />
            <Route path={`${path}${web.index}`} children={<Home />} />
            <Route path="*" render={() => <Redirect to={site.home} />} />
          </Switch>
        </Suspense>
        <WebFoot />
      </Modal>
    </div>
  );
};

export default Website;

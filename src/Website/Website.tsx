import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ModalContext from "contexts/ModalContext";
import Loader from "components/Loader";
import useScrollTop from "hooks/useScrollTop";
import { siteRoutes, webRoutes } from "constants/routes";
import WebHead from "./Header/WebHead";
import Home from "./Home/Home";
import WebFoot from "./WebFoot";

const Donors = lazy(() => import("./Donors/Donors"));
const Charities = lazy(() => import("./Charities/Charities"));
const Contact = lazy(() => import("./Contact/Contact"));

const LoaderComponent = () => (
  <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
);

const Website = () => {
  const location = useLocation();
  useScrollTop(location.pathname);

  return (
    <div className="grid grid-rows-1a bg-white">
      <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
        <WebHead />
        <Suspense fallback={<LoaderComponent />}>
          <Routes>
            <Route
              path="/:url*(/+)"
              element={<Navigate replace to={location.pathname.slice(0, -1)} />}
            />
            <Route path={webRoutes.contact} element={<Contact />} />
            <Route path={webRoutes.donors} element={<Donors />} />
            <Route path={webRoutes.charities} element={<Charities />} />
            <Route path={webRoutes.index} element={<Home />} />
            <Route
              path="*"
              element={<Navigate replace to={siteRoutes.home} />}
            />
          </Routes>
        </Suspense>

        <WebFoot />
      </ModalContext>
    </div>
  );
};

export default Website;

import ModalContext from "contexts/ModalContext";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "components/Loader";
import useScrollTop from "hooks/useScrollTop";
import { site, web } from "constants/routes";
import WebHead from "./Header/WebHead";
import Home from "./Home/Home";
import WebFoot from "./WebFoot";

const Donors = lazy(() => import("./Donors/Donors"));
const Charities = lazy(() => import("./Charities/Charities"));
const Contact = lazy(() => import("./Contact/Contact"));

const Website = () => {
  const location = useLocation();
  useScrollTop(location.pathname);

  const LoaderComponent = () => (
    <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
  );
  return (
    <div className="grid grid-rows-1a bg-white">
      <ModalContext backdropClasses="fixed inset-0 z-10 bg-black/50">
        <WebHead />
        <Suspense fallback={<LoaderComponent />}>
          <Routes>
            <Route
              path="/:url*(/+)"
              element={<Navigate replace to={location.pathname.slice(0, -1)} />}
            />
            <Route path={web.contact} element={<Contact />} />
            <Route path={web.donors} element={<Donors />} />
            <Route path={web.charities} element={<Charities />} />
            <Route path={web.index} element={<Home />} />
            <Route path="*" element={<Navigate replace to={site.home} />} />
          </Routes>
        </Suspense>
        <WebFoot />
      </ModalContext>
    </div>
  );
};

export default Website;

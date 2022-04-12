import WebHead from "Website/Header/WebHead";
import WebFoot from "Website/WebFoot";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "components/Loader/Loader";
import Modal from "components/Modal/Modal";
import useScrollTop from "hooks/useScrollTop";
import { site, web } from "constants/routes";
import Home from "./Home/Home";

const Donors = lazy(() => import("./Donors/Donors"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
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
      <Modal classes="bg-black/50 fixed top-0 right-0 bottom-0 left-0 z-10 grid place-items-center">
        <WebHead />
        <Suspense fallback={<LoaderComponent />}>
          <Routes>
            <Route
              path="/:url*(/+)"
              element={<Navigate replace to={location.pathname.slice(0, -1)} />}
            />
            <Route path={web.contact} element={<Contact />} />
            <Route path={web.privacy} element={<PrivacyPolicy />} />
            <Route path={web.donors} element={<Donors />} />
            <Route path={web.charities} element={<Charities />} />
            <Route path={web.index} element={<Home />} />
            <Route path="*" element={<Navigate replace to={site.home} />} />
          </Routes>
        </Suspense>
        <WebFoot />
      </Modal>
    </div>
  );
};

export default Website;

import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "components/Loader/Loader";
import useScrollTop from "hooks/useScrollTop";
import { app, site } from "../constants/routes";

const Auction = lazy(() => import("pages/LBP/Auction"));
const Charity = lazy(() => import("pages/Charity/Charity"));
const CharityEdit = lazy(() => import("pages/CharityEdit/CharityEdit"));
const Donations = lazy(() => import("pages/Donations/Donations"));
const Endowment = lazy(() => import("pages/Endowment/Endowment"));
const Governance = lazy(() => import("pages/Governance/Governance"));
const Leaderboard = lazy(() => import("pages/Leaderboard/Leaderboard"));
const Login = lazy(() => import("pages/Login/Login"));
const Market = lazy(() => import("pages/Market/Market"));
const Register = lazy(() => import("pages/Registration"));
const TCA = lazy(() => import("pages/TCA/TCA"));

export default function Views() {
  const location = useLocation();

  useScrollTop(location.pathname);

  return (
    <Suspense fallback={<LoaderComponent />}>
      <Routes>
        <Route path={`${app.auction}`} element={<Auction />} />
        <Route path={`${app.charity}/:address/*`} element={<Charity />} />
        <Route
          path={`${app.charity_edit}/:address`}
          element={<CharityEdit />}
        />
        <Route path={`${app.login}`} element={<Login />} />
        <Route path={`${app.tca}`} element={<TCA />} />
        <Route path={`${app.govern}/*`} element={<Governance />} />
        <Route path={`${app.auction}`} element={<Auction />} />
        <Route path={`${app.endowment}/:address`} element={<Endowment />} />
        <Route path={`${app.donation}/:address`} element={<Donations />} />
        <Route
          path={`${app.index}`}
          element={<Navigate replace to={`${app.marketplace}`} />}
        />
        <Route path={`${app.leaderboard}`} element={<Leaderboard />} />
        <Route path={`${app.login}`} element={<Login />} />
        <Route path={`${app.marketplace}`} element={<Market />} />
        <Route path={`${app.register}/*`} element={<Register />} />
        <Route path={`${app.tca}`} element={<TCA />} />
        <Route
          path="/:url*(/+)"
          element={<Navigate replace to={location.pathname.slice(0, -1)} />}
        />
        <Route path="*" element={<Navigate replace to={site.app} />} />
      </Routes>
    </Suspense>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
);

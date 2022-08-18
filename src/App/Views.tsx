import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "components/Loader";
import useScrollTop from "hooks/useScrollTop";
import { appRoutes } from "constants/routes";

const Admin = lazy(() => import("pages/Admin"));
const Charity = lazy(() => import("pages/Profile"));
const Donations = lazy(() => import("pages/Donations/Donations"));
// NOTE: Governance will be reenabled when we relaunch the $HALO token
// const Governance = lazy(() => import("pages/Governance/Governance"));
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
        <Route path={`${appRoutes.charity}/:address/*`} element={<Charity />} />
        <Route path={appRoutes.login} element={<Login />} />
        <Route path={appRoutes.tca} element={<TCA />} />
        {/* <Route path={`${appRoutes.govern}/*`} element={<Governance />} /> */}
        <Route path={`${appRoutes.admin}/:address/*`} element={<Admin />} />
        <Route
          path={`${appRoutes.donations}/:address`}
          element={<Donations />}
        />

        <Route
          path={`${appRoutes.donations}/:address`}
          element={<Donations />}
        />
        <Route path={appRoutes.leaderboard} element={<Leaderboard />} />
        <Route path={appRoutes.login} element={<Login />} />
        <Route index element={<Market />} />
        <Route path={`${appRoutes.register}/*`} element={<Register />} />
        <Route path={appRoutes.tca} element={<TCA />} />
        <Route
          path="/:url*(/+)"
          element={<Navigate replace to={location.pathname.slice(0, -1)} />}
        />
        <Route path="*" element={<Navigate replace to={appRoutes.index} />} />
      </Routes>
    </Suspense>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
);

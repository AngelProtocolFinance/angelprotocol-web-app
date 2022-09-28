import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "components/Loader";
import useScrollTop from "hooks/useScrollTop";
import { appRoutes } from "constants/routes";

const Admin = lazy(() => import("pages/Admin"));
const Profile = lazy(() => import("pages/Profile"));
const Donations = lazy(() => import("pages/Donations/Donations"));
// NOTE: Governance will be reenabled when we relaunch the $HALO token
// const Governance = lazy(() => import("pages/Governance/Governance"));
const Leaderboard = lazy(() => import("pages/Leaderboard/Leaderboard"));
const Market = lazy(() => import("pages/Market/Market"));
const Registration = lazy(() => import("pages/Registration"));

export default function Views() {
  const location = useLocation();
  useScrollTop(location.pathname);

  return (
    <Suspense fallback={<LoaderComponent />}>
      <Routes>
        <Route path={`${appRoutes.profile}/:id/*`} element={<Profile />} />
        {/* <Route path={`${appRoutes.govern}/*`} element={<Governance />} /> */}
        <Route path={`${appRoutes.admin}/:id/*`} element={<Admin />} />
        <Route
          path={`${appRoutes.donations}/:address`}
          element={<Donations />}
        />
        <Route path={appRoutes.leaderboard} element={<Leaderboard />} />
        <Route index element={<Market />} />
        <Route path={`${appRoutes.register}/*`} element={<Registration />} />
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

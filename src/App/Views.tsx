import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "components/Loader";
import useScrollTop from "hooks/useScrollTop";
import { appRoutes } from "constants/routes";

const Admin = lazy(() => import("pages/Admin"));
const Profile = lazy(() => import("pages/Profile"));
const Donations = lazy(() => import("pages/Donations"));
const Leaderboard = lazy(() => import("pages/Leaderboard"));
const Marketplace = lazy(() => import("pages/Marketplace"));
const Registration = lazy(() => import("pages/Registration"));
const Donate = lazy(() => import("pages/Donate"));
const DonateWidget = lazy(() => import("pages/Donate/Widget"));
const Gift = lazy(() => import("pages/Gift"));

export default function Views() {
  const location = useLocation();
  useScrollTop(location.pathname);

  return (
    <Suspense fallback={<LoaderComponent />}>
      <Routes>
        <Route path={`${appRoutes.profile}/:id/*`} element={<Profile />} />
        <Route path={`${appRoutes.admin}/:id/*`} element={<Admin />} />
        <Route
          path={`${appRoutes.donations}/:address`}
          element={<Donations />}
        />
        <Route path={`${appRoutes.donate}/:id`} element={<Donate />} />
        <Route
          path={`${appRoutes.donate_widget}/:apiKey`}
          element={<DonateWidget />}
        />
        <Route path={appRoutes.leaderboard} element={<Leaderboard />} />
        <Route path={`${appRoutes.register}/*`} element={<Registration />} />
        <Route path={`${appRoutes.gift}/*`} element={<Gift />} />
        <Route index element={<Marketplace />} />
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
  <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
);

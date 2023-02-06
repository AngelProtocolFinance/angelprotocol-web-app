import { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
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
const Gift = lazy(() => import("pages/Gift"));

export default function Views() {
  const location = useLocation();
  useScrollTop(location.pathname);

  return (
    <Suspense fallback={<LoaderComponent />}>
      <Routes>
        <Route
          element={
            <ErrorBoundary
              key={location.key}
              classes="place-self-center py-32 h-full bg-blue-l4 dark:bg-transparent w-full"
            >
              <Outlet />
            </ErrorBoundary>
          }
        >
          <Route path={`${appRoutes.profile}/:id/*`} element={<Profile />} />
          <Route path={`${appRoutes.admin}/:id/*`} element={<Admin />} />
          <Route
            path={`${appRoutes.donations}/:address`}
            element={<Donations />}
          />
          <Route path={`${appRoutes.donate}/:id`} element={<Donate />} />
          <Route path={appRoutes.leaderboard} element={<Leaderboard />} />
          <Route path={`${appRoutes.register}/*`} element={<Registration />} />
          <Route path={`${appRoutes.gift}/*`} element={<Gift />} />
          <Route index element={<Marketplace />} />
          <Route
            path="/:url*(/+)"
            element={<Navigate replace to={location.pathname.slice(0, -1)} />}
          />
          <Route path="*" element={<Navigate replace to={appRoutes.index} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
);

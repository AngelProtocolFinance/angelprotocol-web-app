import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { appRoutes, siteRoutes } from "types/routes";
import Loader from "components/Loader/Loader";
import useScrollTop from "hooks/useScrollTop";

const Admin = lazy(() => import("pages/Admin/Admin"));
const Login = lazy(() => import("pages/Login/Login"));
const TCA = lazy(() => import("pages/TCA/TCA"));
const Leaderboard = lazy(() => import("pages/Leaderboard/Leaderboard"));
const Governance = lazy(() => import("pages/Governance/Governance"));
const EndowmentAdmin = lazy(
  () => import("pages/EndowmentAdmin/EndowmentAdmin")
);
const Charity = lazy(() => import("pages/Charity/Charity"));
const Donations = lazy(() => import("pages/Donations/Donations"));
const Market = lazy(() => import("pages/Market/Market"));

export default function Views() {
  const location = useLocation();
  useScrollTop(location.pathname);
  const LoaderComponent = () => (
    <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
  );

  return (
    <Suspense fallback={<LoaderComponent />}>
      <Routes>
        <Route
          path="/:url*(/+)"
          element={<Navigate replace to={location.pathname.slice(0, -1)} />}
        />
        <Route path={`${appRoutes.marketplace}`} element={<Market />} />
        <Route path={`${appRoutes.leaderboard}`} element={<Leaderboard />} />
        <Route path={`${appRoutes.charity}/:address/*`} element={<Charity />} />

        <Route path={`${appRoutes.login}`} element={<Login />} />
        <Route path={`${appRoutes.tca}`} element={<TCA />} />
        <Route path={`${appRoutes.govern}/*`} element={<Governance />} />

        <Route path={`${appRoutes.admin}/*`} element={<Admin />} />
        <Route
          path={`${appRoutes.endowment_admin}/:address/*`}
          element={<EndowmentAdmin />}
        />
        <Route
          path={`${appRoutes.donations}/:address`}
          element={<Donations />}
        />

        <Route
          path={`${appRoutes.donations}/:address`}
          element={<Donations />}
        />
        <Route
          path={`${appRoutes.index}`}
          element={<Navigate replace to={`${appRoutes.marketplace}`} />}
        />
        <Route path="*" element={<Navigate replace to={siteRoutes.app} />} />
      </Routes>
    </Suspense>
  );
}

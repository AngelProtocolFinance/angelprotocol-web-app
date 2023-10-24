import "@aws-amplify/ui-react/styles.css";
import * as Sentry from "@sentry/react";
import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ModalContext from "contexts/ModalContext";
import useScrollTop from "hooks/useScrollTop";
import { appRoutes } from "constants/routes";
import Layout from "./Layout";
import Protected from "./Protected";

const Admin = lazy(() => import("pages/Admin"));
const Profile = lazy(() => import("pages/Profile"));
const Donations = lazy(() => import("pages/Donations"));
const Leaderboard = lazy(() => import("pages/Leaderboard"));
const Marketplace = lazy(() => import("pages/Marketplace"));
const Registration = lazy(() => import("pages/Registration"));
const Donate = lazy(() => import("pages/Donate"));
const DonateFiatThanks = lazy(() => import("pages/DonateFiatThanks"));
const Gift = lazy(() => import("pages/Gift"));
const DonateWidget = lazy(() => import("pages/DonateWidget"));
const Signin = lazy(() => import("pages/Signin"));

export default function App() {
  const location = useLocation();
  useScrollTop(location.pathname);

  const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

  return (
    <ModalContext>
      <SentryRoutes>
        <Route
          path={`${appRoutes.donate_widget}/:id`}
          element={<DonateWidget />}
        />
        <Route element={<Layout />}>
          <Route
            path={`${appRoutes.profile}/:id/*`}
            element={<Profile legacy />}
          />
          <Route
            path={`${appRoutes.admin}/:id/*`}
            element={
              <Protected>
                <Admin />
              </Protected>
            }
          />

          <Route
            path={`${appRoutes.donations}/:address`}
            element={<Donations />}
          />
          <Route path={`${appRoutes.donate}/:id`} element={<Donate />} />
          <Route
            path={appRoutes.donate_fiat_thanks}
            element={<DonateFiatThanks />}
          />
          <Route path={appRoutes.leaderboard} element={<Leaderboard />} />
          <Route
            path={`${appRoutes.register}/*`}
            element={
              <Protected>
                <Registration />
              </Protected>
            }
          />
          <Route path={`${appRoutes.gift}/*`} element={<Gift />} />
          <Route path={appRoutes.marketplace} element={<Marketplace />} />
          <Route path={appRoutes.signin} element={<Signin />} />
          <Route path={appRoutes.marketplace}>
            <Route path=":id/*" element={<Profile />} />
            <Route index element={<Marketplace />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<Navigate replace to={appRoutes.marketplace} />}
        />
      </SentryRoutes>
    </ModalContext>
  );
}

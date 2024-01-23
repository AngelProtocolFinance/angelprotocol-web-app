import * as Sentry from "@sentry/react";
import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import OAUTHRedirector from "pages/OAuthRedirector";
import ModalContext from "contexts/ModalContext";
import useScrollTop from "hooks/useScrollTop";
import { appRoutes } from "constants/routes";
import Layout from "./Layout";

const Admin = lazy(() => import("pages/Admin"));
const Profile = lazy(() => import("pages/Profile"));
const Donations = lazy(() => import("pages/Donations"));
const Leaderboard = lazy(() => import("pages/Leaderboard"));
const Marketplace = lazy(() => import("pages/Marketplace"));
const Registration = lazy(() => import("pages/Registration"));
const Donate = lazy(() => import("pages/Donate"));
const Gift = lazy(() => import("pages/Gift"));
const DonateWidget = lazy(() => import("pages/DonateWidget"));
const Signin = lazy(() => import("pages/Signin"));
const Applications = lazy(() => import("pages/Applications"));
const Application = lazy(() => import("pages/Application"));
const BankingApplications = lazy(() => import("pages/BankingApplications"));
const BankingApplication = lazy(() => import("pages/BankingApplication"));
const StripePaymentProcessor = lazy(
  () => import("pages/StripePaymentProcessor")
);

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
          <Route path={`${appRoutes.admin}/:id/*`} element={<Admin />} />
          <Route
            path={appRoutes.banking_applications}
            element={<BankingApplications />}
          />
          <Route
            path={appRoutes.banking_applications + "/:id"}
            element={<BankingApplication />}
          />
          <Route path={appRoutes.applications} element={<Applications />} />
          <Route
            path={appRoutes.applications + "/:id"}
            element={<Application />}
          />

          <Route path={appRoutes.donations} element={<Donations />} />
          <Route path={`${appRoutes.donate}/:id`} element={<Donate />} />
          <Route
            path={appRoutes.stripe_payment_status}
            element={<StripePaymentProcessor />}
          />
          <Route path={appRoutes.leaderboard} element={<Leaderboard />} />
          <Route path={`${appRoutes.register}/*`} element={<Registration />} />
          <Route path={`${appRoutes.gift}/*`} element={<Gift />} />
          <Route path={appRoutes.signin} element={<Signin />} />
          <Route
            path={appRoutes.auth_redirector}
            element={<OAUTHRedirector />}
          />
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

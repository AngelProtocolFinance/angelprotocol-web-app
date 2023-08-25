import * as Sentry from "@sentry/react";
import { WalletProvider } from "@terra-money/wallet-provider";
import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext";
import useScrollTop from "hooks/useScrollTop";
import { chainOptions } from "constants/chainOptions";
import { appRoutes } from "constants/routes";
import Layout from "./Layout";

const Admin = lazy(() => import("pages/Admin"));
const Profile = lazy(() => import("pages/Profile"));
const Donations = lazy(() => import("pages/Donations"));
const Leaderboard = lazy(() => import("pages/Leaderboard"));
const Marketplace = lazy(() => import("pages/Marketplace"));
const Donate = lazy(() => import("pages/Donate"));
const Gift = lazy(() => import("pages/Gift"));
const DonateWidget = lazy(() => import("pages/DonateWidget"));

export default function App() {
  const location = useLocation();
  useScrollTop(location.pathname);

  const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

  return (
    <WalletProvider {...chainOptions}>
      <WalletContext>
        <ModalContext>
          <SentryRoutes>
            <Route
              path={`${appRoutes.donate_widget}/:id`}
              element={<DonateWidget />}
            />
            <Route element={<Layout />}>
              <Route
                path={`${appRoutes.profile}/:id/*`}
                element={<Profile />}
              />
              <Route path={`${appRoutes.admin}/:id/*`} element={<Admin />} />
              <Route
                path={`${appRoutes.donations}/:address`}
                element={<Donations />}
              />
              <Route path={`${appRoutes.donate}/:id`} element={<Donate />} />
              <Route path={appRoutes.leaderboard} element={<Leaderboard />} />
              <Route path={`${appRoutes.gift}/*`} element={<Gift />} />
              <Route index element={<Marketplace />} />
            </Route>
            <Route
              path="*"
              element={<Navigate replace to={appRoutes.index} />}
            />
          </SentryRoutes>
        </ModalContext>
      </WalletContext>
    </WalletProvider>
  );
}

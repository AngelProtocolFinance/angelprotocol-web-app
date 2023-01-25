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
const AIF = lazy(() => import("pages/AIF"));
const Profile = lazy(() => import("pages/Profile"));
const Donations = lazy(() => import("pages/Donations"));
const Leaderboard = lazy(() => import("pages/Leaderboard"));
const Marketplace = lazy(() => import("pages/Marketplace"));
const Registration = lazy(() => import("pages/Registration"));
const Donate = lazy(() => import("pages/Donate"));
const Gift = lazy(() => import("pages/Gift"));
const DonateWidget = lazy(() => import("pages/DonateWidget"));

export default function App() {
  const location = useLocation();
  useScrollTop(location.pathname);

  return (
    <WalletProvider {...chainOptions}>
      <WalletContext>
        <ModalContext>
          <Routes>
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
              <Route path={`${appRoutes.aif}/:id/*`} element={<AIF />} />
              <Route
                path={`${appRoutes.donations}/:address`}
                element={<Donations />}
              />
              <Route path={`${appRoutes.donate}/:id`} element={<Donate />} />
              <Route path={appRoutes.leaderboard} element={<Leaderboard />} />
              <Route
                path={`${appRoutes.register}/*`}
                element={<Registration />}
              />
              <Route path={`${appRoutes.gift}/*`} element={<Gift />} />
              <Route index element={<Marketplace />} />
            </Route>
            <Route
              path="/:url*(/+)"
              element={<Navigate replace to={location.pathname.slice(0, -1)} />}
            />
          </Routes>
        </ModalContext>
      </WalletContext>
    </WalletProvider>
  );
}

import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import WalletRegistrationProvider from "./WalletRegistrationProvider";

const Auth = lazy(() => import("./Auth"));
const ChooseWallet = lazy(() => import("./ChooseWallet"));
const RegisterWallet = lazy(() => import("./RegisterWallet"));

export default function WalletRegistration() {
  return (
    <WalletRegistrationProvider>
      <Routes>
        <Route path={routes.auth} element={<Auth />} />
        <Route path={routes.index} element={<ChooseWallet />} />
        <Route path={routes.submit} element={<RegisterWallet />} />
      </Routes>
    </WalletRegistrationProvider>
  );
}

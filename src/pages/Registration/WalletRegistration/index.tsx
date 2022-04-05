import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";

const ConnectWallet = lazy(() => import("./ConnectWallet"));
const ChooseWallet = lazy(() => import("./ChooseWallet"));
const RegisterWallet = lazy(() => import("./RegisterWallet"));

export default function WalletRegistration() {
  return (
    <Routes>
      <Route path={routes.index} element={<ChooseWallet />} />
      <Route path={routes.connect} element={<ConnectWallet />} />
      <Route path={routes.submit} element={<RegisterWallet />} />
    </Routes>
  );
}

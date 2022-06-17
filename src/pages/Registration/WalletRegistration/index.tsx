import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import RegistrationSuccessful from "./RegistrationSuccessful";
import routes from "./routes";

const ChooseWallet = lazy(() => import("./ChooseWallet"));
const RegisterWallet = lazy(() => import("./RegisterWallet"));

export default function WalletRegistration() {
  return (
    <Routes>
      <Route path={routes.success} element={<RegistrationSuccessful />} />
      <Route path={routes.submit} element={<RegisterWallet />} />
      <Route index element={<ChooseWallet />} />
    </Routes>
  );
}

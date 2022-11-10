import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Steps from "./Steps";
import routes from "./routes";

const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const LandingPage = lazy(() => import("./LandingPage"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));

export default function Registration() {
  return (
    <section className="bg-blue-d6 text-white padded-container pt-28">
      <Routes>
        <Route path={routes.confirmEmail} element={<ConfirmEmail />} />
        <Route path={routes.verifyEmail} element={<VerifiedEmail />} />
        <Route path={routes.steps + "/*"} element={<Steps />} />
        <Route index element={<LandingPage />} />
        <Route path="*" element={<Navigate to={routes.index} />} />
      </Routes>
    </section>
  );
}

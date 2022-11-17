import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Resume from "pages/RegistrationV2/Resume";
import Signup from "pages/RegistrationV2/Signup";
import Steps from "./Steps";
import routes from "./routes";

const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));

export default function Registration() {
  return (
    <section className="grid dark:bg-blue-d4 bg-gray-l5 text-gray-d2 dark:text-white pt-28">
      <Routes>
        <Route path={routes.confirmEmail} element={<ConfirmEmail />} />
        <Route path={routes.verifyEmail} element={<VerifiedEmail />} />
        <Route path={routes.steps + "/*"} element={<Steps />} />
        <Route
          path={routes.resume}
          element={<Resume classes="justify-self-center" />}
        />
        <Route index element={<Signup classes="justify-self-center" />} />
        <Route path="*" element={<Navigate to={routes.index} />} />
      </Routes>
    </section>
  );
}

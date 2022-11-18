import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Resume from "pages/Registration/Resume";
import Signup from "pages/Registration/Signup";
import Steps from "./Steps";
import routes from "./routes";

const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));

export default function Registration() {
  return (
    <section className="grid dark:bg-blue-d4 bg-gray-l5 text-gray-d2 dark:text-white pt-24">
      <Routes>
        <Route path={routes.confirmEmail} element={<ConfirmEmail />} />
        <Route path={routes.verifyEmail} element={<VerifiedEmail />} />
        <Route
          path={routes.steps + "/*"}
          element={<Steps classes="my-0 md:my-20 justify-self-center" />}
        />
        <Route
          path={routes.resume}
          element={<Resume classes="justify-self-center my-20" />}
        />
        <Route index element={<Signup classes="justify-self-center my-20" />} />
        <Route path="*" element={<Navigate to={routes.index} />} />
      </Routes>
    </section>
  );
}

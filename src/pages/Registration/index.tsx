import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import routes from "./routes";

const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));
const Steps = lazy(() => import("./Steps"));
const Resume = lazy(() => import("./Resume"));
const Success = lazy(() => import("./Success"));

export default function Registration() {
  return (
    <section className="grid dark:bg-blue-d5 bg-gray-l5 text-gray-d2 dark:text-white pt-24">
      <Routes>
        <Route
          path={routes.confirmEmail}
          element={
            <ConfirmEmail classes="my-8 md:my-[10.5rem] mx-6 justify-self-center" />
          }
        />
        <Route
          path={routes.verifyEmail}
          element={
            <VerifiedEmail classes="my-10 md:my-32 mx-6 justify-self-center" />
          }
        />
        <Route
          path={routes.steps + "/*"}
          element={<Steps classes="my-0 md:my-20 justify-self-center" />}
        />
        <Route
          path={routes.resume}
          element={<Resume classes="justify-self-center my-20" />}
        />
        <Route
          path={routes.success}
          element={
            <Success classes="justify-self-center mt-10 sm:mt-[5.5rem] mb-6 sm:mb-20" />
          }
        />
        <Route index element={<Signup classes="justify-self-center my-20" />} />
        <Route path="*" element={<Navigate to={routes.index} />} />
      </Routes>
    </section>
  );
}

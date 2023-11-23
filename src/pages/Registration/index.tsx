import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import withAuth from "contexts/Auth";
import Seo from "components/Seo";
import { APP_NAME, DAPP_URL } from "constants/env";
import SignResult from "./SigningResult";
import Signup from "./Signup";
import routes from "./routes";

const Welcome = lazy(() => import("./Welcome"));
const Steps = lazy(() => import("./Steps"));
const Resume = lazy(() => import("./Resume"));
const Success = lazy(() => import("./Success"));

function Registration() {
  return (
    <Suspense
      fallback={<div className="place-self-center">Loading page...</div>}
    >
      <Seo
        title={`Registration Portal - ${APP_NAME}`}
        url={`${DAPP_URL}/register`}
      />
      <Routes>
        <Route
          path={routes.welcome}
          element={
            <Welcome classes="my-10 md:my-32 mx-6 justify-self-center" />
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
        <Route
          path={routes.sign_result}
          element={
            <SignResult classes="justify-self-center mt-10 sm:mt-[5.5rem] mb-6 sm:mb-20" />
          }
        />
        <Route index element={<Signup classes="justify-self-center my-20" />} />
        <Route path="*" element={<Navigate to={routes.index} />} />
      </Routes>
    </Suspense>
  );
}

export default withAuth(Registration);

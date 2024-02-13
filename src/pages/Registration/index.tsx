import Seo from "components/Seo";
import { APP_NAME, DAPP_URL } from "constants/env";
import { regRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignResult from "./SigningResult";
import Signup from "./Signup";

const Welcome = lazy(() => import("./Welcome"));
const Steps = lazy(() => import("./Steps"));
const Resume = lazy(() => import("./Resume"));
const Success = lazy(() => import("./Success"));

function Registration() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Suspense fallback="Loading page...">
        <Seo
          title={`Registration Portal - ${APP_NAME}`}
          url={`${DAPP_URL}/register`}
        />
        <Routes>
          <Route
            path={regRoutes.welcome}
            element={<Welcome classes="my-10 md:my-32 mx-6" />}
          />
          <Route
            path={regRoutes.steps + "/*"}
            element={<Steps classes="md:my-20" />}
          />
          <Route path={regRoutes.resume} element={<Resume classes="my-20" />} />
          <Route
            path={regRoutes.success}
            element={<Success classes="mt-10 sm:mt-[5.5rem] mb-6 sm:mb-20" />}
          />
          <Route
            path={regRoutes.sign_result}
            element={
              <SignResult classes="mt-10 sm:mt-[5.5rem] mb-6 sm:mb-20" />
            }
          />
          <Route index element={<Signup classes="my-20" />} />
          <Route path="*" element={<Navigate to={regRoutes.index} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default withAuth(Registration);

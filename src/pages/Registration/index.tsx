import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { regRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignResult from "./SigningResult";
import Signup from "./Signup";
import Steps from "./Steps";
import Welcome from "./Welcome";

function Registration() {
  return (
    <div className="flex justify-center items-center my-20">
      <Suspense fallback="Loading page...">
        <Seo
          title={`Registration Portal - ${APP_NAME}`}
          url={`${BASE_URL}/register`}
        />
        <Routes>
          <Route
            path={regRoutes.welcome}
            element={<Welcome classes="mx-6" />}
          />
          <Route
            path={regRoutes.steps + "/*"}
            element={<Steps classes="max-md:-my-20" />}
          />
          <Route path={regRoutes.resume} lazy={() => import("./Resume")} />
          <Route path={regRoutes.success} lazy={() => import("./Success")} />
          <Route path={regRoutes.sign_result} element={<SignResult />} />
          <Route index element={<Signup />} />
          <Route path="*" element={<Navigate to={regRoutes.index} />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export const Component = withAuth(Registration);

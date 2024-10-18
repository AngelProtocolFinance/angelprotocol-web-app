import { redirectToAuth } from "auth";
import { loadAuth } from "auth/load-auth";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { appRoutes, regRoutes } from "constants/routes";
import {
  type LoaderFunction,
  Outlet,
  type RouteObject,
  useLoaderData,
} from "react-router-dom";
import SigningResult from "./SigningResult";
import { route as stepsRoute } from "./Steps";
import { regLoader } from "./data/step-loader";

function Layout() {
  const user = useLoaderData();
  return (
    <div className="grid content-start justify-items-center py-8">
      <Seo
        title={`Registration Portal - ${APP_NAME}`}
        url={`${BASE_URL}/register`}
      />
      <Outlet context={user} />
    </div>
  );
}

const loader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  return auth;
};

export const route: RouteObject = {
  id: "reg",
  path: appRoutes.register,
  element: <Layout />,
  loader: loader,
  children: [
    {
      path: regRoutes.welcome,
      lazy: () => import("./Welcome"),
    },
    { path: regRoutes.resume, lazy: () => import("./Resume") },
    { path: regRoutes.success, lazy: () => import("./Success") },
    { index: true, lazy: () => import("./Signup") },
    {
      id: "reg$Id",
      path: ":regId",
      loader: regLoader,
      children: [
        stepsRoute,
        { path: regRoutes.sign_result, element: <SigningResult /> },
      ],
    },
  ],
};

import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { appRoutes, regRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import { Outlet, type RouteObject } from "react-router-dom";
import SigningResult from "./SigningResult";
import { route as stepsRoute } from "./Steps";

function Layout() {
  return (
    <div className="flex justify-center items-center my-20">
      <Seo
        title={`Registration Portal - ${APP_NAME}`}
        url={`${BASE_URL}/register`}
      />
      <Outlet />
    </div>
  );
}

const Root = withAuth(Layout);

export const route: RouteObject = {
  path: appRoutes.register,
  element: <Root />,
  children: [
    {
      path: regRoutes.welcome,
      lazy: () => import("./Welcome"),
    },
    stepsRoute,
    { path: regRoutes.resume, lazy: () => import("./Resume") },
    { path: regRoutes.success, lazy: () => import("./Success") },
    { path: regRoutes.sign_result, element: <SigningResult /> },
  ],
};

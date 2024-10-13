import { loadAuth } from "auth/load-auth";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { appRoutes, regRoutes } from "constants/routes";
import { decodeState, toUrlWithState } from "helpers/state-params";
import {
  type LoaderFunction,
  Outlet,
  type RouteObject,
  redirect,
  useLoaderData,
} from "react-router-dom";
import type { SignInRouteState } from "types/auth";
import SigningResult from "./SigningResult";
import { route as stepsRoute } from "./Steps";

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
  if (auth) return auth;

  //redirect to signin page
  const from = new URL(request.url);
  const toState: SignInRouteState = {
    from: from.pathname,
    data: decodeState(from.searchParams.get("_s")),
    search: from.search,
  };

  const to = new URL(request.url);
  to.pathname = appRoutes.signin;

  return redirect(toUrlWithState(to, toState).toString());
};

export const route: RouteObject = {
  path: appRoutes.register,
  element: <Layout />,
  loader: loader,
  children: [
    {
      path: regRoutes.welcome,
      lazy: () => import("./Welcome"),
    },
    stepsRoute,
    { path: regRoutes.resume, lazy: () => import("./Resume") },
    { path: regRoutes.success, lazy: () => import("./Success") },
    { path: regRoutes.sign_result, element: <SigningResult /> },
    { index: true, lazy: () => import("./Signup") },
  ],
};

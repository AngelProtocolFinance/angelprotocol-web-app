import { loadAuth } from "auth/load-auth";
import { appRoutes } from "constants/routes";
import { decodeState, toUrlWithState } from "helpers/state-params";
import DashboardLayout from "layout/DashboardLayout";
import {
  type LoaderFunction,
  Navigate,
  type RouteObject,
  redirect,
  useLoaderData,
} from "react-router-dom";
import type { SignInRouteState } from "types/auth";
import Donations from "./Donations";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import { linkGroups, routes } from "./routes";

function Layout() {
  const user = useLoaderData();

  return (
    <DashboardLayout
      rootRoute={`${appRoutes.user_dashboard}/`}
      linkGroups={linkGroups}
      //dummy header
      sidebarHeader={<div className="h-5" />}
      context={user}
    />
  );
}

export const loader: LoaderFunction = async ({ request }) => {
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

export const userDashboardRoute: RouteObject = {
  path: appRoutes.user_dashboard,
  element: <Layout />,
  loader,
  children: [
    { path: routes.edit_profile, element: <EditProfile /> },
    { path: routes.donations, element: <Donations /> },
    { path: routes.settings, element: <Settings /> },
    { index: true, element: <Navigate to={routes.edit_profile} /> },
  ],
};

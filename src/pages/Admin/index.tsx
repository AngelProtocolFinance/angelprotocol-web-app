import Footer from "components/Footer";
import { appRoutes } from "constants/routes";
import ModalContext from "contexts/ModalContext";
import { decodeState, toUrlWithState } from "helpers/state-params";
import {
  type LoaderFunction,
  Outlet,
  type RouteObject,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { charityRoute } from "./Charity";
import { Context } from "./Context";
import Header from "./Header";

import { loadAuth } from "auth/load-auth";
import type { SignInRouteState, UserV2 } from "types/auth";
function Layout() {
  const user = useLoaderData() as UserV2;

  return (
    <Context user={user}>
      <Header classes="sticky z-40 top-[-1px]" />
      <ModalContext>
        <Outlet />
      </ModalContext>
      <Footer />
    </Context>
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

export const adminRoute: RouteObject = {
  path: appRoutes.admin + "/:id",
  element: <Layout />,
  loader,
  children: [charityRoute],
};

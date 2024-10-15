import { loadAuth } from "auth/load-auth";
import Footer from "components/Footer";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import ModalContext from "contexts/ModalContext";
import { decodeState, toUrlWithState } from "helpers/state-params";
import Layout from "layout/DashboardLayout";
import {
  type LoaderFunction,
  type RouteObject,
  redirect,
  useLoaderData,
} from "react-router-dom";
import type { SignInRouteState } from "types/auth";
import * as v from "valibot";
import { charityRoutes } from "./Charity";
import type { AdminContext } from "./Context";
import Header from "./Header";
import SidebarHeader from "./SidebarHeader";
import { linkGroups } from "./constants";
function AdminLayout() {
  const context = useLoaderData() as AdminContext;

  if (!context.user.endowments.includes(context.id)) {
    return (
      <div className="grid content-start place-items-center pt-40 pb-20">
        <Icon type="Exclamation" size={80} className="text-red" />
        <p className="text-xl mt-8">Unauthorized</p>
      </div>
    );
  }

  return (
    <>
      <Header classes="sticky z-40 top-[-1px]" />
      <ModalContext>
        <Layout
          rootRoute={`${appRoutes.admin}/:id/`}
          linkGroups={linkGroups}
          sidebarHeader={<SidebarHeader endowId={context.id} />}
          context={context}
        />
      </ModalContext>
      <Footer />
    </>
  );
}

const id = v.pipe(
  v.string(),
  v.transform((x) => +x),
  v.number(),
  v.integer(),
  v.minValue(1)
);

const loader: LoaderFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (auth)
    return { user: auth, id: v.parse(id, params.id) } satisfies AdminContext;

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
  element: <AdminLayout />,
  loader,
  children: charityRoutes,
};

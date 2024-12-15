import type { EndowClaim } from "@better-giving/registration/models";
import type { Step1 } from "@better-giving/registration/step";
import type { NewReg } from "@better-giving/registration/update";
import { ap, ver } from "api/api";
import { redirectToAuth } from "auth";
import { loadAuth } from "auth/load-auth";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { appRoutes, regRoutes } from "constants/routes";
import { storeRegistrationReference } from "helpers";
import { decodeState } from "helpers/state-params";
import {
  type ActionFunction,
  type LoaderFunction,
  Outlet,
  type RouteObject,
  redirect,
  useLoaderData,
} from "react-router-dom";
import SigningResult from "./SigningResult";
import { route as stepsRoute } from "./Steps";
import { fsaAction } from "./Steps/fsa-action";
import { regLoader } from "./data/step-loader";
import { steps } from "./routes";

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

const newApplicationAction: ActionFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const url = new URL(request.url);
  const claim = decodeState<EndowClaim>(url.searchParams.get("_s"));

  const payload: NewReg = {
    registrant_id: auth.email,
  };
  if (claim) payload.claim = claim;

  const reg = await ap
    .post<Pick<Step1, "id">>(`${ver(1)}/registrations`, {
      json: payload,
      headers: { authorization: auth.idToken },
    })
    .json();
  storeRegistrationReference(reg.id);
  return redirect(`${appRoutes.register}/${reg.id}/${steps.contact}`);
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
      action: newApplicationAction,
    },
    { path: regRoutes.resume, lazy: () => import("./Resume") },
    { path: regRoutes.success, lazy: () => import("./Success") },
    {
      index: true,
      lazy: () => import("./Signup"),
      action: newApplicationAction,
    },
    {
      id: "reg$Id",
      path: ":regId",
      loader: regLoader,
      children: [
        stepsRoute,
        {
          path: regRoutes.sign_result,
          element: <SigningResult />,
          action: fsaAction,
        },
      ],
    },
  ],
};

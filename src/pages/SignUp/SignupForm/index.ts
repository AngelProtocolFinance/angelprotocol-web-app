import { cognito, oauth } from "auth";
import { loadAuth } from "auth/load-auth";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { getAuthRedirect } from "helpers";
import { decodeState } from "helpers/state-params";
import {
  type ActionFunction,
  type LoaderFunction,
  json,
  redirect,
} from "react-router-dom";
import {
  type OAuthState,
  type SignInRouteState,
  isError,
  signUp,
} from "types/auth";
import type { ActionData } from "../types";

export { SignupForm as Component } from "./SignupForm";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response | unknown> => {
  const auth = await loadAuth();
  if (auth) return redirect(appRoutes.marketplace);

  const url = new URL(request.url);
  return decodeState(url.searchParams.get("_s"));
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const state = decodeState(url.searchParams.get("_s")) as
      | SignInRouteState
      | undefined;

    const isNpo = state?.from === appRoutes.register;
    const r = getAuthRedirect(state as any, { isNpo });

    const fv = await request.formData();
    if (fv.get("intent") === "oauth") {
      const routeState: OAuthState = {
        pathname: r.path,
        data: r.data,
      };
      return redirect(oauth.initiateUrl(JSON.stringify(routeState)));
    }

    const p = parseWithValibot(fv, { schema: signUp });

    if (p.status !== "success") return p.reply();

    const res = await cognito.signup(
      p.value.email.toLowerCase(),
      p.value.password,
      {
        firstName: p.value.firstName,
        lastName: p.value.lastName,
        "custom:user-type": isNpo ? "npo" : "donor",
      }
    );
    if (isError(res)) {
      return p.reply({ fieldErrors: { emailConfirmation: [res.message] } });
    }

    //TODO: direct to confirm

    // const to = new URL(request.url);
    // to.pathname = r.path;
    // to.search = r.search;
    // if (r.data) {
    //   const encoded = btoa(JSON.stringify(r.data));
    //   to.searchParams.set("_s", encoded);
    // }

    // return redirect(to.toString());
  } catch (err) {
    console.error(err);
    return json<ActionData>({ __error: "Unknown error occured" }, 500);
  }
};

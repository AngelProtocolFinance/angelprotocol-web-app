import { cognito, oauth } from "auth";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { getAuthRedirect } from "helpers";
import { decodeState } from "helpers/state-params";
import { type ActionFunction, redirect } from "react-router";
import { authStore } from "store/auth";
import {
  type OAuthState,
  type SignInRouteState,
  isError,
  signUp,
} from "types/auth";

export { default } from "./SignupForm";
export { clientLoader } from "../loader";
export const clientAction: ActionFunction = async ({ request }) => {
  const from = new URL(request.url);
  const fromState = decodeState(from.searchParams.get("_s")) as
    | SignInRouteState
    | undefined;

  const isNpo = fromState?.from === appRoutes.register;
  const r = getAuthRedirect(fromState as any, { isNpo });

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
  authStore.set("email", p.value.email);

  const to = new URL(from);
  to.pathname = from.pathname + "/confirm";
  return redirect(to.toString());
};

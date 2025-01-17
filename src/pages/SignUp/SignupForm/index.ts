import { type ActionFunction, redirect } from "@vercel/remix";
import { cognito, oauth } from "auth";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { getAuthRedirect } from "helpers";
import { decodeState } from "helpers/state-params";
import {
  type OAuthState,
  type SignInRouteState,
  isError,
  signUp,
} from "types/auth";

export { default } from "./SignupForm";
export { loader } from "../loader";
export const action: ActionFunction = async ({ request }) => {
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
    return redirect(oauth.initiateUrl(JSON.stringify(routeState), from.origin));
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

  const to = new URL(from);
  to.pathname = from.pathname + "/confirm";
  to.searchParams.set("email", p.value.email);
  return redirect(to.toString());
};

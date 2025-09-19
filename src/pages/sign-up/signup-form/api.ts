import { valibotResolver } from "@hookform/resolvers/valibot";
import { appRoutes } from "constants/routes";
import { type ActionFunction, redirect } from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import type { IFormInvalid } from "types/action";
import { type ISignUp, isError, sign_up } from "types/auth";
import { cognito, oauth } from ".server/auth";

export const action: ActionFunction = async ({ request }) => {
  const from = new URL(request.url);
  const fv = await request.formData();
  const redirect_to =
    from.searchParams.get("redirect") || appRoutes.marketplace;

  const { user } = await cognito.retrieve(request);
  if (user) return redirect(redirect_to);

  if (fv.get("intent") === "oauth") {
    return redirect(oauth.initiateUrl(redirect_to, from.origin));
  }

  const p = await getValidatedFormData<ISignUp>(fv, valibotResolver(sign_up));
  if (p.errors) return p;

  const is_npo = redirect_to.startsWith(appRoutes.register);
  const res = await cognito.signup(
    p.data.email.toLowerCase(),
    p.data.password,
    {
      firstName: p.data.first_name,
      lastName: p.data.last_name,
      "custom:user-type": is_npo ? "npo" : "donor",
    }
  );
  if (isError(res)) {
    return {
      receivedValues: p.receivedValues,
      errors: { email: { type: "value", message: res.message } },
    } satisfies IFormInvalid<ISignUp>;
  }

  const to = new URL(from);
  to.pathname = from.pathname + "/confirm";
  to.searchParams.set("email", p.data.email);
  return redirect(to.toString());
};

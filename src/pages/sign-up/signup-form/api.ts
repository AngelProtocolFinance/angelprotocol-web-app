import { type ActionFunction, redirect } from "@vercel/remix";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { isError, signUp } from "types/auth";
import { cognito, oauth } from ".server/auth";

export const action: ActionFunction = async ({ request }) => {
  const from = new URL(request.url);
  const fv = await request.formData();
  const redirectTo = from.searchParams.get("redirect") || appRoutes.marketplace;
  if (fv.get("intent") === "oauth") {
    return redirect(oauth.initiateUrl(redirectTo, from.origin));
  }

  const p = parseWithValibot(fv, { schema: signUp });

  if (p.status !== "success") return p.reply();

  const isNpo = redirectTo.startsWith(appRoutes.register);
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

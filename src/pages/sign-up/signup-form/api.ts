import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { type ActionFunction, redirect } from "react-router";
import { isError, signUp } from "types/auth";
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

  const p = parseWithValibot(fv, { schema: signUp });

  if (p.status !== "success") return p.reply();

  const isNpo = redirect_to.startsWith(appRoutes.register);
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

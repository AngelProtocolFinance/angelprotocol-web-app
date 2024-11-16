import { cognito, loadAuth } from "auth";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import {
  type ActionFunction,
  type LoaderFunction,
  json,
  redirect,
} from "react-router-dom";
import { authStore } from "store/auth";
import { isError, signUpConfirm } from "types/auth";
import type { ActionData } from "./types";

export { ConfirmForm as Component } from "./ConfirmForm";

export const loader: LoaderFunction = async (): Promise<Response | unknown> => {
  const auth = await loadAuth();
  if (auth) return redirect(appRoutes.marketplace);

  const email = authStore.get("email");
  if (!email) return redirect(appRoutes.signup);
  return email;
};

export const action: ActionFunction = async ({ request }) => {
  const from = new URL(request.url);

  const fv = await request.formData();
  const email = fv.get("email");
  if (!email) throw "@dev: email is required to resend OTP";

  if (fv.get("intent") === "resend-otp") {
    const res = await cognito.resendConfirmationCode(email.toString());
    if (isError(res)) return json<ActionData>({ __error: res.message }, 500);
    return json<ActionData>({ time_remaining: 30 });
  }

  const p = parseWithValibot(fv, { schema: signUpConfirm });

  if (p.status !== "success") return p.reply();

  const res = await cognito.confirmSignup(email.toString(), p.value.code);
  if (isError(res)) {
    return p.reply({ fieldErrors: { code: [res.message] } });
  }

  const to = new URL(from);
  to.pathname = `${appRoutes.signup}/success`;
  return redirect(to.toString());
};
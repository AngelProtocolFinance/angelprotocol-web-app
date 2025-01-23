import {
  type ActionFunction,
  type LoaderFunction,
  data,
  redirect,
} from "@vercel/remix";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { isError, signUpConfirm } from "types/auth";
import type { ActionData } from "./types";
import { cognito } from ".server/auth";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response | unknown> => {
  const { user } = await cognito.retrieve(request);
  if (user) return redirect(appRoutes.marketplace);

  const url = new URL(request.url);
  const email = url.searchParams.get("email");
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
    if (isError(res)) return data<ActionData>({ __err: res.message }, 500);
    return data<ActionData>({ time_remaining: 30 });
  }

  const p = parseWithValibot(fv, { schema: signUpConfirm });

  if (p.status !== "success") return p.reply();

  const res = await cognito.confirmSignup(email.toString(), p.value.code);
  if (isError(res)) {
    return p.reply({ fieldErrors: { code: [res.message] } });
  }

  from.searchParams.delete("email");
  const to = new URL(from);
  to.pathname = `${appRoutes.signup}/success`;
  return redirect(to.toString());
};

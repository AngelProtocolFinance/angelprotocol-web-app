import { valibotResolver } from "@hookform/resolvers/valibot";
import { appRoutes } from "constants/routes";
import { search } from "helpers/https";
import {
  type ActionFunction,
  type LoaderFunctionArgs,
  data,
  redirect,
} from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import type { IFormInvalid } from "types/action";
import { type ISignUpConfirm, isError, signup_confirm } from "types/auth";
import type { ActionData } from "./types";
import { cognito } from ".server/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await cognito.retrieve(request);
  if (user) return redirect(appRoutes.marketplace);

  const { email } = search(request);
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

  const p = await getValidatedFormData<ISignUpConfirm>(
    fv,
    valibotResolver(signup_confirm)
  );
  if (p.errors) return p;

  const res = await cognito.confirmSignup(email.toString(), p.data.code);
  if (isError(res)) {
    return {
      receivedValues: p.receivedValues,
      errors: { code: { type: "value", message: res.message } },
    } satisfies IFormInvalid<ISignUpConfirm>;
  }

  from.searchParams.delete("email");
  const to = new URL(from);
  to.pathname = `${appRoutes.signup}/success`;
  return redirect(to.toString());
};

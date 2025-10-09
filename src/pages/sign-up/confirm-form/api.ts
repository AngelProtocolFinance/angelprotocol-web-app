import { valibotResolver } from "@hookform/resolvers/valibot";
import { search } from "helpers/https";
import {
  type ActionFunction,
  type LoaderFunctionArgs,
  href,
  redirect,
} from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import type { IFormInvalid } from "types/action";
import { type ISignUpConfirm, is_error, signup_confirm } from "types/auth";
import type { ActionData } from "./types";
import { cognito } from ".server/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user } = await cognito.retrieve(request);
  if (user) return redirect(href("/marketplace"));

  const { email } = search(request);
  if (!email) return redirect(href("/signup"));

  return email;
};

export const action: ActionFunction = async ({ request }) => {
  const from = new URL(request.url);
  const fv = await request.formData();
  const email = fv.get("email");
  if (!email) throw "@dev: email is required to resend OTP";

  if (fv.get("intent") === "resend-otp") {
    const res = await cognito.resend_confirmation_code(email.toString());
    if (is_error(res)) return { __err: res.message } satisfies ActionData;
    return { time_remaining: 30 } satisfies ActionData;
  }

  const p = await getValidatedFormData<ISignUpConfirm>(
    fv,
    valibotResolver(signup_confirm),
    true
  );
  if (p.errors) return p;

  const res = await cognito.signup_confirm(email.toString(), p.data.code);
  if (is_error(res)) {
    return {
      receivedValues: p.receivedValues,
      errors: { code: { type: "value", message: res.message } },
    } satisfies IFormInvalid<ISignUpConfirm>;
  }

  from.searchParams.delete("email");
  const to = new URL(from);
  to.pathname = href("/signup/success");
  return redirect(to.toString());
};

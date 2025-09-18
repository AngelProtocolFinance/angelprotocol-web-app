import { valibotResolver } from "@hookform/resolvers/valibot";
import { search } from "helpers/https";
import { type ActionFunction, data, redirect } from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import type { ActionData, IFormInvalid } from "types/action";
import { isError } from "types/auth";
import { parse } from "valibot";
import type { Route } from "./+types";
import {
  type IEmailSchema,
  type IPasswordSchema,
  email_schema,
  password_schema,
} from "./schema";
import { type LoaderData, step } from "./types";
import { cognito } from ".server/auth";

export const loader = ({ request }: Route.LoaderArgs) => {
  const { redirect = "/", ..._step } = search(request);
  return {
    redirect,
    step: parse(step, _step),
  } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request }) => {
  const fv = await request.formData();
  const email = fv.get("email")!.toString();

  if (fv.get("intent") === "edit-email") {
    const to = new URL(request.url);
    to.searchParams.set("type", "init");
    return redirect(to.toString());
  }

  if (fv.get("intent") === "resend-otp") {
    const res = await cognito.resendConfirmationCode(email);
    if (isError(res)) return data({ __err: res.message } satisfies ActionData);
    return data({ __ok: "OTP sent" } satisfies ActionData);
  }

  if (fv.get("intent") === "confirm") {
    const payload = await getValidatedFormData(
      fv,
      valibotResolver(password_schema)
    );
    if (payload.errors) return payload;

    const res = await cognito.confirmForgotPassword(
      email,
      payload.data.password,
      payload.data.otp
    );

    if (isError(res)) {
      return {
        errors: { otp: { message: res.message, type: "value" } },
        receivedValues: payload.receivedValues,
      } satisfies IFormInvalid<IPasswordSchema>;
    }

    const to = new URL(request.url);
    to.searchParams.set("type", "success");
    return redirect(to.toString());
  }

  const payload = await getValidatedFormData(fv, valibotResolver(email_schema));
  if (payload.errors) return payload;

  const res = await cognito.forgotPassword(payload.data.email);
  if (isError(res)) {
    return {
      errors: { email: { message: res.message, type: "value" } },
      receivedValues: payload.receivedValues,
    } satisfies IFormInvalid<IEmailSchema>;
  }

  const to = new URL(request.url);
  to.searchParams.set("type", "set-password");
  to.searchParams.set("recipient_raw", payload.data.email);
  to.searchParams.set("recipient_obscured", res);

  return redirect(to.toString());
};
